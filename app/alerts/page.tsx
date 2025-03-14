"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Clock, MapPin } from "lucide-react";

type Alert = {
  id: string;
  location: string;
  timestamp: string;
  reason: string;
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      location: "WCE, Sangli",
      timestamp: "2025-03-13 14:30:00",
      reason: "Unusual traffic pattern detected",
    },
    {
      id: "2",
      location: "Pune, Maharashtra",
      timestamp: "2025-03-13 14:15:00",
      reason: "High temperature fluctuation",
    },
  ]);

  // Simulate adding a new alert every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newAlert = {
        id: Date.now().toString(),
        location: "Mumbai, Maharashtra",
        timestamp: new Date().toLocaleString(),
        reason: "Power failure detected",
      };

      setAlerts((prev) => [newAlert, ...prev]); // Add new alert to top

      // 🚀 Future: Replace this with a real API call
      // fetch("/api/alerts").then(res => res.json()).then(data => setAlerts(data));

      // Show browser notification
      if (Notification.permission === "granted") {
        new Notification("🚨 Anomaly Detected!", {
          body: `${newAlert.reason} at ${newAlert.location}`,
        });
      }
    }, 10000); // Change to your preferred refresh rate

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Anomaly Alerts</h1>
      <div className="grid gap-4">
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <Card key={alert.id} className="border-l-4 border-red-500 p-4">
              <CardContent>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="text-red-500" />
                  <h2 className="font-semibold">{alert.reason}</h2>
                </div>
                <p className="flex items-center gap-2 mt-2">
                  <MapPin className="text-blue-500" />
                  {alert.location}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="text-gray-500" />
                  {alert.timestamp}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No anomalies detected.</p>
        )}
      </div>
    </div>
  );
}
