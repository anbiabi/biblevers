
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
      className="sticker-sheet grid grid-cols-2 gap-0 relative w-[210mm] h-[297mm] p-0 m-0 print:m-0 print:p-0 kids-theme-bg print:kids-theme-bg"
    >
      {/* Semi-transparent topic overlay at the top of sheet */}
      {verses.length > 0 && verses[0]?.topics[0] && (
        <div className="absolute top-2 left-0 right-0 z-10 text-center pointer-events-none">
          <span className="sticker-topic opacity-50 text-sm">{verses[0]?.topics[0]}</span>
        </div>
      )}
      
      {/* Grid of stickers */}
      {verses.map((verse, index) => {
        const gradient = randomGradients 
          ? getRandomGradient() 
          : fixedGradients[index % fixedGradients.length];
        
        return (
          <div key={`${verse.reference}-${index}`} className="relative h-[37.125mm] sticker-container">
            {/* Dashed cutting lines */}
            {index % 2 !== 1 && index < 14 && (
              <div className="dashed-line vertical absolute right-0 top-0 bottom-0"></div>
            )}
            {index < 14 && (
              <div className="dashed-line horizontal absolute left-0 right-0 bottom-0"></div>
            )}
            
            <div className="h-full p-1">
              <Sticker verse={verse} language={language} gradient={gradient} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StickerSheet;
