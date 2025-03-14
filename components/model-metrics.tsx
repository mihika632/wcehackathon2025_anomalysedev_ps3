"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Model A",
    accuracy: 92,
    precision: 90,
    recall: 88,
  },
  {
    name: "Model B",
    accuracy: 88,
    precision: 85,
    recall: 82,
  },
  {
    name: "Model C",
    accuracy: 85,
    precision: 82,
    recall: 80,
  },
  {
    name: "Model D",
    accuracy: 82,
    precision: 78,
    recall: 75,
  },
]

export function ModelMetrics() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
          />
          <Bar dataKey="accuracy" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary opacity-70" />
          <Bar dataKey="precision" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-blue-500 opacity-70" />
          <Bar dataKey="recall" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-green-500 opacity-70" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

