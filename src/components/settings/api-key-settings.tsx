'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, KeyRound, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ApiKeySettings() {
  const [apiKey, setApiKey] = useState('********************************'); // Placeholder
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // In a real app, this would be fetched or managed securely
  const actualApiKey = "MOCK_API_KEY_dkf93kf93kd9f3kd9f3kd9fk3d"; 

  const handleToggleShowApiKey = () => {
    setShowApiKey(!showApiKey);
    if (!showApiKey) {
        setApiKey(actualApiKey);
    } else {
        setApiKey('********************************');
    }
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(actualApiKey).then(() => {
      setCopied(true);
      toast({
        title: "API Key Copied",
        description: "The API key has been copied to your clipboard.",
        variant: "default",
      });
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      toast({
        title: "Copy Failed",
        description: "Could not copy API key to clipboard.",
        variant: "destructive",
      });
      console.error('Failed to copy API key: ', err);
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">API Configuration</CardTitle>
        <CardDescription>Manage your API key for accessing ThreatWatch services programmatically.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="api-key-input" className="flex items-center">
            <KeyRound className="h-4 w-4 mr-2 text-muted-foreground" />
            Your API Key
          </Label>
          <div className="flex items-center space-x-2">
            <Input
              id="api-key-input"
              type={showApiKey ? 'text' : 'password'}
              value={apiKey}
              readOnly
              className="bg-muted/50 border-border flex-grow"
            />
            <Button variant="outline" size="icon" onClick={handleToggleShowApiKey} aria-label={showApiKey ? "Hide API key" : "Show API key"}>
              {showApiKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </Button>
            <Button variant="outline" size="icon" onClick={handleCopyApiKey} aria-label="Copy API key">
              {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Use this key to authenticate API requests. Keep it confidential.
          </p>
        </div>

        <Button variant="destructive" className="w-full sm:w-auto">
          Regenerate API Key
        </Button>
        <p className="text-xs text-destructive text-center sm:text-left">
          Warning: Regenerating will invalidate your current API key immediately.
        </p>

        <div className="p-4 border border-dashed border-border rounded-lg">
          <h4 className="font-semibold mb-2 text-sm">API Usage Guidelines:</h4>
          <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground">
            <li>Rate limits apply: 100 requests per minute.</li>
            <li>Refer to the API documentation for endpoint details and best practices.</li>
            <li>Store your API key securely and do not expose it in client-side code.</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
