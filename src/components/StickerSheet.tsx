
import React, { useRef } from 'react';
import Sticker from './Sticker';
import { BibleVerse } from '../data/bibleVerses';
import { getRandomGradient } from '../utils/pdfGenerator';

interface StickerSheetProps {
  verses: BibleVerse[];
  language: 'english' | 'korean' | 'bilingual';
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
      className="sticker-sheet bg-white border border-gray-200 mx-auto grid grid-cols-2 gap-x-3 gap-y-2 p-3"
    >
      {verses.map((verse, index) => {
        const gradient = randomGradients 
          ? getRandomGradient() 
          : fixedGradients[index % fixedGradients.length];
        
        return (
          <React.Fragment key={`${verse.reference}-${index}`}>
            <Sticker verse={verse} language={language} gradient={gradient} />
            
            {/* Add dashed cutting lines */}
            {index % 2 === 0 && index < verses.length - 2 && (
              <div 
                className="dashed-line vertical" 
                style={{ left: '50%', top: `${(Math.floor(index / 2) + 1) * (100 / 8)}%` }}
              />
            )}
            
            {index < verses.length - 2 && (
              <div 
                className="dashed-line horizontal" 
                style={{ top: `${(Math.floor(index / 2) + 1) * (100 / 8)}%` }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StickerSheet;
