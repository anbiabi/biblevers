
import React from 'react';
import { BibleVerse } from '../data/bibleVerses';

export interface StickerProps {
  verse: BibleVerse;
  language: string;
  gradient: string;
}

const Sticker: React.FC<StickerProps> = ({ verse, language, gradient }) => {
  const renderVerseText = () => {
    if (language === 'english') {
      return <p className="text-center font-comic text-sm sm:text-base line-clamp-4">{verse.text.english}</p>;
    } else if (language === 'korean') {
      return <p className="text-center font-comic text-sm sm:text-base line-clamp-4">{verse.text.korean || verse.text.english}</p>;
    } else if (language === 'bilingual') {
      return (
        <>
          <p className="text-center font-comic text-xs sm:text-sm mb-1 line-clamp-2">{verse.text.english}</p>
          <p className="text-center font-comic text-xs sm:text-sm line-clamp-2">{verse.text.korean || ''}</p>
        </>
      );
    } else {
      // For other languages, just show English for now
      return <p className="text-center font-comic text-sm sm:text-base line-clamp-4">{verse.text.english}</p>;
    }
  };

  // Calculate text size class based on verse length
  const getTextSizeClass = () => {
    const text = language === 'english' ? verse.text.english 
              : language === 'korean' ? (verse.text.korean || verse.text.english)
              : verse.text.english;
    
    if (text.length > 150) return 'text-xs';
    if (text.length > 100) return 'text-sm';
    return 'text-base';
  };

  // Format reference based on language
  const formatReference = () => {
    if (language === 'korean') {
      // For Korean, we need to format the reference in Korean style
      // This is a simple implementation - in a real app you'd want proper translations
      return verse.reference;
    }
    return verse.reference;
  };

  return (
    <div 
      className="sticker w-full h-full rounded-lg flex flex-col justify-center items-center p-2" 
      style={{ background: gradient }}
    >
      {/* Verse text first */}
      <div className={`font-comic ${getTextSizeClass()} text-center mb-2 flex-1 flex items-center`}>
        {renderVerseText()}
      </div>
      
      {/* Reference at the bottom */}
      <div className="font-comic font-bold text-sm mt-auto">
        {formatReference()}
      </div>
    </div>
  );
};

export default Sticker;
