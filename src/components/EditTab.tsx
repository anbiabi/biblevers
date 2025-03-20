
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Shuffle } from "lucide-react";
import TopicSelector from '@/components/TopicSelector';
import LanguageSelector from '@/components/LanguageSelector';
import StickerPreview from '@/components/StickerPreview';
import { BibleVerse } from '@/data/bibleVerses';

interface EditTabProps {
  selectedTopics: string[];
  setSelectedTopics: (topics: string[]) => void;
  language: 'english' | 'korean' | 'bilingual';
  setLanguage: (language: 'english' | 'korean' | 'bilingual') => void;
  numberOfSheets: number;
  setNumberOfSheets: (num: number) => void;
  randomizeGradients: boolean;
  setRandomizeGradients: (value: boolean) => void;
  previewVerse: BibleVerse | null;
  refreshPreviewVerse: () => void;
  handleGenerate: () => void;
  isGenerating: boolean;
}

const EditTab: React.FC<EditTabProps> = ({
  selectedTopics,
  setSelectedTopics,
  language,
  setLanguage,
  numberOfSheets,
  setNumberOfSheets,
  randomizeGradients,
  setRandomizeGradients,
  previewVerse,
  refreshPreviewVerse,
  handleGenerate,
  isGenerating
}) => {
  return (
    <div className="space-y-8 animate-slide-up">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardContent className="pt-6">
              <TopicSelector 
                selectedTopics={selectedTopics} 
                onChange={setSelectedTopics} 
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <LanguageSelector 
                language={language} 
                onChange={setLanguage} 
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Number of Sheets</h3>
                <span className="font-medium text-blue-600">{numberOfSheets}</span>
              </div>
              
              <div className="px-2">
                <Slider
                  value={[numberOfSheets]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(values) => setNumberOfSheets(values[0])}
                />
              </div>
              
              <div className="pt-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="randomize-gradients"
                    checked={randomizeGradients}
                    onChange={(e) => setRandomizeGradients(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <Label htmlFor="randomize-gradients">Randomize background colors</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Preview</h3>
              <StickerPreview verse={previewVerse} language={language} />
              
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={refreshPreviewVerse}
              >
                <Shuffle className="w-4 h-4 mr-2" />
                New Random Verse
              </Button>
            </CardContent>
          </Card>

          <Button 
            className="w-full h-12 text-lg shadow-lg transition transform hover:scale-105 bg-gradient-to-r from-blue-600 to-indigo-600"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate Sticker Sheets"}
          </Button>

          <p className="text-xs text-gray-500 text-center px-2">
            Generates {numberOfSheets} sheet{numberOfSheets > 1 ? 's' : ''} with 16 stickers each,
            sized for A4 paper.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditTab;
