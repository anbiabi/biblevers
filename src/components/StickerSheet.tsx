
import React, { useRef } from 'react';
import Sticker from './Sticker';
import { BibleVerse } from '../data/bibleVerses';
import { getRandomGradient } from '../utils/imageGenerator';

interface StickerSheetProps {
  verses: BibleVerse[];
  language: string;
  randomGradients?: boolean;
}

const StickerSheet: React.FC<StickerSheetProps> = ({ 
  verses, 
  language, 
  randomGradients = true 
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  
  // Generate fixed gradients if we're not using random ones
  const fixedGradients = Array(16).fill(null).map(() => getRandomGradient());

  return (
    <div 
      ref={sheetRef} 
      className="sticker-sheet bg-white print:mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 p-6 kids-theme-bg print:kids-theme-bg"
    >
      {verses.map((verse, index) => {
        const gradient = randomGradients 
          ? getRandomGradient() 
          : fixedGradients[index % fixedGradients.length];
        
        return (
          <div key={`${verse.reference}-${index}`} className="aspect-[2/1] flex">
            <Sticker verse={verse} language={language} gradient={gradient} />
          </div>
        );
      })}
    </div>
  );
};

export default StickerSheet;
