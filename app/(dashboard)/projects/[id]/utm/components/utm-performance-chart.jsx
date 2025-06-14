"use client"

import { useEffect, useRef } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

export function UtmPerformanceChart({ data }) {
  const chartRef = useRef(null)

  useEffect(() => {
    // This is just to ensure the chart renders properly
    const handleResize = () => {
      if (chartRef.current) {
        // Force a rerender of the chart
        const event = new Event("resize")
        window.dispatchEvent(event)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [data])

  // If no data, show placeholder
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-muted/20 rounded-md">
        <p className="text-muted-foreground">No data available</p>
      </div>
    )
  }

  return (
    <div ref={chartRef} className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="source" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="visits" name="Visits" fill="#8884d8" />
          <Bar yAxisId="right" dataKey="conversions" name="Conversions" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
