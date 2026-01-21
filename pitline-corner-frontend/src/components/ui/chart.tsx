"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    circuit: "Monaco",
    victories: 85,
    podiums: 92,
    top10: 95,
  },
  {
    circuit: "Silverstone",
    victories: 78,
    podiums: 88,
    top10: 91,
  },
  {
    circuit: "Monza",
    victories: 92,
    podiums: 96,
    top10: 98,
  },
  {
    circuit: "Suzuka",
    victories: 70,
    podiums: 82,
    top10: 89,
  },
  {
    circuit: "Abu Dhabi",
    victories: 88,
    podiums: 94,
    top10: 97,
  },
]

export function ChartContainer() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
        <XAxis 
          dataKey="circuit" 
          stroke="rgba(255, 255, 255, 0.8)"
          tick={{ fill: "rgba(255, 255, 255, 0.8)" }}
          tickLine={{ stroke: "rgba(255, 255, 255, 0.2)" }}
        />
        <YAxis 
          stroke="rgba(255, 255, 255, 0.8)"
          tick={{ fill: "rgba(255, 255, 255, 0.8)" }}
          tickLine={{ stroke: "rgba(255, 255, 255, 0.2)" }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            color: "rgba(255, 255, 255, 0.9)"
          }}
          labelStyle={{ color: "rgba(255, 255, 255, 0.9)" }}
        />
        <Legend 
          wrapperStyle={{
            color: "rgba(255, 255, 255, 0.8)"
          }}
        />
        <Bar 
          dataKey="victories" 
          fill="#10b981" 
          name="Victoires"
          radius={[4, 4, 0, 0]}
        />
        <Bar 
          dataKey="podiums" 
          fill="#f59e0b" 
          name="Podiums"
          radius={[4, 4, 0, 0]}
        />
        <Bar 
          dataKey="top10" 
          fill="#3b82f6" 
          name="Top 10"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
