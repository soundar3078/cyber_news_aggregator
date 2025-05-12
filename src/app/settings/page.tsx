'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon, Palette, Bell, KeyRound } from "lucide-react";
import AppearanceSettings from "@/components/settings/appearance-settings";
import NotificationSettings from "@/components/settings/notification-settings";
import ApiKeySettings from "@/components/settings/api-key-settings";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground flex items-center">
          <SettingsIcon className="mr-3 h-10 w-10 text-primary" />
          Application Settings
        </h1>
        <p className="text-lg text-muted-foreground mt-1">
          Customize your ThreatWatch experience and manage configurations.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        <AppearanceSettings />
        <NotificationSettings />
        <ApiKeySettings />

        {/* Placeholder for additional settings categories */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <SettingsIcon className="mr-2 h-5 w-5 text-primary" />
              More Settings
            </CardTitle>
            <CardDescription>Additional configuration options will appear here as features are added.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-border rounded-lg bg-card/50">
              <p className="text-muted-foreground text-lg">Future settings will be available here.</p>
              <p className="text-sm text-muted-foreground">Stay tuned for more customization options!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
