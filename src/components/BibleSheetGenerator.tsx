
import React from 'react';
import { BibleVerse } from '@/data/bibleVerses';
import TopicSelector from './TopicSelector';
import LanguageSelector from './LanguageSelector';
import FaithCardPreview from './FaithCardPreview';
import StickerPreview from './StickerPreview';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RefreshCw, Sparkles } from 'lucide-react';

interface BibleSheetGeneratorProps {
  previewVerse: BibleVerse | null;
  isGenerating: boolean;
  numberOfSheets: number;
  selectedTopics: string[];
  language: string;
  generationType: 'cards' | 'stickers';
  setGenerationType: (type: 'cards' | 'stickers') => void;
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column - Controls */}
      <div className="space-y-6">
        {/* Generation Type Toggle */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Generation Type</Label>
          <div className="flex rounded-lg border p-1">
            <button
              onClick={() => setGenerationType('cards')}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                generationType === 'cards'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              Faith Cards
            </button>
            <button
              onClick={() => setGenerationType('stickers')}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                generationType === 'stickers'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              Stickers
            </button>
          </div>
        </div>

        {/* Topic Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Select Topics</Label>
          <TopicSelector 
            selectedTopics={selectedTopics} 
            onChange={handleTopicChange}
            generationType={generationType}
          />
        </div>

        {/* Language Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Language</Label>
          <LanguageSelector 
            language={language} 
            onChange={handleLanguageChange}
          />
        </div>

        {/* Number of Sheets */}
        <div className="space-y-2">
          <Label htmlFor="sheets" className="text-sm font-medium">
            Number of Sheets
          </Label>
          <Input
            id="sheets"
            type="number"
            min="1"
            max="10"
            value={numberOfSheets}
            onChange={handleNumberOfSheetsChange}
            className="w-full"
          />
        </div>

        {/* Generate Button */}
        <Button 
          onClick={handleGenerate}
          disabled={isGenerating || selectedTopics.length === 0}
          className="w-full"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Sparkles className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate {generationType === 'stickers' ? 'Stickers' : 'Faith Cards'}
            </>
          )}
        </Button>
      </div>

      {/* Right Column - Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Preview</Label>
          {previewVerse && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefreshPreview}
              className="h-8"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Refresh
            </Button>
          )}
        </div>
        
        {generationType === 'stickers' ? (
          <StickerPreview verse={previewVerse} language={language} />
        ) : (
          <FaithCardPreview verse={previewVerse} language={language} />
        )}
      </div>
    </div>
  );
};

export default BibleSheetGenerator;
