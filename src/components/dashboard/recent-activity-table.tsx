
'use client';

import type { Threat } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ThreatIcon from './threat-icon';
import { formatDistanceToNow } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Activity, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecentActivityTableProps {
  threats: Threat[];
  onThreatClick: (threat: Threat) => void;
}

export default function RecentActivityTable({ threats, onThreatClick }: RecentActivityTableProps) {
  const recentThreats = threats.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 10); // Show latest 10

  const getSeverityBadgeVariant = (severity: Threat['severity']) => {
    switch (severity) {
      case 'Critical': return 'destructive';
      case 'High': return 'default';
      case 'Medium': return 'secondary';
      case 'Low': default: return 'outline';
    }
  };
  
  const getSeverityColorClass = (severity: Threat['severity']) => {
    switch (severity) {
      case 'Critical': return 'text-destructive';
      case 'High': return 'text-orange-400';
      case 'Medium': return 'text-yellow-400';
      case 'Low': default: return 'text-sky-400';
    }
  };


  if (recentThreats.length === 0) {
    return (
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center"><Activity className="mr-2 h-5 w-5 text-primary" />Recent Activity</CardTitle>
          <CardDescription>Latest reported threats.</CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <AlertTriangle className="mx-auto h-12 w-12 mb-2" />
            <p>No recent activity to display.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg flex items-center"><Activity className="mr-2 h-5 w-5 text-primary" />Recent Activity</CardTitle>
        <CardDescription>A quick look at the latest reported threats.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]"> {/* Adjust height as needed */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Type</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Reported</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentThreats.map((threat) => (
                <TableRow key={threat.id} onClick={() => onThreatClick(threat)} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <ThreatIcon type={threat.type} className={cn("w-5 h-5", getSeverityColorClass(threat.severity))} />
                  </TableCell>
                  <TableCell className="font-medium truncate max-w-xs">{threat.title}</TableCell>
                  <TableCell>
                    <Badge variant={getSeverityBadgeVariant(threat.severity)}>{threat.severity}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{threat.source}</TableCell>
                  <TableCell>
                     <Badge variant={threat.status === "Resolved" ? "default" : threat.status === "New" ? "destructive" : "secondary"} className={cn(
                        threat.status === "Resolved" && "bg-green-600 hover:bg-green-700",
                        threat.status === "Investigating" && "bg-blue-500 hover:bg-blue-600",
                        threat.status === "Contained" && "bg-yellow-500 hover:bg-yellow-600"
                     )}>
                        {threat.status}
                     </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatDistanceToNow(new Date(threat.timestamp), { addSuffix: true })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
