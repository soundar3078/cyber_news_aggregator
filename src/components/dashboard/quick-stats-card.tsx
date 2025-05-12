
import type { QuickStat } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickStatsCardProps {
  stat: QuickStat;
}

export default function QuickStatsCard({ stat }: QuickStatsCardProps) {
  const TrendIcon = stat.trend === 'up' ? ArrowUpRight : stat.trend === 'down' ? ArrowDownRight : Minus;
  const trendColor = stat.trend === 'up' ? 'text-green-500' : stat.trend === 'down' ? 'text-destructive' : 'text-muted-foreground';

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
        <stat.icon className={cn("h-5 w-5 text-muted-foreground", stat.color)} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{stat.value}</div>
        {stat.trendValue && (
          <p className={cn("text-xs mt-1 flex items-center", trendColor)}>
            <TrendIcon className="h-4 w-4 mr-1" />
            {stat.trendValue}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
