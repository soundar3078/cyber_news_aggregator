'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun } from 'lucide-react';

export default function AppearanceSettings() {
  const [currentTheme, setCurrentTheme] = useState('dark'); // Default to dark

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setCurrentTheme(storedTheme);
      document.documentElement.className = storedTheme;
    } else {
      // If no theme in localStorage, set to dark by default
      localStorage.setItem('theme', 'dark');
      document.documentElement.className = 'dark';
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.className = newTheme;
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Appearance</CardTitle>
        <CardDescription>Customize the look and feel of the application.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div className="flex items-center space-x-2">
            {currentTheme === 'dark' ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
            <Label htmlFor="theme-toggle" className="text-base">
              {currentTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </Label>
          </div>
          <Switch
            id="theme-toggle"
            checked={currentTheme === 'dark'}
            onCheckedChange={toggleTheme}
            aria-label="Toggle theme"
          />
        </div>
        {/* Placeholder for more appearance settings */}
        <div className="p-4 border border-dashed border-border rounded-lg text-center">
          <p className="text-sm text-muted-foreground">More appearance settings coming soon (e.g., font size, compact mode).</p>
        </div>
      </CardContent>
    </Card>
  );
}
