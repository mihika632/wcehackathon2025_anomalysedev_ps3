"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Card, CardContent } from "@/components/ui/card";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid,
} from "recharts";
import siteIds from "@/public/assets/site_ids.json";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";


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

  useEffect(() => {
    if (!selectedSite || !startDate || !endDate) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://renderacm2025.onrender.com/anomalies?start_date=${startDate}&end_date=${endDate}`
        );
        const result = await response.json();

        const siteData = result[selectedSite] || [];
        const filteredData = siteData.filter((entry: any) => {
          const entryDate = dayjs(entry.dt_time);
          return entryDate.isAfter(dayjs(startDate)) && entryDate.isBefore(dayjs(endDate));
        });

        const formattedData = filteredData.map((entry: any) => ({
          dt_time: entry.dt_time,
          pm10cnc: entry.pm10cnc,
          pm2_5cnc: entry["pm2.5cnc"], 
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedSite, startDate, endDate]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Anomaly Report", 14, 15);
    doc.text(`Site: ${selectedSite}`, 14, 25);
    doc.text(`Date Range: ${startDate} - ${endDate}`, 14, 35);

    autoTable(doc, {
      startY: 45,
      head: [["Timestamp", "PM10 (µg/m³)", "PM2.5 (µg/m³)"]],
      body: data.map((entry) => [entry.dt_time, entry.pm10cnc, entry.pm2_5cnc]),
    });

    doc.save("Anomaly_Report.pdf");
  };

  // Classification Functions
  const classifyPM25 = (value: number) => {
    if (value <= 30) return 1;
    if (value <= 60) return 2;
    if (value <= 90) return 3;
    if (value <= 120) return 4;
    if (value <= 250) return 5;
    return 6;
  };

  const classifyPM10 = (value: number) => {
    if (value <= 50) return 1;
    if (value <= 100) return 2;
    if (value <= 250) return 3;
    if (value <= 350) return 4;
    if (value <= 430) return 5;
    return 6;
  };

  // Count anomalies for PM2.5 & PM10 separately
  const pm25Counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  const pm10Counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

  data.forEach((entry) => {
    pm25Counts[classifyPM25(entry.pm2_5cnc)]++;
    pm10Counts[classifyPM10(entry.pm10cnc)]++;
  });

  // Format data for pie charts
  const pieDataPM25 = Object.entries(pm25Counts).map(([key, value]) => ({
    name: ["Good", "Satisfactory", "Moderate", "Poor", "Very Poor", "Severe"][parseInt(key) - 1],
    value,
  }));

  const pieDataPM10 = Object.entries(pm10Counts).map(([key, value]) => ({
    name: ["Good", "Satisfactory", "Moderate", "Poor", "Very Poor", "Severe"][parseInt(key) - 1],
    value,
  }));

  // Colors
  const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#FF3333", "#CC0000", "#660000"];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Reports</h1>

      {/* Filters: Search Site, Site Dropdown, Start & End Date */}
      <div className="flex space-x-4">
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
            {sites
              .filter((site) => site.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name} ({site.city})
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="text-lg font-medium">Start Date:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border p-2 rounded-md" />
        </div>

        <div>
          <label className="text-lg font-medium">End Date:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border p-2 rounded-md" />
        </div>
      </div>

      <button
        onClick={generatePDF}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Generate PDF
      </button>
      {/* Pie Charts */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">PM2.5 Anomaly Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieDataPM25} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
                  {pieDataPM25.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">PM10 Anomaly Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieDataPM10} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
                  {pieDataPM10.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Line Graph */}
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold">PM2.5 & PM10 Trends Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="dt_time" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pm2_5cnc" stroke="#FF8042" />
              <Line type="monotone" dataKey="pm10cnc" stroke="#00C49F" />
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
                <TableHead>Timestamp</TableHead>
                <TableHead>PM10 (µg/m³)</TableHead>
                <TableHead>PM2.5 (µg/m³)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.dt_time}</TableCell>
                  <TableCell>{entry.pm10cnc}</TableCell>
                  <TableCell>{entry.pm2_5cnc}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
