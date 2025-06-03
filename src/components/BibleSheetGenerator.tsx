
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, RefreshCw } from 'lucide-react';
import { BibleVerse } from '@/data/bibleVerses';
import TopicSelector from './TopicSelector';
import LanguageSelector from './LanguageSelector';
import StickerPreview from './StickerPreview';

interface BibleSheetGeneratorProps {
  previewVerse: BibleVerse | null;
  isGenerating: boolean;
  numberOfSheets: number;
  selectedTopics: string[];
  language: string;
  generationType: 'stickers' | 'cards';
  setGenerationType: (type: 'stickers' | 'cards') => void;
  handleTopicChange: (topic: string) => void;
  handleLanguageChange: (language: string) => void;
  handleNumberOfSheetsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleGenerate: () => void;
  handleRefreshPreview: () => void;
}

const BibleSheetGenerator: React.FC<BibleSheetGeneratorProps> = ({
  previewVerse,
  isGenerating,
  numberOfSheets,
  selectedTopics,
  language,
  generationType,
  setGenerationType,
  handleTopicChange,
  handleLanguageChange,
  handleNumberOfSheetsChange,
  handleGenerate,
  handleRefreshPreview
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Tabs defaultValue="edit" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="edit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generation Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="generation-type">Generation Type</Label>
                <Select
                  value={generationType}
                  onValueChange={(value: 'stickers' | 'cards') => setGenerationType(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select generation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stickers">Bible Stickers (16 per sheet)</SelectItem>
                    <SelectItem value="cards">Faith Cards (4 per sheet)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="number-of-sheets">Number of Sheets</Label>
                <Input
                  id="number-of-sheets"
                  type="number"
                  min="1"
                  max="10"
                  value={numberOfSheets}
                  onChange={handleNumberOfSheetsChange}
                />
              </div>

              <LanguageSelector
                selectedLanguage={language}
                onLanguageChange={handleLanguageChange}
              />

              <TopicSelector
                selectedTopics={selectedTopics}
                onTopicChange={handleTopicChange}
              />

              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  `Generate ${numberOfSheets} ${generationType} Sheet${numberOfSheets > 1 ? 's' : ''}`
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Preview</CardTitle>
              <Button
                onClick={handleRefreshPreview}
                variant="outline"
                size="sm"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </CardHeader>
            <CardContent>
              {previewVerse ? (
                <StickerPreview
                  verse={previewVerse}
                  language={language}
                />
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  Select topics to see a preview
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BibleSheetGenerator;
