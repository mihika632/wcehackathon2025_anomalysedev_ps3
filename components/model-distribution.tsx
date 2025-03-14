"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: "Neural Networks", value: 45, color: "#818cf8" },
  { name: "Computer Vision", value: 25, color: "#e879f9" },
  { name: "NLP Models", value: 20, color: "#6366f1" },
  { name: "Reinforcement Learning", value: 10, color: "#c084fc" },
]

export function ModelDistribution() {
  return (
    <Card className="border-premium-indigo-800/20 bg-premium-dark-900/50 backdrop-blur-sm hover:bg-premium-dark-900/80 transition-colors">
      <CardHeader>
        <CardTitle className="text-premium-indigo-100">Model Distribution</CardTitle>
        <CardDescription className="text-premium-indigo-300">Distribution of AI models by type</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border border-premium-indigo-800/20 bg-premium-dark-900/90 p-3 shadow-xl">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: payload[0].payload.color }} />
                          <span className="text-xs text-premium-indigo-200">
                            {payload[0].name}: {payload[0].value}%
                          </span>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

