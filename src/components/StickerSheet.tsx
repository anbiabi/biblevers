
import React, { useRef } from 'react';
import Sticker from './Sticker';
import { BibleVerse } from '../data/bibleVerses';
import { getRandomGradient } from '../utils/imageGenerator';

interface StickerSheetProps {
  verses: BibleVerse[];
  language: string;
  randomGradients?: boolean;
  selectedTopics?: string[];
}

const StickerSheet: React.FC<StickerSheetProps> = ({ 
  verses, 
  language, 
  randomGradients = true,
  selectedTopics = []
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  
  // Generate fixed gradients if we're not using random ones
  const fixedGradients = Array(16).fill(null).map(() => getRandomGradient());

  // Get all unique topics from the verses
  const sheetTopics = [...new Set(verses.flatMap(verse => verse.topics))];
  
  // Choose main topic prioritizing the selected topics
  let mainTopic = '';
  
  // If there are selected topics, try to find a match with the sheet topics
  if (selectedTopics.length > 0 && sheetTopics.length > 0) {
    // Find the first selected topic that exists in sheet topics
    const matchingTopic = selectedTopics.find(topic => 
      sheetTopics.includes(topic)
    );
    
    if (matchingTopic) {
      mainTopic = matchingTopic;
    } else {
      // If no match found, fall back to the first sheet topic
      mainTopic = sheetTopics[0] || '';
    }
  } else {
    // If no selected topics, use the first sheet topic
    mainTopic = sheetTopics[0] || '';
  }

  return (
    <div 
      ref={sheetRef} 
      className="sticker-sheet grid grid-cols-2 gap-0 relative w-[210mm] h-[297mm] p-0 m-0 mx-auto bg-white print:border-0 print:shadow-none"
      style={{ 
        pageBreakAfter: 'always',
        boxSizing: 'border-box',
        padding: 0,
        margin: '0 auto',
        left: 0,
        right: 0
      }}
    >
      {/* Semi-transparent topic overlay at the top of sheet */}
      {mainTopic && (
        <div className="absolute top-2 left-0 right-0 z-10 text-center pointer-events-none print:hidden">
          <span className="sticker-topic opacity-50 text-sm">{mainTopic}</span>
        </div>
      )}
      
      {/* Grid of stickers */}
      {verses.map((verse, index) => {
        const gradient = randomGradients 
          ? getRandomGradient() 
          : fixedGradients[index % fixedGradients.length];
        
        return (
          <div key={`${verse.reference}-${index}`} className="relative h-[37.125mm] sticker-container overflow-hidden print:overflow-visible">
            {/* Dashed cutting lines */}
            {index % 2 !== 1 && index < 14 && (
              <div className="dashed-line vertical absolute right-0 top-0 bottom-0 print:hidden"></div>
            )}
            {index < 14 && (
              <div className="dashed-line horizontal absolute left-0 right-0 bottom-0 print:hidden"></div>
            )}
            
            <div className="h-full p-1 print:overflow-visible print:p-0.5">
              <Sticker verse={verse} language={language} gradient={gradient} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StickerSheet;
