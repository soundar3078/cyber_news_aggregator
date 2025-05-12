
'use client';

import type { Threat } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import ThreatIcon from './threat-icon';
import { format } from 'date-fns';
import { AlertTriangle, CheckCircle, Clock, User, Tag, MapPin, ShieldCheck, BarChart2, ListChecks, CornerDownRight, Briefcase, Info } from 'lucide-react';
import { Separator } from '../ui/separator';
import { cn } from '@/lib/utils';

interface ThreatDetailModalProps {
  threat: Threat | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ThreatDetailModal({ threat, isOpen, onClose }: ThreatDetailModalProps) {
  if (!threat) return null;

  const getSeverityColorClass = (severity: Threat['severity']) => {
    switch (severity) {
      case 'Critical': return 'text-destructive border-destructive';
      case 'High': return 'text-orange-400 border-orange-400';
      case 'Medium': return 'text-yellow-500 border-yellow-500';
      case 'Low': default: return 'text-sky-500 border-sky-500';
    }
  };
  
  const getStatusColorClass = (status?: Threat['status']) => {
    switch (status) {
        case 'New': return 'bg-red-500/20 text-red-500 border-red-500/30';
        case 'Investigating': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
        case 'Contained': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
        case 'Resolved': return 'bg-green-500/20 text-green-500 border-green-500/30';
        default: return 'bg-muted text-muted-foreground border-border';
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader className="pr-10"> {/* Add padding for close button */}
          <DialogTitle className="flex items-center text-2xl">
            <ThreatIcon type={threat.type} className={cn("w-7 h-7 mr-3", getSeverityColorClass(threat.severity))} />
            {threat.title}
          </DialogTitle>
          <DialogDescription>
            Detailed information for threat ID: {threat.id}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-grow pr-6 -mr-6"> {/* Counteract DialogContent padding */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 py-4">
            <InfoCard icon={AlertTriangle} label="Severity" value={threat.severity} badgeVariant={getSeverityColorClass(threat.severity)} />
            <InfoCard icon={Tag} label="Type" value={threat.type} />
            <InfoCard icon={Briefcase} label="Source" value={threat.source} />
            <InfoCard icon={Clock} label="Reported" value={format(new Date(threat.timestamp), "PPPp")} />
            {threat.location && <InfoCard icon={MapPin} label="Location" value={threat.location} />}
            {threat.confidence && <InfoCard icon={BarChart2} label="Confidence" value={`${threat.confidence}%`} />}
            {threat.status && <InfoCard icon={ShieldCheck} label="Status" value={threat.status} badgeVariant={getStatusColorClass(threat.status)} />}
            {threat.assignedTo && <InfoCard icon={User} label="Assigned To" value={threat.assignedTo} />}
            {threat.attackVector && <InfoCard icon={CornerDownRight} label="Attack Vector" value={threat.attackVector} />}
        </div>

          <Section title="Description" icon={Info}>
            <p className="text-sm text-muted-foreground leading-relaxed">{threat.description}</p>
          </Section>
          
          {threat.tags && threat.tags.length > 0 && (
            <Section title="Tags" icon={Tag}>
              <div className="flex flex-wrap gap-2">
                {threat.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
              </div>
            </Section>
          )}

          {threat.indicatorsOfCompromise && threat.indicatorsOfCompromise.length > 0 && (
            <Section title="Indicators of Compromise (IOCs)" icon={ListChecks}>
              <ul className="space-y-2 text-sm">
                {threat.indicatorsOfCompromise.map((ioc, index) => (
                  <li key={index} className="p-2 bg-muted/50 rounded-md">
                    <span className="font-semibold text-foreground">{ioc.type}: </span>
                    <span className="text-muted-foreground break-all">{ioc.value}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {threat.mitigationSteps && threat.mitigationSteps.length > 0 && (
            <Section title="Recommended Mitigation Steps" icon={CheckCircle}>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {threat.mitigationSteps.map((step, index) => <li key={index}>{step}</li>)}
              </ul>
            </Section>
          )}
        </ScrollArea>

        <DialogFooter className="mt-auto pt-4 border-t">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button>Take Action</Button> {/* Placeholder action button */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface InfoCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  badgeVariant?: string;
}

function InfoCard({ icon: Icon, label, value, badgeVariant }: InfoCardProps) {
  return (
    <div className="p-4 bg-card border rounded-lg shadow-sm">
      <div className="flex items-center text-sm text-muted-foreground mb-1">
        <Icon className="w-4 h-4 mr-2" />
        {label}
      </div>
      {badgeVariant ? (
         <Badge variant="outline" className={cn("text-base font-semibold px-2 py-0.5 border", badgeVariant)}>{value}</Badge>
      ) : (
        <p className="text-base font-semibold text-foreground">{value}</p>
      )}
    </div>
  );
}

interface SectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}
function Section({ title, icon: Icon, children }: SectionProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center">
        <Icon className="w-5 h-5 mr-2 text-primary" />
        {title}
      </h3>
      <Separator className="mb-3"/>
      {children}
    </div>
  )
}
