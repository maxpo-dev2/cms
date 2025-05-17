"use client"
import {
  BarChart as RechartsBarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export { Bar, Line, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer }

export function BarChart({
  data,
  index,
  categories,
  colors,
  valueFormatter,
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
  showGridLines = true,
  ...props
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data} {...props}>
        {showGridLines && <CartesianGrid strokeDasharray="3 3" />}
        {showXAxis && <XAxis dataKey={index} />}
        {showYAxis && <YAxis />}
        <Tooltip formatter={valueFormatter} />
        {showLegend && <Legend />}
        {categories.map((category, i) => (
          <Bar key={category} dataKey={category} fill={colors?.[i] || "#8884d8"} />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

export function LineChart({
  data,
  index,
  categories,
  colors,
  valueFormatter,
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
  showGridLines = true,
  ...props
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data} {...props}>
        {showGridLines && <CartesianGrid strokeDasharray="3 3" />}
        {showXAxis && <XAxis dataKey={index} />}
        {showYAxis && <YAxis />}
        <Tooltip formatter={valueFormatter} />
        {showLegend && <Legend />}
        {categories.map((category, i) => (
          <Line key={category} type="monotone" dataKey={category} stroke={colors?.[i] || "#8884d8"} />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}

export function PieChart({
  data,
  index,
  categories,
  colors,
  valueFormatter,
  showLegend = true,
  showLabels = true,
  ...props
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart {...props}>
        <Tooltip formatter={valueFormatter} />
        {showLegend && <Legend />}
        <Pie data={data} nameKey={index} dataKey={categories[0]} cx="50%" cy="50%" outerRadius={80} label={showLabels}>
          {data.map((entry, i) => (
            <Cell key={`cell-${i}`} fill={colors?.[i] || "#8884d8"} />
          ))}
        </Pie>
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}

// Add the Chart component that was missing
export function Chart({
  type = "bar",
  data,
  index,
  categories,
  colors,
  valueFormatter,
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
  showGridLines = true,
  showLabels,
  ...props
}) {
  if (type === "bar") {
    return (
      <BarChart
        data={data}
        index={index}
        categories={categories}
        colors={colors}
        valueFormatter={valueFormatter}
        showLegend={showLegend}
        showXAxis={showXAxis}
        showYAxis={showYAxis}
        showGridLines={showGridLines}
        {...props}
      />
    )
  }

  if (type === "line") {
    return (
      <LineChart
        data={data}
        index={index}
        categories={categories}
        colors={colors}
        valueFormatter={valueFormatter}
        showLegend={showLegend}
        showXAxis={showXAxis}
        showYAxis={showYAxis}
        showGridLines={showGridLines}
        {...props}
      />
    )
  }

  if (type === "pie") {
    return (
      <PieChart
        data={data}
        index={index}
        categories={categories}
        colors={colors}
        valueFormatter={valueFormatter}
        showLegend={showLegend}
        showLabels={showLabels}
        {...props}
      />
    )
  }

  return null
}

export const ChartContainer = ({ children }) => {
  return <div className="w-full h-full">{children}</div>
}

export const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }

  return null
}
