import React from 'react';
import { StickerProps } from '../utils/imageGenerator';

const Sticker: React.FC<StickerProps> = ({ verse, language, gradient }) => {
  const renderVerseText = () => {
    if (language === 'english') {
      return <p className="text-center font-comic text-sm sm:text-base">{verse.text.english}</p>;
    } else if (language === 'korean') {
      return <p className="text-center font-comic text-sm sm:text-base">{verse.text.korean}</p>;
    } else {
      // Bilingual
      return (
        <>
          <p className="text-center font-comic text-xs sm:text-sm mb-1">{verse.text.english}</p>
          <p className="text-center font-comic text-xs sm:text-sm">{verse.text.korean}</p>
        </>
      );
    }
  };

  // Get the primary topic (first in the array)
  const primaryTopic = verse.topics[0] || '';

  return (
    <div 
      className="sticker" 
      style={{ background: gradient }}
    >
      <div className="sticker-topic font-comic">{primaryTopic}</div>
      <div className="mt-5 mb-1 font-comic font-bold text-sm sm:text-base">{verse.reference}</div>
      {renderVerseText()}
    </div>
  );
};

export default Sticker;
