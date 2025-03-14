"use client";

import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import siteData from "@/public/assets/site_ids.json"; // Import from assets folder

const containerStyle = {
  width: "100%",
  height: "600px",
};

// Assign hardcoded anomaly counts and categorize marker colors
const siteLocations = siteData.map((site, index) => {
  const anomalies = index % 3 === 0 ? Math.floor(Math.random() * 10) + 1 : 0; // Assign anomalies randomly

  let iconUrl;
  if (anomalies === 0) {
    iconUrl = "http://maps.google.com/mapfiles/ms/icons/green-dot.png"; // Safe zone
  } else if (anomalies <= 3) {
    iconUrl = "http://maps.google.com/mapfiles/ms/icons/orange-dot.png"; // Light Red
  } else if (anomalies <= 7) {
    iconUrl = "http://maps.google.com/mapfiles/ms/icons/red-dot.png"; // Medium Red
  } else {
    iconUrl = "http://maps.google.com/mapfiles/ms/icons/purple-dot.png"; // Darkest Red
  }

  return {
    lat: site.lat,
    lng: site.lon,
    name: site.name,
    city: site.city || "Unknown",
    anomalies,
    type: anomalies > 0 ? "alert" : "safe",
    iconUrl,
  };
});

export default function WorldMap() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<{ lat: number; lng: number; anomalies: number; name: string } | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocation({ lat: 20.5937, lng: 78.9629 }); // Fallback: India center
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLocation({ lat: 20.5937, lng: 78.9629 }); // Fallback location
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
      {location ? (
        <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={5}>
          {/* Render site markers */}
          {siteLocations.map((site, index) => (
            <Marker
              key={index}
              position={{ lat: site.lat, lng: site.lng }}
              icon={{ url: site.iconUrl }} // Dynamic icon based on anomaly count
              onClick={() => setSelectedMarker(site)} // Open InfoWindow on click
            />
          ))}

          {/* Show info window on click */}
          {selectedMarker && (
            <InfoWindow position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }} onCloseClick={() => setSelectedMarker(null)}>
              <div style={{ color: "black", fontWeight: "bold" }}>
                <p>{selectedMarker.name}</p>
                <p>Anomalies: {selectedMarker.anomalies}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      ) : (
        <p>Loading map...</p>
      )}
    </LoadScript>
  );
}
