"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import siteIds from "@/public/assets/site_ids.json";

interface Site {
  id: string;
  name: string;
  city: string;
}

interface Anomaly {
  dt_time: string;
  pm10cnc: number;
  pm2_5cnc: number;
}

export default function ReportsPage() {
  const [sites, setSites] = useState<Site[]>(siteIds as Site[]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSite, setSelectedSite] = useState<string>("104");
  const [startDate, setStartDate] = useState<string>("2025-03-01");
  const [endDate, setEndDate] = useState<string>("2025-12-03");
  const [data, setData] = useState<Anomaly[]>([]);
  const [showPM10, setShowPM10] = useState(true);
  const [showPM2_5, setShowPM2_5] = useState(true);
  const [sortField, setSortField] = useState<keyof Anomaly>("dt_time");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Filter sites based on search input
  const filteredSites = sites.filter(
    (site) =>
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (!selectedSite || !startDate || !endDate) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://renderacm2025.onrender.com/anomalies?start_date=${startDate}&end_date=${endDate}`
        );
        const result = await response.json();
        const siteData = result[selectedSite] || [];

        // Map data and ensure correct field names
        const formattedData = siteData.map((entry: any) => ({
          dt_time: entry.dt_time,
          pm10cnc: entry.pm10cnc,
          pm2_5cnc: entry["pm2.5cnc"], // Fix for JSON key containing a dot
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedSite, startDate, endDate]);

  // Sorting Function
  const sortedData = [...data].sort((a, b) => {
    if (sortField === "dt_time") {
      return sortOrder === "asc"
        ? new Date(a.dt_time).getTime() - new Date(b.dt_time).getTime()
        : new Date(b.dt_time).getTime() - new Date(a.dt_time).getTime();
    }
    return sortOrder === "asc"
      ? a[sortField] - b[sortField]
      : b[sortField] - a[sortField];
  });

  // Toggle Sorting Order
  const handleSort = (field: keyof Anomaly) => {
    setSortOrder(sortField === field && sortOrder === "asc" ? "desc" : "asc");
    setSortField(field);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Reports</h1>

      <div className="flex space-x-4">
        {/* Search & Select Site */}
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search site..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
          <select
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
            className="border p-2 rounded-md w-full mt-1"
          >
            {filteredSites.map((site) => (
              <option key={site.id} value={site.id}>
                {site.name} ({site.city})
              </option>
            ))}
          </select>
        </div>

        {/* Date Filters */}
        <div>
          <label className="text-lg font-medium">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded-md"
          />
        </div>

        <div>
          <label className="text-lg font-medium">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded-md"
          />
        </div>
      </div>

      {/* Filters for PM10 and PM2.5 */}
      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showPM10}
            onChange={() => setShowPM10(!showPM10)}
          />
          <span>Show PM10</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showPM2_5}
            onChange={() => setShowPM2_5(!showPM2_5)}
          />
          <span>Show PM2.5</span>
        </label>
      </div>

      {/* Line Chart */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold">PM10 & PM2.5 Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sortedData}>
              <XAxis
                dataKey="dt_time"
                tickFormatter={(time) => time.slice(5, 16)} // Format: MM-DD HH:mm
                angle={-30}
                textAnchor="end"
              />
              <YAxis />
              <Tooltip />
              {showPM10 && <Line type="monotone" dataKey="pm10cnc" stroke="#FF5733" strokeWidth={2} />}
              {showPM2_5 && <Line type="monotone" dataKey="pm2_5cnc" stroke="#338AFF" strokeWidth={2} />}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold">Anomaly Data</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <th onClick={() => handleSort("dt_time")} className="cursor-pointer">Timestamp {sortField === "dt_time" && (sortOrder === "asc" ? "▲" : "▼")}</th>
                </TableHead>
                {showPM10 && (
                  <TableHead>
                    <th onClick={() => handleSort("pm10cnc")} className="cursor-pointer">
                      PM10 (µg/m³) {sortField === "pm10cnc" && (sortOrder === "asc" ? "▲" : "▼")}
                    </th>
                  </TableHead>
                )}
                {showPM2_5 && (
                  <TableHead>
                    <th onClick={() => handleSort("pm2_5cnc")} className="cursor-pointer">
                      PM2.5 (µg/m³) {sortField === "pm2_5cnc" && (sortOrder === "asc" ? "▲" : "▼")}
                    </th>
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.dt_time}</TableCell>
                  {showPM10 && <TableCell>{entry.pm10cnc}</TableCell>}
                  {showPM2_5 && <TableCell>{entry.pm2_5cnc}</TableCell>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
