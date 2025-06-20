import React, { useEffect, useState } from 'react';
import Wallpaper from './Wallpaper';
import { BibleVerse } from '@/data/bibleVerses';

interface WallpaperPreviewProps {
  verse: BibleVerse | null;
  language: string;
}

const WallpaperPreview: React.FC<WallpaperPreviewProps> = ({ verse, language }) => {
  const [key, setKey] = useState(0);
  
  useEffect(() => {
    // Change key when verse changes to force re-render
    setKey(prev => prev + 1);
  }, [verse]);
  
  if (!verse) {
    return (
      <div className="w-full aspect-[9/16] rounded-lg border border-dashed border-green-300 flex items-center justify-center bg-green-50 max-w-xs mx-auto">
        <p className="text-green-500 font-comic text-center px-4">Select topics and language to see a preview</p>
      </div>
    );
  }
  
  return (
    <div className="relative max-w-xs mx-auto">
      <div className="w-full rounded-lg overflow-hidden shadow-lg">
        <Wallpaper key={key} verse={verse} language={language} />
      </div>
    </div>
  );
};

export default WallpaperPreview;