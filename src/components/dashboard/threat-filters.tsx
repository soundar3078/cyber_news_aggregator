'use client';

import type { Filters, ThreatSeverity } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, RotateCcwIcon, FilterXIcon } from 'lucide-react';
import { format } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import React, { useState, useEffect } from 'react';

type ThreatFiltersProps = {
  onFilterChange: (filters: Filters) => void;
  onResetFilters: () => void;
  availableTypes: string[];
  availableSeverities: ThreatSeverity[];
  availableSources: string[];
  initialFilters?: Filters;
};

export default function ThreatFilters({
  onFilterChange,
  onResetFilters,
  availableTypes,
  availableSeverities,
  availableSources,
  initialFilters = {},
}: ThreatFiltersProps) {
  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm || '');
  const [threatType, setThreatType] = useState(initialFilters.threatType || '');
  const [severity, setSeverity] = useState(initialFilters.severity || '');
  const [source, setSource] = useState(initialFilters.source || '');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(initialFilters.dateRange);

  useEffect(() => {
    // Debounce or immediate apply
    const filters: Filters = {
      searchTerm: searchTerm || undefined,
      threatType: threatType || undefined,
      severity: severity || undefined,
      source: source || undefined,
      dateRange: dateRange ? { from: dateRange.from, to: dateRange.to } : undefined,
    };
    onFilterChange(filters);
  }, [searchTerm, threatType, severity, source, dateRange, onFilterChange]);

  const handleReset = () => {
    setSearchTerm('');
    setThreatType('');
    setSeverity('');
    setSource('');
    setDateRange(undefined);
    onResetFilters();
  };

  return (
    <Card className="mb-6 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Filter Threats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-end">
          <div className="space-y-1">
            <Label htmlFor="searchTerm">Keyword</Label>
            <Input
              id="searchTerm"
              placeholder="Search threats..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-input"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="threatType">Type</Label>
            <Select value={threatType} onValueChange={setThreatType}>
              <SelectTrigger id="threatType" className="bg-input">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                {availableTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="severity">Severity</Label>
            <Select value={severity} onValueChange={(value) => setSeverity(value as ThreatSeverity)}>
              <SelectTrigger id="severity" className="bg-input">
                <SelectValue placeholder="All Severities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Severities</SelectItem>
                {availableSeverities.map((sev) => (
                  <SelectItem key={sev} value={sev}>
                    {sev}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="source">Source</Label>
            <Select value={source} onValueChange={setSource}>
              <SelectTrigger id="source" className="bg-input">
                <SelectValue placeholder="All Sources" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Sources</SelectItem>
                {availableSources.map((src) => (
                  <SelectItem key={src} value={src}>
                    {src}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Date Range Picker - simplified for now, can be expanded */}
          <div className="space-y-1">
            <Label htmlFor="dateRange">Date Range</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="dateRange"
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-input hover:bg-muted"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, 'LLL dd, y')} - {format(dateRange.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(dateRange.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end pt-4">
          <Button onClick={handleReset} variant="ghost">
            <RotateCcwIcon className="mr-2 h-4 w-4" /> Reset Filters
          </Button>
      </CardFooter>
    </Card>
  );
}

// Import Label, Card etc.
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
