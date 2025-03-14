"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    epoch: 1,
    accuracy: 45,
    loss: 0.8,
  },
  {
    epoch: 2,
    accuracy: 52,
    loss: 0.6,
  },
  {
    epoch: 3,
    accuracy: 61,
    loss: 0.45,
  },
  {
    epoch: 4,
    accuracy: 67,
    loss: 0.35,
  },
  {
    epoch: 5,
    accuracy: 72,
    loss: 0.28,
  },
  {
    epoch: 6,
    accuracy: 78,
    loss: 0.22,
  },
  {
    epoch: 7,
    accuracy: 82,
    loss: 0.18,
  },
  {
    epoch: 8,
    accuracy: 85,
    loss: 0.15,
  },
  {
    epoch: 9,
    accuracy: 87,
    loss: 0.13,
  },
  {
    epoch: 10,
    accuracy: 89,
    loss: 0.11,
  },
]

export function Overview() {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="epoch" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            yAxisId="left"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
          />
          <YAxis yAxisId="right" orientation="right" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Accuracy</span>
                        <span className="font-bold text-green-500">{payload[0].value}%</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Loss</span>
                        {/* <span className="font-bold text-blue-500">{payload[1].value.toFixed(2)}</span> */}
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Line yAxisId="left" type="monotone" dataKey="accuracy" stroke="#22c55e" strokeWidth={2} />
          <Line yAxisId="right" type="monotone" dataKey="loss" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

