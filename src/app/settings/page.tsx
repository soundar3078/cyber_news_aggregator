
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react"; // Renamed to avoid conflict with component name

export default function SettingsPage() {
  return (
    <div className="container mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your application settings.</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <SettingsIcon className="mr-2 h-6 w-6 text-primary" />
            Application Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-lg bg-card">
            <p className="text-muted-foreground text-lg">Settings options will be available here.</p>
            <p className="text-sm text-muted-foreground">This page is currently under construction.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
