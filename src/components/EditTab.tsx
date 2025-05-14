
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Shuffle } from "lucide-react";
import TopicSelector from '@/components/TopicSelector';
import LanguageSelector from '@/components/LanguageSelector';
import StickerPreview from '@/components/StickerPreview';
import { BibleVerse } from '@/data/bibleVerses';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface EditTabProps {
  selectedTopics: string[];
  setSelectedTopics: (topics: string[]) => void;
  language: string;
  setLanguage: (language: string) => void;
  numberOfSheets: number;
  setNumberOfSheets: (num: number) => void;
  randomizeGradients: boolean;
  setRandomizeGradients: (value: boolean) => void;
  previewVerse: BibleVerse | null;
  refreshPreviewVerse: () => void;
  handleGenerate: () => void;
  handleGenerateCards: () => void;
  isGenerating: boolean;
  generationType: 'stickers' | 'cards';
  setGenerationType: (type: 'stickers' | 'cards') => void;
}

const EditTab: React.FC<EditTabProps> = ({
  selectedTopics,
  setSelectedTopics,
  language,
  setLanguage,
  randomizeGradients,
  setRandomizeGradients,
  previewVerse,
  refreshPreviewVerse,
  handleGenerate,
  handleGenerateCards,
  isGenerating,
  generationType,
  setGenerationType
}) => {
  return (
    <div className="space-y-8 animate-slide-up">
      <Card className="border-2 border-green-200 shadow-md">
        <CardContent className="pt-6 pb-6">
          <h3 className="text-xl font-medium mb-6 text-center">Choose Generation Type</h3>
          <div className="flex flex-col space-y-6">
            <RadioGroup
              defaultValue={generationType}
              onValueChange={(value) => setGenerationType(value as 'stickers' | 'cards')}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className={`flex items-start space-x-2 rounded-lg border-2 p-4 ${generationType === 'stickers' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                <RadioGroupItem value="stickers" id="stickers" className="mt-1" />
                <div className="grid gap-1.5">
                  <Label htmlFor="stickers" className="font-semibold text-lg">Bible Stickers</Label>
                  <p className="text-sm text-gray-600">
                    Create sheet with 16 Bible verse stickers each,
                    perfect for children's activities.
                  </p>
                </div>
              </div>
              
              <div className={`flex items-start space-x-2 rounded-lg border-2 p-4 ${generationType === 'cards' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                <RadioGroupItem value="cards" id="cards" className="mt-1" />
                <div className="grid gap-1.5">
                  <Label htmlFor="cards" className="font-semibold text-lg">Faith Cards</Label>
                  <p className="text-sm text-gray-600">
                    Generate sheet with 4 faith declaration cards,
                    ideal for encouragement and reflection.
                  </p>
                </div>
              </div>
            </RadioGroup>
            
            {generationType === 'stickers' ? (
              <Button 
                className="w-full h-12 text-lg shadow-lg transition transform hover:scale-105 bg-gradient-to-r from-blue-600 to-indigo-600"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? "Generating..." : "Generate Sticker Sheets"}
              </Button>
            ) : (
              <Button 
                className="w-full h-12 text-lg shadow-lg transition transform hover:scale-105 bg-gradient-to-r from-green-600 to-teal-600"
                onClick={handleGenerateCards}
                disabled={isGenerating || selectedTopics.length !== 4}
              >
                {isGenerating ? "Generating..." : "Generate Faith Cards"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardContent className="pt-6">
              <TopicSelector 
                selectedTopics={selectedTopics} 
                onChange={setSelectedTopics}
                generationType={generationType} 
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
        </div>
      </div>
    </div>
  );
};

export default EditTab;
