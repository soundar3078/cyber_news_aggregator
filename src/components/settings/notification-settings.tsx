'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Bell, Mail, Smartphone } from 'lucide-react';

export default function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Notification Preferences</CardTitle>
        <CardDescription>Manage how you receive alerts and updates.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <Label htmlFor="email-notifications" className="text-base">
              Email Notifications
            </Label>
          </div>
          <Switch
            id="email-notifications"
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
            aria-label="Toggle email notifications"
          />
        </div>
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
           <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <Label htmlFor="in-app-notifications" className="text-base">
              In-App Alerts
            </Label>
          </div>
          <Switch
            id="in-app-notifications"
            checked={inAppNotifications}
            onCheckedChange={setInAppNotifications}
            aria-label="Toggle in-app alerts"
          />
        </div>
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div className="flex items-center space-x-2">
            <Smartphone className="h-5 w-5 text-muted-foreground" />
            <Label htmlFor="push-notifications" className="text-base">
              Push Notifications (Mobile)
            </Label>
          </div>
          <Switch
            id="push-notifications"
            checked={pushNotifications}
            onCheckedChange={setPushNotifications}
            aria-label="Toggle push notifications"
            disabled // Example of a disabled setting
          />
        </div>
         <div className="p-4 border border-dashed border-border rounded-lg text-center">
          <p className="text-sm text-muted-foreground">Fine-tune notification triggers and categories in advanced settings (coming soon).</p>
        </div>
      </CardContent>
    </Card>
  );
}
