
import React, { useEffect, useState } from 'react';
import Sticker from './Sticker';
import { BibleVerse } from '../data/bibleVerses';
import { getRandomGradient } from '../utils/imageGenerator';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface PreviewProps {
  verse: BibleVerse | null;
  language: 'english' | 'korean' | 'bilingual';
}

const StickerPreview: React.FC<PreviewProps> = ({ verse, language }) => {
  const [gradient, setGradient] = useState<string>(getRandomGradient());
  
  useEffect(() => {
    // Change gradient when verse changes
    setGradient(getRandomGradient());
  }, [verse]);
  
  if (!verse) {
    return (
      <div className="w-full aspect-[2/1] rounded-lg border border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select topics and language to see a preview</p>
      </div>
    );
  }
  
  return (
    <div className="relative">
      <div className="w-full aspect-[2/1] rounded-lg overflow-hidden shadow-lg">
        <Sticker verse={verse} language={language} gradient={gradient} />
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-2 right-2 bg-white bg-opacity-70 shadow-sm"
        onClick={() => setGradient(getRandomGradient())}
      >
        <RefreshCw size={16} />
      </Button>
    </div>
  );
};

export default StickerPreview;
