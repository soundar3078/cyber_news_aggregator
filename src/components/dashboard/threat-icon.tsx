import { 
  ShieldAlert, 
  Fish, 
  ServerCrash, 
  BugPlay, 
  DatabaseZap, 
  AlertTriangle,
  UserX, // For Insider Threat
  Target // For APT
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';

type ThreatIconProps = {
  type: string;
} & LucideProps;

export default function ThreatIcon({ type, className, ...props }: ThreatIconProps) {
  const iconProps = { className: cn("w-5 h-5", className), ...props };

  switch (type.toLowerCase()) {
    case 'malware':
      return <ShieldAlert {...iconProps} />;
    case 'phishing':
      return <Fish {...iconProps} />;
    case 'ddos':
      return <ServerCrash {...iconProps} />;
    case 'vulnerability exploit':
      return <BugPlay {...iconProps} />;
    case 'data breach':
      return <DatabaseZap {...iconProps} />;
    case 'insider threat':
      return <UserX {...iconProps} />;
    case 'apt': // Advanced Persistent Threat
      return <Target {...iconProps} />;
    default:
      return <AlertTriangle {...iconProps} />;
  }
}

// Helper to avoid repeating cn in every case if not passed specific className
import { cn } from "@/lib/utils";
