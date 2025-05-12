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
import { Globe, BarChart2, User, ShieldCheck, TrendingUp } from 'lucide-react'; // For location and confidence
import { cn } from "@/lib/utils";

type ThreatCardProps = {
  threat: Threat;
  onClick?: (threat: Threat) => void;
};

export default function ThreatCard({ threat, onClick }: ThreatCardProps) {
  const getSeverityBadgeVariant = (severity: Threat['severity']) => {
    switch (severity) {
      case 'Critical':
        return 'destructive';
      case 'High':
        return 'default'; 
      case 'Medium':
        return 'secondary'; 
      case 'Low':
      default:
        return 'outline';
    }
  };
  
  const getSeverityColorClass = (severity: Threat['severity']) => {
    switch (severity) {
      case 'Critical':
        return 'text-destructive'; 
      case 'High':
        return 'text-orange-400'; 
      case 'Medium':
        return 'text-yellow-400'; 
      case 'Low':
      default:
        return 'text-sky-400'; 
    }
  };

  const getStatusBadgeVariant = (status?: Threat['status']) => {
    switch (status) {
        case 'New': return 'destructive';
        case 'Investigating': return 'default'; // Using primary for investigating
        case 'Contained': return 'secondary';
        case 'Resolved': return 'default'; // Using primary for resolved, but will add specific green
        default: return 'outline';
    }
  }


  return (
    <Card 
      className={cn(
        "flex flex-col h-full hover:shadow-xl transition-shadow duration-200 bg-card",
        onClick && "cursor-pointer"
      )}
      onClick={() => onClick?.(threat)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg leading-tight mb-1 line-clamp-2">{threat.title}</CardTitle>
          <ThreatIcon type={threat.type} className={cn("w-7 h-7 flex-shrink-0 ml-2", getSeverityColorClass(threat.severity))} />
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-1">
          <Badge variant={getSeverityBadgeVariant(threat.severity)} className="text-xs">
            {threat.severity}
          </Badge>
          <Badge variant="outline" className="text-xs">{threat.type}</Badge>
          {threat.status && (
             <Badge 
                variant={getStatusBadgeVariant(threat.status)} 
                className={cn("text-xs", threat.status === 'Resolved' && 'bg-green-600 text-primary-foreground hover:bg-green-700')}
             >
                <ShieldCheck className="w-3 h-3 mr-1" /> {threat.status}
             </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow pb-4">
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {threat.description}
        </p>
        <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
          {threat.location && (
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              <span>{threat.location}</span>
            </div>
          )}
          {threat.confidence && (
             <div className="flex items-center gap-1.5">
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Confidence: {threat.confidence}%</span>
            </div>
          )}
          {threat.assignedTo && (
             <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>Assigned: {threat.assignedTo}</span>
            </div>
          )}
           {threat.tags && threat.tags.length > 0 && (
             <div className="flex items-center gap-1.5 flex-wrap mt-1">
              {/* <Tag className="w-3.5 h-3.5" /> */}
              {threat.tags.slice(0,3).map(tag => <Badge key={tag} variant="secondary" className="text-xs font-normal">{tag}</Badge>)}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground pt-3 border-t border-border">
        <div className="flex justify-between w-full items-center">
          <span>Source: {threat.source}</span>
          <span>{formatDistanceToNow(new Date(threat.timestamp), { addSuffix: true })}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
