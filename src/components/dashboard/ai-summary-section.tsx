'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea'; // For manual input if needed
import { summarizeThreatData, type SummarizeThreatDataOutput } from '@/ai/flows/summarize-threat-data';
import type { Threat } from '@/types';
import { Loader2, AlertTriangle, CheckCircle, Wand2 } from 'lucide-react'; // Wand2 for AI magic

type AiSummarySectionProps = {
  threatsToSummarize: Threat[];
};

export default function AiSummarySection({ threatsToSummarize }: AiSummarySectionProps) {
  const [summaryResult, setSummaryResult] = useState<SummarizeThreatDataOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setError(null);
    setSummaryResult(null);

    if (threatsToSummarize.length === 0) {
      setError("No threat data available to summarize.");
      setIsLoading(false);
      return;
    }

    // Create a concise string representation of threats
    const threatDataString = threatsToSummarize
      .map(t => `Title: ${t.title}\nType: ${t.type}\nSeverity: ${t.severity}\nSource: ${t.source}\nDescription: ${t.description}\nTimestamp: ${t.timestamp.toISOString()}`)
      .join('\n\n---\n\n');
    
    // Truncate if too long for the AI model (example limit, adjust as needed)
    const maxInputLength = 10000; // Adjust based on model context window
    const truncatedData = threatDataString.length > maxInputLength 
        ? threatDataString.substring(0, maxInputLength) + "\n... (data truncated)"
        : threatDataString;

    try {
      const result = await summarizeThreatData({ threatData: truncatedData });
      setSummaryResult(result);
    } catch (e) {
      console.error("Error generating summary:", e);
      setError('Failed to generate threat summary. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-6 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle className="text-lg">AI Threat Summary</CardTitle>
            <Button onClick={handleGenerateSummary} disabled={isLoading || threatsToSummarize.length === 0}>
            {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Wand2 className="mr-2 h-4 w-4" />
            )}
            Generate Summary
            </Button>
        </div>
        <CardDescription>
          AI-powered analysis of current threat data to highlight key findings and emerging patterns.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex items-center justify-center p-6 text-muted-foreground">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            <span>Generating summary...</span>
          </div>
        )}
        {error && (
          <div className="flex items-center p-4 bg-destructive/10 text-destructive rounded-md">
            <AlertTriangle className="mr-2 h-5 w-5" />
            <span>{error}</span>
          </div>
        )}
        {summaryResult && !isLoading && !error && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-md mb-1">Key Findings:</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{summaryResult.summary || "No summary provided."}</p>
            </div>
            {summaryResult.reliableSources && summaryResult.reliableSources.length > 0 && (
              <div>
                <h3 className="font-semibold text-md mb-1">Identified Reliable Sources:</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {summaryResult.reliableSources.map((source, index) => (
                    <li key={index}>{source}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        {!summaryResult && !isLoading && !error && (
            <p className="text-sm text-center text-muted-foreground py-4">
                Click "Generate Summary" to get an AI-powered analysis of the current threats.
            </p>
        )}
      </CardContent>
    </Card>
  );
}
