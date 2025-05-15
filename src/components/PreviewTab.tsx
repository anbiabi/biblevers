
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, FileText, Leaf } from "lucide-react";
import StickerSheet from '@/components/StickerSheet';
import FaithCardSheet from '@/components/FaithCardSheet';
import { BibleVerse } from '@/data/bibleVerses';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface PreviewTabProps {
  generatedSheets: BibleVerse[][];
  language: string;
  randomGradients: boolean;
  handleDownload: () => void;
  handlePdfDownload: () => void;
  setActiveTab: (tab: string) => void;
  sheetRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  selectedTopics: string[];
  generationType: 'stickers' | 'cards';
}

const PreviewTab: React.FC<PreviewTabProps> = ({
  generatedSheets,
  language,
  randomGradients,
  handleDownload,
  handlePdfDownload,
  setActiveTab,
  sheetRefs,
  selectedTopics,
  generationType
}) => {
  if (generatedSheets.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <p className="text-amber-600 mb-4 font-comic">No {generationType} generated yet</p>
        <Button onClick={() => setActiveTab('edit')} className="bg-amber-600 hover:bg-amber-700 font-comic">
          <Leaf className="w-4 h-4 mr-2" />
          Go to Editor
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="w-full border-amber-200 bg-amber-50">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-amber-800 font-comic">
                {generationType === 'stickers' ? 'Your Sticker Sheets' : 'Your Faith Cards'}
              </h2>
              <p className="text-sm text-amber-600 font-comic">
                {generatedSheets.length} sheet{generatedSheets.length > 1 ? 's' : ''} with {
                  generationType === 'stickers' 
                    ? `${generatedSheets.length * 16} stickers` 
                    : `${generatedSheets.length * 4} faith cards`
                } total
              </p>
            </div>
            
            <div className="flex gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-amber-600 hover:bg-amber-700 font-comic">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleDownload}>
                    <Download className="w-4 h-4 mr-2" />
                    High-Res PNG
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handlePdfDownload}>
                    <FileText className="w-4 h-4 mr-2" />
                    PDF Format
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-12">
        {generatedSheets.map((verses, index) => (
          <div key={index} className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="text-orange-500 w-5 h-5" />
              <h3 className="text-lg font-medium text-orange-700 font-comic">
                Sheet {index + 1}
              </h3>
            </div>
            
            <div 
              ref={(el) => sheetRefs.current[index] = el}
              className="overflow-auto max-w-full shadow-md"
            >
              {generationType === 'stickers' ? (
                <StickerSheet
                  verses={verses}
                  language={language}
                  randomGradients={randomGradients}
                  selectedTopics={selectedTopics}
                />
              ) : (
                <FaithCardSheet
                  verses={verses}
                  language={language}
                  selectedTopics={selectedTopics}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      
      <Button 
        variant="outline" 
        className="w-full border-amber-300 text-amber-700 hover:bg-amber-100 font-comic"
        onClick={() => setActiveTab('edit')}
      >
        Back to Editor
      </Button>
    </div>
  );
};

export default PreviewTab;
