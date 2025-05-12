'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Activity, AlertOctagon, PieChart as PieChartIcon } from "lucide-react";
import ThreatSeverityChart from '@/components/analytics/threat-severity-chart';
import ThreatTypeChart from '@/components/analytics/threat-type-chart';
import ThreatsOverTimeChart from '@/components/analytics/threats-over-time-chart';
import { mockThreats } from '@/lib/mock-data';
import { processThreatsBySeverity, processThreatsByType, processThreatsOverTime, type ChartDataPoint } from '@/lib/data-processing';
import { Skeleton } from '@/components/ui/skeleton';

export default function AnalyticsPage() {
  const [severityData, setSeverityData] = useState<ChartDataPoint[]>([]);
  const [typeData, setTypeData] = useState<ChartDataPoint[]>([]);
  const [timeData, setTimeData] = useState<ChartDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data processing
    setTimeout(() => {
      setSeverityData(processThreatsBySeverity(mockThreats));
      setTypeData(processThreatsByType(mockThreats));
      setTimeData(processThreatsOverTime(mockThreats));
      setIsLoading(false);
    }, 500); // Short delay for skeleton visibility
  }, []);

  const PageSkeleton = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index}>
          <CardHeader>
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground flex items-center">
          <BarChart3 className="mr-3 h-10 w-10 text-primary" />
          Threat Analytics
        </h1>
        <p className="text-lg text-muted-foreground mt-1">
          In-depth insights and visualizations of cybersecurity threat data.
        </p>
      </header>

      {isLoading ? (
        <PageSkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="xl:col-span-1">
             <ThreatSeverityChart data={severityData} />
          </div>
          <div className="xl:col-span-1">
            <ThreatTypeChart data={typeData} />
          </div>
          <div className="xl:col-span-2">
            <ThreatsOverTimeChart data={timeData} />
          </div>
          
          {/* Placeholder for more charts or analytic components */}
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-6 w-6 text-primary" />
                Additional Analytics
              </CardTitle>
              <CardDescription>More detailed views and correlations will be available here.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-lg bg-card/50">
                <p className="text-muted-foreground text-lg">Further analytics are under development.</p>
                <p className="text-sm text-muted-foreground">Check back soon for more insights!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
