
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, FileText, Leaf } from "lucide-react";
import StickerSheet from '@/components/StickerSheet';
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
}

const PreviewTab: React.FC<PreviewTabProps> = ({
  generatedSheets,
  language,
  randomGradients,
  handleDownload,
  handlePdfDownload,
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700 font-comic">
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
              <Leaf className="text-green-500 w-5 h-5" />
              <h3 className="text-lg font-medium text-green-700 font-comic">
                Sheet {index + 1}
              </h3>
            </div>
            
            <div 
              ref={(el) => sheetRefs.current[index] = el}
              className="overflow-auto max-w-full shadow-md"
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
        className="w-full border-green-300 text-green-700 hover:bg-green-100 font-comic"
        onClick={() => setActiveTab('edit')}
      >
        Back to Editor
      </Button>
    </div>
  );
};

export default PreviewTab;
