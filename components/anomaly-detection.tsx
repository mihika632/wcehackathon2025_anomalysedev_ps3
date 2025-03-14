"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const generateAnomalyData = () => {
  const data = []
  let value = 50

  for (let i = 0; i < 100; i++) {
    // Normal fluctuation
    value += Math.random() * 4 - 2

    // Add occasional anomalies
    if (i === 30 || i === 60) {
      value += Math.random() * 20
    }

    data.push({
      timestamp: i,
      value: Math.max(0, Math.min(100, value)),
      threshold: 70,
    })
  }

  return data
}

const data = generateAnomalyData()

export function AnomalyDetection() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="timestamp" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const isAnomaly = payload[0].value > payload[1].value
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Value</span>
                        <span className={`font-bold ${isAnomaly ? "text-red-500" : ""}`}>
                          {payload[0].value.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Threshold</span>
                        <span className="font-bold">{payload[1].value}</span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={false} />
          <Line
            type="monotone"
            dataKey="threshold"
            stroke="#dc2626"
            strokeWidth={1}
            strokeDasharray="5 5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

