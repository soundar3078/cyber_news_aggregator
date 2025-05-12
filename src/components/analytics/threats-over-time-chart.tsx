'use client';

import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { ChartDataPoint } from '@/lib/data-processing';

interface ThreatsOverTimeChartProps {
  data: ChartDataPoint[];
}

const chartConfig = {
  threats: {
    label: 'Threats',
    color: 'hsl(var(--primary))',
  },
};

export default function ThreatsOverTimeChart({ data }: ThreatsOverTimeChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Threats Over Time</CardTitle>
          <CardDescription>Monthly trend of reported cyber threats.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">No data available to display threat trends.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Threats Over Time</CardTitle>
        <CardDescription>Monthly trend of reported cyber threats.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line type="monotone" dataKey="value" stroke="var(--color-threats)" strokeWidth={2} dot={true} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
