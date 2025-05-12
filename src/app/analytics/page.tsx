
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Analytics</h1>
        <p className="text-muted-foreground">View detailed analytics and trends.</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-6 w-6 text-primary" />
            Analytics Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-lg bg-card">
            <p className="text-muted-foreground text-lg">Analytics data and charts will be displayed here.</p>
            <p className="text-sm text-muted-foreground">This page is currently under construction.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
