export type ThreatSeverity = "Low" | "Medium" | "High" | "Critical";

export type Threat = {
  id: string;
  title: string;
  type: string; // e.g., "Malware", "Phishing", "DDoS"
  severity: ThreatSeverity;
  source: string;
  timestamp: Date;
  description: string;
  location?: string; // Optional: country or region
  confidence?: number; // Optional: 0-100
};

export type Filters = {
  searchTerm?: string;
  threatType?: string;
  severity?: ThreatSeverity;
  source?: string;
  dateRange?: { from?: Date; to?: Date };
};
