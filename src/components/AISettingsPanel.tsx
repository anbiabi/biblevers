
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { AIImageService } from '@/services/AIImageService';
import { toast } from 'sonner';
import { Settings, Key, Sparkles } from 'lucide-react';

interface AISettingsPanelProps {
  isVisible: boolean;
  onToggle: () => void;
}

const AISettingsPanel: React.FC<AISettingsPanelProps> = ({ isVisible, onToggle }) => {
  const [apiKey, setApiKey] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast.error('Please enter a valid API key');
      return;
    }

    AIImageService.getInstance().setApiKey(apiKey);
    setIsConnected(true);
    toast.success('AI image generation enabled!');
    
    // Store in localStorage for persistence
    localStorage.setItem('huggingface_api_key', apiKey);
  };

  const handleDisconnect = () => {
    setApiKey('');
    setIsConnected(false);
    localStorage.removeItem('huggingface_api_key');
    toast.info('AI image generation disabled');
  };

  React.useEffect(() => {
    const savedKey = localStorage.getItem('huggingface_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setIsConnected(true);
      AIImageService.getInstance().setApiKey(savedKey);
    }
  }, []);

  if (!isVisible) {
    return (
      <Button 
        onClick={onToggle}
        variant="outline" 
        size="sm"
        className="fixed top-4 right-4 z-50"
      >
        <Sparkles className="w-4 h-4 mr-2" />
        AI Settings
      </Button>
    );
  }

  return (
    <Card className="fixed top-4 right-4 z-50 w-80">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm">
          <span className="flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            AI Image Generation
          </span>
          <Button onClick={onToggle} variant="ghost" size="sm">×</Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConnected ? (
          <>
            <div>
              <Label htmlFor="api-key" className="text-xs">
                Hugging Face API Key
              </Label>
              <Input
                id="api-key"
                type="password"
                placeholder="hf_..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Get your free API key at{' '}
                <a 
                  href="https://huggingface.co/settings/tokens" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  huggingface.co
                </a>
              </p>
            </div>
            <Button onClick={handleSaveApiKey} className="w-full" size="sm">
              <Key className="w-4 h-4 mr-2" />
              Connect AI
            </Button>
          </>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center text-green-600 text-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              AI Generation Active
            </div>
            <Button 
              onClick={handleDisconnect} 
              variant="outline" 
              size="sm" 
              className="w-full"
            >
              Disconnect
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AISettingsPanel;
