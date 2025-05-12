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
  status?: "New" | "Investigating" | "Contained" | "Resolved"; // New field
  assignedTo?: string; // New field - e.g., analyst name
  attackVector?: string; // New field - e.g., "Email Attachment", "Software Vulnerability"
  indicatorsOfCompromise?: { type: string, value: string }[]; // New field - e.g., IP addresses, file hashes
  mitigationSteps?: string[]; // New field
  tags?: string[]; // New field
};

export type Filters = {
  searchTerm?: string;
  threatType?: string;
  severity?: ThreatSeverity;
  source?: string;
  dateRange?: { from?: Date; to?: Date };
  status?: Threat['status'];
};

// For Quick Stats
export type QuickStat = {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: string; // Optional color for icon/text
};
