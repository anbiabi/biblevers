
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Sparkles, Palette, FileText, CreditCard } from "lucide-react";
import StickerPreview from "./StickerPreview";
import FaithCardPreview from "./FaithCardPreview";
import TopicSelector from "./TopicSelector";
import LanguageSelector from "./LanguageSelector";
import { BibleVerse } from "@/data/bibleVerses";

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
    <div className="space-y-8">
      {/* Generation Type Toggle */}
      <Card className="w-full border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="text-amber-800 font-comic flex items-center">
            <Sparkles className="w-5 h-5 mr-2" />
            Choose Your Creation Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="stickers-mode"
                checked={generationType === 'stickers'}
                onCheckedChange={(checked) => setGenerationType(checked ? 'stickers' : 'cards')}
              />
              <Label htmlFor="stickers-mode" className="flex items-center cursor-pointer font-comic">
                <Palette className="w-4 h-4 mr-2" />
                Bible Stickers
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="cards-mode"
                checked={generationType === 'cards'}
                onCheckedChange={(checked) => setGenerationType(checked ? 'cards' : 'stickers')}
              />
              <Label htmlFor="cards-mode" className="flex items-center cursor-pointer font-comic">
                <CreditCard className="w-4 h-4 mr-2" />
                Faith Cards
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Card */}
      <Card className="w-full border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-orange-800 font-comic flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Customize Your {generationType === 'stickers' ? 'Stickers' : 'Faith Cards'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Topic Selection */}
          <div>
            <h3 className="text-lg font-medium text-orange-700 mb-3 font-comic">Select Topics</h3>
            <TopicSelector
              selectedTopics={selectedTopics}
              onTopicSelect={handleTopicChange}
            />
            {selectedTopics.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedTopics.map((topic) => (
                  <Badge key={topic} variant="secondary" className="bg-orange-200 text-orange-800">
                    {topic}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Language Selection */}
          <div>
            <h3 className="text-lg font-medium text-orange-700 mb-3 font-comic">Language</h3>
            <LanguageSelector
              language={language}
              onLanguageChange={handleLanguageChange}
            />
          </div>

          <Separator />

          {/* Number of Sheets */}
          <div>
            <Label htmlFor="numberOfSheets" className="text-lg font-medium text-orange-700 font-comic">
              Number of Sheets
            </Label>
            <Input
              id="numberOfSheets"
              type="number"
              min="1"
              max="10"
              value={numberOfSheets}
              onChange={handleNumberOfSheetsChange}
              className="mt-2 w-32"
            />
          </div>
        </CardContent>
      </Card>

      {/* Preview Section */}
      <Card className="w-full border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800 font-comic">Preview</CardTitle>
        </CardHeader>
        <CardContent>
          {generationType === 'stickers' ? (
            <StickerPreview verse={previewVerse} language={language} />
          ) : (
            <FaithCardPreview verse={previewVerse} language={language} />
          )}
          <div className="mt-4 flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleRefreshPreview}
              className="font-comic"
            >
              Refresh Preview
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generate Button */}
      <div className="text-center">
        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg font-comic"
        >
          {isGenerating ? 'Generating...' : `Generate ${generationType === 'stickers' ? 'Sticker Sheets' : 'Faith Cards'}`}
        </Button>
      </div>
    </div>
  );
};

export default BibleSheetGenerator;
