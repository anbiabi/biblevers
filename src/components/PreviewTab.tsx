
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Printer } from "lucide-react";
import StickerSheet from '@/components/StickerSheet';
import { BibleVerse } from '@/data/bibleVerses';

interface PreviewTabProps {
  generatedSheets: BibleVerse[][];
  language: 'english' | 'korean' | 'bilingual';
  randomGradients: boolean;
  handleDownload: () => void;
  handlePrint: () => void;
  setActiveTab: (tab: string) => void;
  sheetRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const PreviewTab: React.FC<PreviewTabProps> = ({
  generatedSheets,
  language,
  randomGradients,
  handleDownload,
  handlePrint,
  setActiveTab,
  sheetRefs
}) => {
  if (generatedSheets.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <p className="text-gray-500 mb-4">No sticker sheets generated yet</p>
        <Button onClick={() => setActiveTab('edit')}>
          Go to Editor
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">Your Sticker Sheets</h2>
              <p className="text-sm text-gray-500">
                {generatedSheets.length} sheet{generatedSheets.length > 1 ? 's' : ''} with {generatedSheets.length * 16} stickers total
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handlePrint}
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              
              <Button
                onClick={handleDownload}
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-12">
        {generatedSheets.map((verses, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-lg font-medium">
              Sheet {index + 1}
            </h3>
            
            <div 
              ref={(el) => sheetRefs.current[index] = el}
              className="bg-white p-4 shadow-lg rounded-lg overflow-hidden"
            >
              <StickerSheet
                verses={verses}
                language={language}
                randomGradients={randomGradients}
              />
            </div>
          </div>
        ))}
      </div>
      
      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => setActiveTab('edit')}
      >
        Back to Editor
      </Button>
    </div>
  );
};

export default PreviewTab;
