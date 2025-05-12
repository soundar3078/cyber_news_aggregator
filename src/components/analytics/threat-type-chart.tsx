'use client';

import * as React from 'react';
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip as RechartsTooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import type { ChartDataPoint } from '@/lib/data-processing';

interface ThreatTypeChartProps {
  data: ChartDataPoint[];
}

// Define a base set of colors for chart segments
const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(var(--primary))', 
  'hsl(var(--secondary))', 
];

const chartConfig = {
  // Dynamic config based on data
};


export default function ThreatTypeChart({ data }: ThreatTypeChartProps) {
    if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Threats by Type</CardTitle>
          <CardDescription>Breakdown of threats by their classification.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">No data available to display type distribution.</p>
        </CardContent>
      </Card>
    );
  }

  // Build chartConfig dynamically from data
  const dynamicChartConfig = data.reduce((acc, item, index) => {
    acc[item.name] = { label: item.name, color: COLORS[index % COLORS.length] };
    return acc;
  }, {} as Record<string, { label: string, color: string }>);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Threats by Type</CardTitle>
        <CardDescription>Breakdown of threats by their classification.</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <ChartContainer config={dynamicChartConfig} className="min-h-[300px] w-full max-w-xs">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false} label={({ percent }) => `${(percent * 100).toFixed(0)}%`}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={dynamicChartConfig[entry.name]?.color || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartLegend content={<ChartLegendContent nameKey="name" />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
