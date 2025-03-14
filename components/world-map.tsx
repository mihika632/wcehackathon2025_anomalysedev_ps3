"use client";

import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import siteData from "@/public/assets/site_ids.json"; // Corrected import path

const containerStyle = {
  width: "100%",
  height: "600px",
};

// Assign hardcoded anomaly counts
const siteLocations = siteData.map((site, index) => ({
  lat: site.lat,
  lng: site.lon,
  name: site.name,
  city: site.city || "Unknown",
  anomalies: index % 3 === 0 ? Math.floor(Math.random() * 10) + 1 : 0, // Assign anomalies randomly
  type: index % 3 === 0 ? "alert" : "safe",
}));

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
          console.error("Error getting location:", error.message);
          setLocation({ lat: 20.5937, lng: 78.9629 }); // Fallback: India center
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLocation({ lat: 20.5937, lng: 78.9629 }); // Fallback location
    }
  }, []);

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
    >
      {location ? (
        <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={5}>
          {/* Render site markers */}
          {siteLocations.map((site, index) => (
            <Marker
              key={index}
              position={{ lat: site.lat, lng: site.lng }}
              icon={{
                url: site.type === "alert" ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png" : "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
              }}
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


