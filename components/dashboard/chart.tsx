"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartData {
  name: string;
  value: number;
}

interface DashboardChartProps {
  data: ChartData[];
  dataKey: string;
  type: "leads" | "enrollments" | "revenue";
}

export function DashboardChart({
  data,
  dataKey,
  type,
}: DashboardChartProps) {
  const colorMap = {
    leads: "hsl(var(--chart-1))",
    enrollments: "hsl(var(--chart-2))",
    revenue: "hsl(var(--chart-3))",
  };

  const formatYAxis = (value: number) => {
    if (type === "revenue") {
      return `${value} MAD`;
    }
    return value;
  };

  const formatTooltip = (value: number) => {
    if (type === "revenue") {
      return `${value.toLocaleString()} MAD`;
    }
    return value;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 5,
          left: 5,
          bottom: 0,
        }}
      >
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
          dy={10}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
          width={60}
          tickFormatter={formatYAxis}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        {payload[0].payload.name}
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {formatTooltip(payload[0].value as number)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={colorMap[type]}
          fill={colorMap[type]}
          fillOpacity={0.2}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}