import type { Threat, ThreatSeverity } from '@/types';

const severities: ThreatSeverity[] = ["Low", "Medium", "High", "Critical"];
const types = ["Malware", "Phishing", "DDoS", "Vulnerability Exploit", "Data Breach", "Insider Threat", "APT"];
const sources = ["SecureIntel", "ThreatFeedX", "GovCyberAlert", "DarkWebWatch", "OpenSourceIntel"];
const locations = ["North America", "Europe", "Asia", "South America", "Africa", "Oceania", "Global"];

const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const getRandomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateDescription = (type: string, title: string): string => {
  switch (type) {
    case "Malware":
      return `Detected ${title}, a new strain of malware targeting financial institutions. Exhibits polymorphic behavior and uses advanced obfuscation techniques. Spreads via spear-phishing emails with malicious attachments.`;
    case "Phishing":
      return `Ongoing ${title} campaign identified. Emails impersonate ${getRandomElement(["Microsoft", "Google", "Apple", "DHL"])} services, attempting to steal login credentials and personal information. Uses sophisticated social engineering tactics.`;
    case "DDoS":
      return `Massive ${title} attack observed against ${getRandomElement(["e-commerce platforms", "gaming servers", "news websites"])}. Attack vectors include UDP flood and NTP amplification. Peak traffic reached ${Math.floor(Math.random()*500)+100} Gbps.`;
    case "Vulnerability Exploit":
      return `Critical vulnerability CVE-${new Date().getFullYear()}-${Math.floor(Math.random() * 90000) + 10000} (${title}) actively exploited in the wild. Affects ${getRandomElement(["Apache Struts", "WordPress Plugin X", "Microsoft Exchange"])}. PoC available. Patch immediately.`;
    case "Data Breach":
      return `Confirmed ${title} at ${getRandomElement(["a major retailer", "a healthcare provider", "a tech company"])}. Estimated ${Math.floor(Math.random()*10)+1} million records compromised, including PII and financial data. Investigation ongoing.`;
    case "Insider Threat":
      return `Suspicious activity linked to a potential ${title}. Unauthorized data exfiltration detected from internal network. Privileged account misuse suspected.`;
    case "APT":
      return `Advanced Persistent Threat group ${getRandomElement(["DragonFly", "Fancy Bear", "Lazarus Group"])} attributed to ${title}. Targets include government and critical infrastructure. Utilizes custom malware and zero-day exploits.`;
    default:
      return `A new cyber threat titled "${title}" of type "${type}" has been reported. Details are emerging.`;
  }
};


export const mockThreats: Threat[] = Array.from({ length: 20 }, (_, i) => {
  const type = getRandomElement(types);
  const titleBase = `${type.replace(/\s+/g, '')}Variant${i + 1}`;
  const title = `${getRandomElement(["Critical", "High Severity", "Urgent", "New"])} ${titleBase}`;
  const timestamp = getRandomDate(new Date(2023, 0, 1), new Date());

  return {
    id: `threat-${i + 1}`,
    title,
    type,
    severity: getRandomElement(severities),
    source: getRandomElement(sources),
    timestamp,
    description: generateDescription(type, titleBase),
    location: getRandomElement(locations),
    confidence: Math.floor(Math.random() * 40) + 60, // 60-100
  };
});

export const uniqueThreatTypes = [...new Set(mockThreats.map(t => t.type))];
export const uniqueSeverities = [...new Set(mockThreats.map(t => t.severity))];
export const uniqueSources = [...new Set(mockThreats.map(t => t.source))];
