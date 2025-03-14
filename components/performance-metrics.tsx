"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { timestamp: "00:00", cpu: 45, memory: 62, network: 30 },
  { timestamp: "03:00", cpu: 52, memory: 65, network: 35 },
  { timestamp: "06:00", cpu: 48, memory: 68, network: 38 },
  { timestamp: "09:00", cpu: 70, memory: 72, network: 45 },
  { timestamp: "12:00", cpu: 90, memory: 78, network: 50 },
  { timestamp: "15:00", cpu: 75, memory: 82, network: 48 },
  { timestamp: "18:00", cpu: 85, memory: 85, network: 52 },
  { timestamp: "21:00", cpu: 82, memory: 88, network: 49 },
]

export function PerformanceMetrics() {
  return (
    <Card className="border-premium-indigo-800/20 bg-premium-dark-900/50 backdrop-blur-sm hover:bg-premium-dark-900/80 transition-colors">
      <CardHeader>
        <CardTitle className="text-premium-indigo-100">System Performance</CardTitle>
        <CardDescription className="text-premium-indigo-300">Real-time resource utilization metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e879f9" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#e879f9" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorNetwork" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="timestamp" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border border-premium-indigo-800/20 bg-premium-dark-900/90 p-3 shadow-xl">
                        <div className="grid gap-2">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-premium-indigo-400" />
                            <span className="text-xs text-premium-indigo-200">CPU: {payload[0].value}%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-premium-fuchsia-400" />
                            <span className="text-xs text-premium-fuchsia-200">Memory: {payload[1].value}%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-premium-indigo-600" />
                            <span className="text-xs text-premium-indigo-200">Network: {payload[2].value}%</span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area type="monotone" dataKey="cpu" stroke="#818cf8" fillOpacity={1} fill="url(#colorCpu)" />
              <Area type="monotone" dataKey="memory" stroke="#e879f9" fillOpacity={1} fill="url(#colorMemory)" />
              <Area type="monotone" dataKey="network" stroke="#6366f1" fillOpacity={1} fill="url(#colorNetwork)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

