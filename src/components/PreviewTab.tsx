
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Printer, Leaf } from "lucide-react";
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
        <p className="text-green-600 mb-4 font-comic">No sticker sheets generated yet</p>
        <Button onClick={() => setActiveTab('edit')} className="bg-green-600 hover:bg-green-700 font-comic">
          <Leaf className="w-4 h-4 mr-2" />
          Go to Editor
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="w-full border-green-200 bg-green-50">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-green-800 font-comic">Your Sticker Sheets</h2>
              <p className="text-sm text-green-600 font-comic">
                {generatedSheets.length} sheet{generatedSheets.length > 1 ? 's' : ''} with {generatedSheets.length * 16} stickers total
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handlePrint}
                className="border-green-300 text-green-700 hover:bg-green-100 font-comic"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              
              <Button
                onClick={handleDownload}
                className="bg-green-600 hover:bg-green-700 font-comic"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PNG
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-12 print:space-y-0">
        {generatedSheets.map((verses, index) => (
          <div key={index} className="space-y-4 print:space-y-0 print:mb-0">
            <div className="flex items-center space-x-2 print:hidden">
              <Leaf className="text-green-500 w-5 h-5" />
              <h3 className="text-lg font-medium text-green-700 font-comic">
                Sheet {index + 1}
              </h3>
            </div>
            
            <div className="sticker-topic font-comic text-center text-green-800 bg-green-100 py-1 mb-4 print:mb-1 rounded-lg">
              {verses[0]?.topics[0] || 'Bible Verses'}
            </div>
            
            <div 
              ref={(el) => sheetRefs.current[index] = el}
              className="bg-white p-4 shadow-lg rounded-lg overflow-hidden print:shadow-none print:p-0"
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
        className="w-full border-green-300 text-green-700 hover:bg-green-100 font-comic print:hidden"
        onClick={() => setActiveTab('edit')}
      >
        Back to Editor
      </Button>
    </div>
  );
};

export default PreviewTab;
