
'use client';

import { useEffect, useState } from 'react';
import QuickStatsCard from './quick-stats-card';
import type { QuickStat } from '@/types';
import { AlertTriangle, ShieldAlert, TrendingUp, ListChecks, Users, Bot, Network, Clock } from 'lucide-react';
import { getTotalThreats, getCriticalThreatsCount, getNewThreatsTodayCount, getMostCommonThreatType } from '@/lib/mock-data';
import { Skeleton } from '../ui/skeleton';
import { Card, CardHeader, CardContent } from '@/components/ui/card'; // Added Card imports

export default function QuickStats() {
  const [stats, setStats] = useState<QuickStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching/calculating stats
    setTimeout(() => {
      const calculatedStats: QuickStat[] = [
        {
          title: 'Total Threats Reported',
          value: getTotalThreats(),
          icon: ShieldAlert,
          color: 'text-primary',
        },
        {
          title: 'Critical Threats',
          value: getCriticalThreatsCount(),
          icon: AlertTriangle,
          color: 'text-destructive',
          trend: 'up', 
          trendValue: '+5 this week',
        },
        {
          title: 'New Today',
          value: getNewThreatsTodayCount(),
          icon: TrendingUp,
          color: 'text-green-500',
        },
        {
          title: 'Most Common Type',
          value: getMostCommonThreatType(),
          icon: ListChecks,
          color: 'text-sky-500',
        },
        {
            title: 'AI Analyses Ran',
            value: '128', // Placeholder
            icon: Bot,
            color: 'text-purple-500',
            trend: 'up',
            trendValue: '+12 today'
        },
        {
            title: 'Data Sources Connected',
            value: '6', // Placeholder
            icon: Network,
            color: 'text-teal-500',
        },
        {
            title: 'Avg. Detection Time',
            value: '15 min', // Placeholder
            icon: Clock,
            color: 'text-indigo-500',
            trend: 'down',
            trendValue: '-5 min avg.'
        },
        {
            title: 'Active Analysts',
            value: '4', // Placeholder
            icon: Users,
            color: 'text-pink-500',
        }
      ];
      setStats(calculatedStats);
      setIsLoading(false);
    }, 700); // Simulate delay
  }, []);

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {Array.from({ length: 8 }).map((_, index) => ( // Increased skeleton count
          <Card key={index} className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-3/5" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-2/5 mb-1" />
              <Skeleton className="h-3 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      {stats.map((stat) => (
        <QuickStatsCard key={stat.title} stat={stat} />
      ))}
    </div>
  );
}

