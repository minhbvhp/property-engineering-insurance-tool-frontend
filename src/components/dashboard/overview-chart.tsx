"use client";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export default function OverviewChart() {
  const chartData = [
    { month: "1", desktop: 186, mobile: 80 },
    { month: "2", desktop: 305, mobile: 200 },
    { month: "3", desktop: 237, mobile: 120 },
    { month: "4", desktop: 73, mobile: 190 },
    { month: "5", desktop: 209, mobile: 130 },
    { month: "6", desktop: 214, mobile: 140 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  return (
    <>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full p-8">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
    </>
  );
}
