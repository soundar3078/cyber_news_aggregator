'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import type { ChartDataPoint } from '@/lib/data-processing';

interface ThreatSeverityChartProps {
  data: ChartDataPoint[];
}

const chartConfig = {
  value: {
    label: 'Threats',
    color: 'hsl(var(--chart-1))',
  },
  Low: { color: 'hsl(var(--chart-2))' },
  Medium: { color: 'hsl(var(--chart-3))' },
  High: { color: 'hsl(var(--chart-4))' },
  Critical: { color: 'hsl(var(--chart-5))' },
};


export default function ThreatSeverityChart({ data }: ThreatSeverityChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Threats by Severity</CardTitle>
          <CardDescription>Distribution of threats based on their severity level.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">No data available to display severity distribution.</p>
        </CardContent>
      </Card>
    );
  }
  
  // Assign specific colors based on severity name
  const coloredData = data.map(item => ({
    ...item,
    fill: chartConfig[item.name as keyof typeof chartConfig]?.color || chartConfig.value.color,
  }));


  return (
    <Card>
      <CardHeader>
        <CardTitle>Threats by Severity</CardTitle>
        <CardDescription>Distribution of threats based on their severity level.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={coloredData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
