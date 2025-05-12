'use server';

/**
 * @fileOverview Summarizes aggregated threat data using AI to provide key findings and emerging threats.
 *
 * - summarizeThreatData - A function that summarizes threat data.
 * - SummarizeThreatDataInput - The input type for the summarizeThreatData function.
 * - SummarizeThreatDataOutput - The return type for the summarizeThreatData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeThreatDataInputSchema = z.object({
  threatData: z
    .string()
    .describe('Aggregated threat data from various sources.'),
});
export type SummarizeThreatDataInput = z.infer<typeof SummarizeThreatDataInputSchema>;

const SummarizeThreatDataOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the key findings and emerging threats.'),
  reliableSources: z.array(z.string()).describe('A list of identified reliable sources in the threat data.'),
});
export type SummarizeThreatDataOutput = z.infer<typeof SummarizeThreatDataOutputSchema>;

export async function summarizeThreatData(input: SummarizeThreatDataInput): Promise<SummarizeThreatDataOutput> {
  return summarizeThreatDataFlow(input);
}

const identifyReliableSource = ai.defineTool({
  name: 'identifyReliableSource',
  description: 'Identifies reliable sources of information in the given text.',
  inputSchema: z.object({
    text: z.string().describe('The text to analyze for reliable sources.'),
  }),
  outputSchema: z.array(z.string()).describe('A list of reliable sources.'),
}, async (input) => {
  // Placeholder implementation, replace with actual logic
  console.log('Identifying reliable sources from:', input.text);
  return ['SourceA', 'SourceB']; // Replace with actual identified sources
});

const prompt = ai.definePrompt({
  name: 'summarizeThreatDataPrompt',
  input: {schema: SummarizeThreatDataInputSchema},
  output: {schema: SummarizeThreatDataOutputSchema},
  tools: [identifyReliableSource],
  prompt: `You are an AI expert in cybersecurity threat analysis. Your task is to summarize the aggregated threat data and identify key findings and emerging threats. Also, use the identifyReliableSource tool to identify reliable sources from the threat data.

Threat Data: {{{threatData}}}

Summary:
`,
  system: `If the user's question asks about reliable source, use the identifyReliableSource tool to get the reliable sources.`,
});

const summarizeThreatDataFlow = ai.defineFlow(
  {
    name: 'summarizeThreatDataFlow',
    inputSchema: SummarizeThreatDataInputSchema,
    outputSchema: SummarizeThreatDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
