
import type { Threat } from '@/types';
import { format, parseISO } from 'date-fns';

export interface ChartDataPoint {
  name: string;
  value: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // For additional properties like fill color
}

export const processThreatsBySeverity = (threats: Threat[]): ChartDataPoint[] => {
  const severityCounts: Record<string, number> = {};
  threats.forEach(threat => {
    severityCounts[threat.severity] = (severityCounts[threat.severity] || 0) + 1;
  });
  return Object.entries(severityCounts).map(([name, value]) => ({ name, value }));
};

export const processThreatsByType = (threats: Threat[]): ChartDataPoint[] => {
  const typeCounts: Record<string, number> = {};
  threats.forEach(threat => {
    typeCounts[threat.type] = (typeCounts[threat.type] || 0) + 1;
  });
  return Object.entries(typeCounts).map(([name, value]) => ({ name, value }));
};

export const processThreatsOverTime = (threats: Threat[]): ChartDataPoint[] => {
  const threatsByMonth: Record<string, number> = {};
  
  threats.forEach(threat => {
    // Ensure timestamp is a Date object
    const date = typeof threat.timestamp === 'string' ? parseISO(threat.timestamp) : threat.timestamp;
    const monthYear = format(date, 'MMM yyyy');
    threatsByMonth[monthYear] = (threatsByMonth[monthYear] || 0) + 1;
  });

  // Sort by date to ensure correct order in chart
  const sortedMonths = Object.entries(threatsByMonth)
    .map(([monthYear, count]) => ({
      date: new Date(monthYear.split(' ')[1] + '-' + monthYear.split(' ')[0] + '-01'), // Create a sortable date
      name: monthYear,
      value: count,
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map(item => ({ name: item.name, value: item.value }));
    
  return sortedMonths;
};
