'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import ThreatCard from '@/components/dashboard/threat-card';
import ThreatFilters from '@/components/dashboard/threat-filters';
import AiSummarySection from '@/components/dashboard/ai-summary-section';
import { mockThreats, uniqueThreatTypes, uniqueSeverities, uniqueSources } from '@/lib/mock-data';
import type { Threat, Filters } from '@/types';
import { AlertTriangle, LayoutGrid, List, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { format } from 'date-fns';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [allThreats, setAllThreats] = useState<Threat[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setAllThreats(mockThreats);
      setLastRefreshed(new Date()); // Set refresh timestamp
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters({});
  }, []);

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
        <div className="flex flex-col items-end space-y-2 md:space-y-0 md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0">
          {lastRefreshed && !isLoading && (
            <div className="text-xs text-muted-foreground flex items-center">
              <Info size={14} className="mr-1" />
              Data last refreshed: {format(lastRefreshed, "MMM d, yyyy HH:mm:ss")}
            </div>
          )}
          <ToggleGroup type="single" value={viewMode} onValueChange={(value) => { if (value) setViewMode(value as 'grid' | 'list');}} >
              <ToggleGroupItem value="grid" aria-label="Grid view">
                  <LayoutGrid className="h-5 w-5" />
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="List view">
                  <List className="h-5 w-5" />
              </ToggleGroupItem>
          </ToggleGroup>
        </div>
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
        <Card className="py-12 shadow-md">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <AlertTriangle className="w-20 h-20 text-primary mb-6" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">No Threats Found</h2>
            <p className="text-muted-foreground max-w-md">
              No threats match your current filter criteria. Try adjusting your filters or check back later for new updates.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
