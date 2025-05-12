import type { Threat, ThreatSeverity } from '@/types';

const severities: ThreatSeverity[] = ["Low", "Medium", "High", "Critical"];
const types = ["Malware", "Phishing", "DDoS", "Vulnerability Exploit", "Data Breach", "Insider Threat", "APT"];
const sources = ["SecureIntel", "ThreatFeedX", "GovCyberAlert", "DarkWebWatch", "OpenSourceIntel", "InternalSIEM"];
const locations = ["North America", "Europe", "Asia", "South America", "Africa", "Oceania", "Global", "Undisclosed"];
const statuses: Threat['status'][] = ["New", "Investigating", "Contained", "Resolved"];
const analysts = ["Alice Wonderland", "Bob The Builder", "Charlie Brown", "Diana Prince", "Edward Scissorhands"];
const attackVectors = ["Email Attachment", "Software Vulnerability", "Credential Theft", "Social Engineering", "Drive-by Download", "Remote Desktop Protocol"];
const tags = ["ransomware", "finance", "healthcare", "gov", "critical-infra", "spear-phishing", "zero-day"];

const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomSubset = <T>(arr: T[], max: number = 3): T[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * max) + 1);
};

const getRandomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateDescription = (type: string, title: string): string => {
  switch (type) {
    case "Malware":
      return `Detected ${title}, a new strain of malware targeting financial institutions. Exhibits polymorphic behavior and uses advanced obfuscation techniques. Spreads via spear-phishing emails with malicious attachments. Initial vector appears to be a compromised third-party software update.`;
    case "Phishing":
      return `Ongoing ${title} campaign identified. Emails impersonate ${getRandomElement(["Microsoft", "Google", "Apple", "DHL", "Internal IT"])} services, attempting to steal login credentials and personal information. Uses sophisticated social engineering tactics and lookalike domains. High click-through rate observed.`;
    case "DDoS":
      return `Massive ${title} attack observed against ${getRandomElement(["e-commerce platforms", "gaming servers", "news websites", "payment gateways"])}. Attack vectors include UDP flood, NTP amplification, and SYN flood. Peak traffic reached ${Math.floor(Math.random()*500)+100} Gbps. Multiple C2 servers identified.`;
    case "Vulnerability Exploit":
      return `Critical vulnerability CVE-${new Date().getFullYear()}-${Math.floor(Math.random() * 90000) + 10000} (${title}) actively exploited in the wild. Affects ${getRandomElement(["Apache Struts", "WordPress Plugin X", "Microsoft Exchange", "Log4j"])}. PoC available publicly. Patch immediately; evidence of lateral movement post-exploitation.`;
    case "Data Breach":
      return `Confirmed ${title} at ${getRandomElement(["a major retailer", "a healthcare provider", "a tech company", "a government agency"])}. Estimated ${Math.floor(Math.random()*10)+1} million records compromised, including PII, financial data, and medical records. Investigation ongoing, source likely an unpatched external-facing server.`;
    case "Insider Threat":
      return `Suspicious activity linked to a potential ${title}. Unauthorized data exfiltration and privilege escalation detected from internal network. Privileged account misuse suspected. Activity traced to a specific user account.`;
    case "APT":
      return `Advanced Persistent Threat group ${getRandomElement(["DragonFly", "Fancy Bear", "Lazarus Group", "APT29", "Sandworm"])} attributed to ${title}. Targets include government, critical infrastructure, and research institutions. Utilizes custom malware, zero-day exploits, and sophisticated C&C infrastructure.`;
    default:
      return `A new cyber threat titled "${title}" of type "${type}" has been reported. Details are emerging from multiple intelligence feeds. Further analysis required.`;
  }
};

const generateIOCs = (type: string): { type: string, value: string }[] => {
  const iocs = [];
  const count = Math.floor(Math.random() * 3) + 1;
  for (let i = 0; i < count; i++) {
    const iocType = getRandomElement(["IP Address", "Domain", "File Hash (SHA256)", "URL"]);
    let value = "";
    switch (iocType) {
      case "IP Address":
        value = `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
        break;
      case "Domain":
        value = `malicious-${Math.random().toString(36).substring(7)}.com`;
        break;
      case "File Hash (SHA256)":
        value = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
        break;
      case "URL":
        value = `http://evil-site.net/payload${Math.random().toString(36).substring(2, 7)}.php`;
        break;
    }
    iocs.push({ type: iocType, value });
  }
  if (type === "Phishing") iocs.push({ type: "Email Subject", value: `Urgent Action Required: Account ${Math.random().toString(36).substring(7)}` });
  return iocs;
};

const generateMitigationSteps = (type: string): string[] => {
  const commonSteps = [
    "Isolate affected systems.",
    "Block malicious IPs/domains at firewall/proxy.",
    "Scan systems with updated AV signatures.",
    "Review and update access controls.",
  ];
  switch (type) {
    case "Malware":
      return [...commonSteps, "Deploy EDR solution for advanced threat detection.", "Restore from clean backups if necessary."];
    case "Phishing":
      return ["Educate users on identifying phishing attempts.", "Implement DMARC, DKIM, SPF.", "Use multi-factor authentication (MFA).", "Report phishing emails to IT security."];
    case "Vulnerability Exploit":
      return ["Apply vendor patches immediately.", "Implement virtual patching if immediate patching is not possible.", "Conduct vulnerability scanning.", "Review logs for signs of exploitation."];
    default:
      return [...commonSteps, "Follow incident response plan.", "Engage cybersecurity experts if needed."];
  }
};

export const mockThreats: Threat[] = Array.from({ length: 30 }, (_, i) => { // Increased to 30
  const type = getRandomElement(types);
  const titleBase = `${type.replace(/\s+/g, '')}Campaign${i + 1}`;
  const title = `${getRandomElement(["Critical", "High Severity", "Urgent", "Emerging", "Active"])} ${titleBase}`;
  const timestamp = getRandomDate(new Date(2023, 0, 1), new Date());

  return {
    id: `threat-${i + 1}-${Date.now()}`, // Ensure unique IDs
    title,
    type,
    severity: getRandomElement(severities),
    source: getRandomElement(sources),
    timestamp,
    description: generateDescription(type, titleBase),
    location: getRandomElement(locations),
    confidence: Math.floor(Math.random() * 50) + 50, // Confidence range 50-100
    status: getRandomElement(statuses),
    assignedTo: Math.random() > 0.3 ? getRandomElement(analysts) : undefined,
    attackVector: getRandomElement(attackVectors),
    indicatorsOfCompromise: generateIOCs(type),
    mitigationSteps: generateMitigationSteps(type),
    tags: getRandomSubset(tags, 3),
  };
});

export const uniqueThreatTypes = [...new Set(mockThreats.map(t => t.type))].sort();
export const uniqueSeverities = ["Low", "Medium", "High", "Critical"] as ThreatSeverity[]; // Fixed order
export const uniqueSources = [...new Set(mockThreats.map(t => t.source))].sort();
export const uniqueStatuses = ["New", "Investigating", "Contained", "Resolved"] as Threat['status'][];

// Calculate Quick Stats examples
export const getTotalThreats = () => mockThreats.length;
export const getCriticalThreatsCount = () => mockThreats.filter(t => t.severity === 'Critical').length;
export const getNewThreatsTodayCount = () => {
  const today = new Date();
  today.setHours(0,0,0,0);
  return mockThreats.filter(t => {
    const threatDate = new Date(t.timestamp);
    threatDate.setHours(0,0,0,0);
    return threatDate.getTime() === today.getTime() && t.status === 'New';
  }).length;
};
export const getMostCommonThreatType = () => {
  const typeCounts: Record<string, number> = {};
  mockThreats.forEach(threat => {
    typeCounts[threat.type] = (typeCounts[threat.type] || 0) + 1;
  });
  return Object.entries(typeCounts).sort(([,a],[,b]) => b-a)[0]?.[0] || 'N/A';
};
