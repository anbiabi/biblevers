import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Eye, EyeOff, ExternalLink, AlertCircle, Sparkles, Brain, Info } from "lucide-react";
import { aiImageService } from '@/services/AIImageService';
import { openAIService } from '@/services/OpenAIService';
import { toast } from "sonner";

interface AISettingsPanelProps {
  isVisible: boolean;
  onToggle: () => void;
}

const AISettingsPanel: React.FC<AISettingsPanelProps> = ({ isVisible, onToggle }) => {
  const [huggingFaceKey, setHuggingFaceKey] = useState('');
  const [openAIKey, setOpenAIKey] = useState('');
  const [showHFKey, setShowHFKey] = useState(false);
  const [showOpenAIKey, setShowOpenAIKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeProvider, setActiveProvider] = useState<'huggingface' | 'openai'>('huggingface');

  useEffect(() => {
    const savedHFKey = aiImageService.getApiKey();
    const savedOpenAIKey = openAIService.getApiKey();
    if (savedHFKey) {
      setHuggingFaceKey(savedHFKey);
    }
    if (savedOpenAIKey) {
      setOpenAIKey(savedOpenAIKey);
    }
  }, []);

  const handleSaveKeys = async () => {
    setIsLoading(true);
    try {
      if (huggingFaceKey.trim()) {
        aiImageService.setApiKey(huggingFaceKey.trim());
      }
      if (openAIKey.trim()) {
        openAIService.setApiKey(openAIKey.trim());
      }
      toast.success('API keys saved successfully!');
      onToggle();
    } catch (error) {
      toast.error('Failed to save API keys');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearKeys = () => {
    setHuggingFaceKey('');
    setOpenAIKey('');
    aiImageService.setApiKey('');
    openAIService.setApiKey('');
    localStorage.removeItem('huggingface_api_key');
    localStorage.removeItem('openai_api_key');
    toast.success('API keys cleared');
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
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Brain className="w-5 h-5 mr-2" />
              AI Image Settings
            </span>
            <Button variant="ghost" size="sm" onClick={onToggle}>
              ×
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* AI Usage Explanation */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-blue-800">
                <h3 className="font-medium text-sm mb-2">How AI Enhances Your Creations</h3>
                <ul className="text-xs space-y-1">
                  <li>• <strong>Smart Backgrounds:</strong> AI analyzes each Bible verse to generate contextually appropriate backgrounds</li>
                  <li>• <strong>Unique Commentary:</strong> Each verse gets a personalized, meaningful commentary in your selected language</li>
                  <li>• <strong>Automatic Fallback:</strong> If AI fails, beautiful stock images are used instead</li>
                  <li>• <strong>Multiple Providers:</strong> Switch between Hugging Face and OpenAI for best results</li>
                </ul>
              </div>
            </div>
          </div>

          <Tabs value={activeProvider} onValueChange={(value) => setActiveProvider(value as 'huggingface' | 'openai')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="huggingface" className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Hugging Face</span>
              </TabsTrigger>
              <TabsTrigger value="openai" className="flex items-center space-x-2">
                <Brain className="w-4 h-4" />
                <span>OpenAI</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="huggingface" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hf-api-key">Hugging Face API Key</Label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Input
                      id="hf-api-key"
                      type={showHFKey ? 'text' : 'password'}
                      placeholder="hf_..."
                      value={huggingFaceKey}
                      onChange={(e) => setHuggingFaceKey(e.target.value)}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowHFKey(!showHFKey)}
                    >
                      {showHFKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Free tier available. Great for experimentation.
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

              <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="text-amber-800">
                    <p className="font-medium text-xs">Common Hugging Face Issues:</p>
                    <ul className="text-xs mt-1 space-y-1">
                      <li>• <strong>402 Error:</strong> Account needs credits or upgrade</li>
                      <li>• <strong>401 Error:</strong> Invalid or expired API key</li>
                      <li>• <strong>429 Error:</strong> Rate limit exceeded, try later</li>
                      <li>• <strong>503 Error:</strong> Model loading, wait 20 seconds</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="openai" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="openai-api-key">OpenAI API Key</Label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Input
                      id="openai-api-key"
                      type={showOpenAIKey ? 'text' : 'password'}
                      placeholder="sk-..."
                      value={openAIKey}
                      onChange={(e) => setOpenAIKey(e.target.value)}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowOpenAIKey(!showOpenAIKey)}
                    >
                      {showOpenAIKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Higher quality images with DALL-E 3. Requires paid account.
                  <a 
                    href="https://platform.openai.com/api-keys" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center ml-1"
                  >
                    Get your key here <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-md p-3">
                <div className="flex items-start space-x-2">
                  <Brain className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="text-green-800">
                    <p className="font-medium text-xs">OpenAI Advantages:</p>
                    <ul className="text-xs mt-1 space-y-1">
                      <li>• Higher quality, more detailed images</li>
                      <li>• Better understanding of complex prompts</li>
                      <li>• More reliable service uptime</li>
                      <li>• Faster generation times</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex space-x-2 pt-4">
            <Button
              onClick={handleSaveKeys}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? 'Saving...' : 'Save Keys'}
            </Button>
            {(huggingFaceKey || openAIKey) && (
              <Button
                onClick={handleClearKeys}
                variant="outline"
              >
                Clear All
              </Button>
            )}
          </div>

          <div className="text-xs text-muted-foreground pt-2 border-t space-y-2">
            <p><strong>Smart Switching:</strong> The app automatically tries OpenAI first (if key provided), then falls back to Hugging Face, then to beautiful stock images.</p>
            <p><strong>Privacy:</strong> API keys are stored locally in your browser and never sent to our servers.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AISettingsPanel;