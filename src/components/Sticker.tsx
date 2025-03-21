import React from 'react';
import { StickerProps } from '../utils/imageGenerator';

const Sticker: React.FC<StickerProps> = ({ verse, language, gradient }) => {
  const renderVerseText = () => {
    if (language === 'english') {
      return <p className="text-center font-comic text-sm sm:text-base">{verse.text.english}</p>;
    } else if (language === 'korean') {
      return <p className="text-center font-comic text-sm sm:text-base">{verse.text.korean}</p>;
    } else {
      // Other language options
      return (
        <>
          <p className="text-center font-comic text-xs sm:text-sm mb-1">{verse.text.english}</p>
          <p className="text-center font-comic text-xs sm:text-sm">{verse.text.korean}</p>
        </>
      );
    }
  };

  return (
    <div 
      className="sticker w-full rounded-lg" 
      style={{ background: gradient }}
    >
      <div className="mt-5 mb-1 font-comic font-bold text-sm sm:text-base">{verse.reference}</div>
      {renderVerseText()}
    </div>
  );
};

export default Sticker;
