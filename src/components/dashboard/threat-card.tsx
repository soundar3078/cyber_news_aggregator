import type { Threat } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ThreatIcon from './threat-icon';
import { formatDistanceToNow } from 'date-fns';
import { Globe, BarChart2 } from 'lucide-react'; // For location and confidence

type ThreatCardProps = {
  threat: Threat;
};

export default function ThreatCard({ threat }: ThreatCardProps) {
  const getSeverityBadgeVariant = (severity: Threat['severity']) => {
    switch (severity) {
      case 'Critical':
        return 'destructive';
      case 'High':
        return 'default'; // Will use primary color (red)
      case 'Medium':
        return 'secondary'; // A less prominent color
      case 'Low':
      default:
        return 'outline';
    }
  };
  
  const getSeverityColorClass = (severity: Threat['severity']) => {
    switch (severity) {
      case 'Critical':
        return 'text-destructive'; // Red
      case 'High':
        return 'text-orange-400'; // Orange
      case 'Medium':
        return 'text-yellow-400'; // Yellow
      case 'Low':
      default:
        return 'text-sky-400'; // Blue/Sky
    }
  };

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200 bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg leading-tight mb-1">{threat.title}</CardTitle>
          <ThreatIcon type={threat.type} className={cn("w-7 h-7 flex-shrink-0 ml-2", getSeverityColorClass(threat.severity))} />
        </div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Badge variant={getSeverityBadgeVariant(threat.severity)} className="text-xs">
            {threat.severity}
          </Badge>
          <Badge variant="outline" className="text-xs">{threat.type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow pb-4">
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {threat.description}
        </p>
        <div className="mt-3 space-y-1 text-xs text-muted-foreground">
          {threat.location && (
            <div className="flex items-center gap-1.5">
              <Globe className="w-3 h-3" />
              <span>{threat.location}</span>
            </div>
          )}
          {threat.confidence && (
             <div className="flex items-center gap-1.5">
              <BarChart2 className="w-3 h-3" />
              <span>Confidence: {threat.confidence}%</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground pt-2 border-t border-border">
        <div className="flex justify-between w-full items-center">
          <span>Source: {threat.source}</span>
          <span>{formatDistanceToNow(new Date(threat.timestamp), { addSuffix: true })}</span>
        </div>
      </CardFooter>
    </Card>
  );
}

// Helper import
import { cn } from "@/lib/utils";
