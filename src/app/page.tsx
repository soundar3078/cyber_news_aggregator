
'use client';

import { useState, useMemo, useEffect } from 'react';
import ThreatCard from '@/components/dashboard/threat-card';
import ThreatFilters from '@/components/dashboard/threat-filters';
import AiSummarySection from '@/components/dashboard/ai-summary-section';
import { mockThreats, uniqueThreatTypes, uniqueSeverities, uniqueSources } from '@/lib/mock-data';
import type { Threat, Filters } from '@/types';
import { AlertTriangle, LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [allThreats, setAllThreats] = useState<Threat[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setAllThreats(mockThreats);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  const filteredThreats = useMemo(() => {
    if (isLoading) return [];
    return allThreats.filter((threat) => {
      const { searchTerm, threatType, severity, source, dateRange } = filters;
      if (searchTerm && !threat.title.toLowerCase().includes(searchTerm.toLowerCase()) && !threat.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      if (threatType && threat.type !== threatType) return false;
      if (severity && threat.severity !== severity) return false;
      if (source && threat.source !== source) return false;
      if (dateRange?.from && new Date(threat.timestamp) < dateRange.from) return false;
      if (dateRange?.to && new Date(threat.timestamp) > dateRange.to) return false;
      return true;
    }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [allThreats, filters, isLoading]);

  const ThreatListSkeleton = () => (
    <div className={`gap-6 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'flex flex-col'}`}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="flex flex-col shadow-sm">
          <CardHeader>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="flex-grow">
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/3" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
  

  return (
    <div className="container mx-auto">
      <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Threat Dashboard</h1>
          <p className="text-muted-foreground">Overview of current cyber threats and intelligence.</p>
        </div>
        <ToggleGroup type="single" value={viewMode} onValueChange={(value) => { if (value) setViewMode(value as 'grid' | 'list');}} className="mt-4 md:mt-0">
            <ToggleGroupItem value="grid" aria-label="Grid view">
                <LayoutGrid className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
                <List className="h-5 w-5" />
            </ToggleGroupItem>
        </ToggleGroup>
      </header>

      <AiSummarySection threatsToSummarize={allThreats} />

      <ThreatFilters
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        availableTypes={uniqueThreatTypes}
        availableSeverities={uniqueSeverities}
        availableSources={uniqueSources}
        initialFilters={filters}
      />

      {isLoading ? (
        <ThreatListSkeleton />
      ) : filteredThreats.length > 0 ? (
        <div className={`gap-6 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'flex flex-col space-y-4'}`}>
          {filteredThreats.map((threat) => (
            <ThreatCard key={threat.id} threat={threat} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center bg-card rounded-lg shadow-sm">
          <AlertTriangle className="w-16 h-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold text-foreground">No Threats Found</h2>
          <p className="text-muted-foreground">
            No threats match your current filter criteria, or there is no data available.
          </p>
        </div>
      )}
    </div>
  );
}

