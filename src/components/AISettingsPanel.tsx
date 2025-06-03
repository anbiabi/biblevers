
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Eye, EyeOff, ExternalLink } from "lucide-react";
import { aiImageService } from '@/services/AIImageService';
import { toast } from "sonner";

interface AISettingsPanelProps {
  isVisible: boolean;
  onToggle: () => void;
}

const AISettingsPanel: React.FC<AISettingsPanelProps> = ({ isVisible, onToggle }) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedKey = aiImageService.getApiKey();
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSaveKey = async () => {
    if (!apiKey.trim()) {
      toast.error('Please enter an API key');
      return;
    }

    setIsLoading(true);
    try {
      aiImageService.setApiKey(apiKey.trim());
      toast.success('API key saved successfully!');
      onToggle();
    } catch (error) {
      toast.error('Failed to save API key');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearKey = () => {
    setApiKey('');
    aiImageService.setApiKey('');
    localStorage.removeItem('huggingface_api_key');
    toast.success('API key cleared');
  };

  if (!isVisible) {
    return (
      <Button
        onClick={onToggle}
        className="fixed top-4 right-4 z-50 bg-purple-600 hover:bg-purple-700"
        size="sm"
      >
        <Settings className="w-4 h-4 mr-2" />
        AI Settings
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              AI Image Settings
            </span>
            <Button variant="ghost" size="sm" onClick={onToggle}>
              ×
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">Hugging Face API Key</Label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Input
                  id="api-key"
                  type={showKey ? 'text' : 'password'}
                  placeholder="hf_..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowKey(!showKey)}
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Enter your Hugging Face API key to enable AI-generated backgrounds.
              <a 
                href="https://huggingface.co/settings/tokens" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline inline-flex items-center ml-1"
              >
                Get your key here <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </p>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button
              onClick={handleSaveKey}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? 'Saving...' : 'Save Key'}
            </Button>
            {apiKey && (
              <Button
                onClick={handleClearKey}
                variant="outline"
              >
                Clear
              </Button>
            )}
          </div>

          <div className="text-xs text-muted-foreground pt-2 border-t">
            <p><strong>Note:</strong> Without an API key, the app will use beautiful fallback backgrounds.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AISettingsPanel;
