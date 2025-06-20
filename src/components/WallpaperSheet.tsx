import React, { useRef } from 'react';
import Wallpaper from './Wallpaper';
import { BibleVerse } from '@/data/bibleVerses';

interface WallpaperSheetProps {
  verses: BibleVerse[];
  language: string;
  selectedTopics?: string[];
}

const WallpaperSheet: React.FC<WallpaperSheetProps> = ({ 
  verses, 
  language,
  selectedTopics = []
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  
  // For wallpapers, we typically show one verse per "sheet"
  const verse = verses[0];

  if (!verse) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">No verse available</p>
      </div>
    );
  }

  return (
    <div 
      ref={sheetRef} 
      className="wallpaper-sheet flex items-center justify-center relative w-full h-auto mx-auto bg-white"
      style={{ 
        pageBreakAfter: 'always',
        boxSizing: 'border-box'
      }}
    >
      <div className="max-w-sm w-full">
        <Wallpaper verse={verse} language={language} />
      </div>
    </div>
  );
};

export default WallpaperSheet;