import pandas as pd
import numpy as np
import json

# File paths
device_data_path = "/content/device_data.csv"
site_ids_path = "/content/site_ids.json"

# Read sensor data with dtype handling
device_data = pd.read_csv(device_data_path, on_bad_lines='skip', dtype=str, low_memory=False)

# Print column names to check for issues
print("Columns in device_data:", device_data.columns)

# Read site location data
with open(site_ids_path, "r") as file:
    site_data = json.load(file)

# Convert to DataFrame
site_df = pd.DataFrame(site_data)

# Keep only relevant columns
site_df = site_df[['id', 'lat', 'lon']]
print("Columns in site_df:", site_df.columns)

# Trim spaces and rename columns
device_data.columns = device_data.columns.str.strip()

# Check again
print("Fixed Columns in device_data:", device_data.columns)

# Ensure 'site_id' column exists
if 'deviceid' in device_data.columns:
    device_data = device_data.merge(site_df, left_on="deviceid", right_on="id", how="left")
    print("Merge successful!")
else:
    print("Error: 'site_id' column still not found.")

from scipy.spatial.distance import cdist

# Create a matrix of latitudes and longitudes
coords = site_df[['lat', 'lon']].values

# Compute pairwise Euclidean distances
distance_matrix = cdist(coords, coords, metric="euclidean")

# Store in DataFrame
distance_df = pd.DataFrame(distance_matrix, index=site_df['id'], columns=site_df['id'])

# Function to get the nearest sites for each station
def get_nearest_sites(site_id, num_neighbors=3):
    if site_id not in distance_df.index:
        return {}  # Return empty if site_id is missing
    distances = distance_df[site_id].sort_values()
    return distances.iloc[1:num_neighbors+1].to_dict()  # Exclude itself (first row)

# Apply the function to get nearest sites
device_data['nearest_sites'] = device_data['deviceid'].apply(lambda x: get_nearest_sites(x))

print("Step 4 Complete: Nearest sites identified for each station!")

# Convert pollution columns to numeric (ignoring errors)
device_data['pm10cnc'] = pd.to_numeric(device_data['pm10cnc'], errors='coerce')
device_data['pm2.5cnc'] = pd.to_numeric(device_data['pm2.5cnc'], errors='coerce')

# Group by 'deviceid' and compute mean pollution values
pollution_df = device_data.groupby('deviceid')[['pm10cnc', 'pm2.5cnc']].mean().reset_index()

# Convert to dictionary
pollution_dict = pollution_df.set_index('deviceid').to_dict(orient='index')

# Function to compute fast average pollution of nearest neighbors
def get_avg_neighbor_pollution(row):
    neighbors = row['nearest_sites']
    if not neighbors:  # If no neighbors found, return NaN
        return np.nan, np.nan

    neighbor_ids = list(neighbors.keys())

    # Get pollution values from dictionary
    neighbor_values = [pollution_dict[n] for n in neighbor_ids if n in pollution_dict]

    if not neighbor_values:  # If no valid neighbors found
        return np.nan, np.nan

    # Compute average pollution of neighbors
    avg_pm10 = np.mean([val['pm10cnc'] for val in neighbor_values if not pd.isna(val['pm10cnc'])])
    avg_pm2_5 = np.mean([val['pm2.5cnc'] for val in neighbor_values if not pd.isna(val['pm2.5cnc'])])

    return avg_pm10, avg_pm2_5

# Apply function using list comprehension (much faster)
device_data[['avg_pm10_neighbors', 'avg_pm2.5_neighbors']] = pd.DataFrame(
    [get_avg_neighbor_pollution(row) for _, row in device_data.iterrows()],
    columns=['avg_pm10_neighbors', 'avg_pm2.5_neighbors']
)

print("Step 5 Complete: Nearest site pollution features computed in optimized time!")

from sklearn.ensemble import IsolationForest

# Select features for anomaly detection
features = ['pm10cnc', 'pm2.5cnc', 'avg_pm10_neighbors', 'avg_pm2.5_neighbors']
X = device_data[features].fillna(0)  # Handle missing values

# Train Isolation Forest
model = IsolationForest(contamination=0.05, random_state=42)
device_data['anomaly_score'] = model.fit_predict(X)

# Mark anomalies
device_data['is_anomaly'] = device_data['anomaly_score'] == -1

# Save results
device_data.to_csv("/content/anomaly_results.csv", index=False)
print("Step 6 Complete: Anomalies detected and results saved!")

import matplotlib.pyplot as plt
import folium
from folium.plugins import MarkerCluster
# Create a base map centered around the average latitude & longitude
# Drop rows where lat or lon is NaN
device_data = device_data.dropna(subset=['lat', 'lon'])

map_center = [device_data['lat'].mean(), device_data['lon'].mean()]
m = folium.Map(location=map_center, zoom_start=10)

# Add marker clusters
marker_cluster = MarkerCluster().add_to(m)

# Add each site to the map
for _, row in device_data.iterrows():
    if row['is_anomaly']:  # Only plot anomalies
        folium.Marker(
            location=[row['lat'], row['lon']],
            popup=f"Site: {row['deviceid']}<br>PM10: {row['pm10cnc']}<br>PM2.5: {row['pm2.5cnc']}",
            icon=folium.Icon(color="red")
        ).add_to(marker_cluster)

# Save map to an HTML file
m.save("/content/anomaly_map.html")
print("Anomaly map saved as 'anomaly_map.html'. Open it in a browser to view.")

# Function to classify anomaly type
def classify_anomaly(row):
    if not row['is_anomaly']:
        return "Normal"

    # Check if neighbors also have anomalies
    neighbors = row['nearest_sites']
    neighbor_ids = list(neighbors.keys())

    neighbor_anomalies = device_data[(device_data['deviceid'].isin(neighbor_ids)) & (device_data['is_anomaly'])]

    if len(neighbor_anomalies) >= 2:
        return "Regional Event"  # Many nearby sites are also anomalous
    elif len(neighbor_anomalies) == 1:
        return "Local Anomaly"  # Only one nearby site is affected
    else:
        return "Sensor Noise"  # No nearby sites are affected

# Apply function
device_data['anomaly_type'] = device_data.apply(classify_anomaly, axis=1)

print("Step 6: Anomalies classified!")

import matplotlib.pyplot as plt
import folium
from folium.plugins import MarkerCluster

# Drop rows where lat or lon is NaN
device_data = device_data.dropna(subset=['lat', 'lon'])

# Create a base map centered around the average latitude & longitude
map_center = [device_data['lat'].mean(), device_data['lon'].mean()]
m = folium.Map(location=map_center, zoom_start=10)

# Add marker clusters
marker_cluster = MarkerCluster().add_to(m)

# Add each site to the map
for _, row in device_data.iterrows():
    if row['is_anomaly']:  # Only plot anomalies
        folium.Marker(
            location=[row['lat'], row['lon']],
            popup=(
                f"<b>Site:</b> {row['deviceid']}<br>"
                f"<b>PM10:</b> {row['pm10cnc']}<br>"
                f"<b>PM2.5:</b> {row['pm2.5cnc']}<br>"
                f"<b>Anomaly Type:</b> {row['anomaly_type']}"  # Add classification
            ),
            icon=folium.Icon(color="red")  # Change color based on type if needed
        ).add_to(marker_cluster)

# Save map to an HTML file
m.save("/content/anomaly_map.html")
print("Anomaly map saved as 'anomaly_map.html'. Open it in a browser to view.")

# Store anomaly type in a separate dictionary before merging
anomaly_dict = device_data.set_index('deviceid')['anomaly_type'].to_dict()

# Merge site information
device_data = device_data.merge(site_df, left_on="deviceid", right_on="id", how="left", suffixes=("_device", "_site"))

# Restore anomaly type after merging
device_data['anomaly_type'] = device_data['deviceid'].map(anomaly_dict)

# Ensure missing values are filled correctly
device_data['anomaly_type'].fillna("Not Classified", inplace=True)

print("Anomaly Type Sample After Merge:")
print(device_data[['deviceid', 'anomaly_type']].drop_duplicates().head(20))

site_df.rename(columns={'site_name': 'name', 'location_city': 'city'}, inplace=True)

import json
import pandas as pd

# Load site information from site_ids.json
site_ids_path = "/content/site_ids.json"
with open(site_ids_path, "r") as file:
    site_data = json.load(file)

# Convert to a DataFrame
site_df = pd.DataFrame(site_data)

# Print columns to verify
print("New Site Data Columns:", site_df.columns.tolist())

# Print first few rows
print(site_df.head())

expected_columns = ['id', 'lat', 'lon', 'name', 'city']
actual_columns = site_df.columns.tolist()

# Rename if necessary
rename_map = {}
for col in actual_columns:
    if col.lower() in ['site_id', 'station_id']:
        rename_map[col] = 'id'
    elif col.lower() in ['latitude']:
        rename_map[col] = 'lat'
    elif col.lower() in ['longitude']:
        rename_map[col] = 'lon'
    elif col.lower() in ['site_name']:
        rename_map[col] = 'name'
    elif col.lower() in ['location_city']:
        rename_map[col] = 'city'

site_df.rename(columns=rename_map, inplace=True)

# Print updated columns
print("Updated Site Data Columns:", site_df.columns.tolist())

site_df['name'].fillna("Unknown Site", inplace=True)
site_df['city'].fillna("Unknown City", inplace=True)

# Print updated site_df
print(site_df.head())

# Save the cleaned site_df for merging
site_df.to_csv("/content/cleaned_site_data.csv", index=False)

print("New site_df is ready! It has all required columns.")

print("Columns in device_data after merge:", device_data.columns.tolist())

print("Columns in site_df:", site_df.columns.tolist())
print(site_df.head())  # Show some data

# Merge site information into device data
device_data = device_data.merge(site_df, left_on="deviceid", right_on="id", how="left", suffixes=("_device", "_site"))

# Print columns to verify merge worked
print("Columns after merge:", device_data.columns.tolist())

# If merge was successful, rename lat/lon and keep required columns
if 'name' in device_data.columns and 'city' in device_data.columns:
    device_data = device_data[['deviceid', 'name', 'city', 'lat', 'lon', 'anomaly_type', 'is_anomaly']]
else:
    print("❌ Merge failed: 'name' and 'city' not found in merged data.")

import folium
from folium.plugins import MarkerCluster

# Ensure each site appears only once
device_data_unique = device_data.drop_duplicates(subset=['deviceid'])

# Create base map centered around all sites
map_center = [device_data_unique['lat'].mean(), device_data_unique['lon'].mean()]
m = folium.Map(location=map_center, zoom_start=10)

# Add marker clusters
marker_cluster = MarkerCluster().add_to(m)

# Add each unique site to the map
for _, row in device_data_unique.iterrows():
    folium.Marker(
        location=[row['lat'], row['lon']],
        popup=(
            f"<b>Site Name:</b> {row['name']}<br>"
            f"<b>City:</b> {row['city']}<br>"
            f"<b>Site ID:</b> {row['deviceid']}<br>"
            f"<b>Anomaly Type:</b> {row.get('anomaly_type', 'Not Classified')}"
        ),
        icon=folium.Icon(color="red" if row.get('is_anomaly', False) else "blue")
    ).add_to(marker_cluster)

# Save map to an HTML file
m.save("/content/anomaly_map.html")
print("Anomaly map saved as 'anomaly_map.html'. Open it in a browser to view.")