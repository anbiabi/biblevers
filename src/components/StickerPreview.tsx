
import React, { useEffect, useState } from 'react';
import Sticker from './Sticker';
import { BibleVerse } from '../data/bibleVerses';
import { getRandomGradient } from '../utils/imageGenerator';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface PreviewProps {
  verse: BibleVerse | null;
  language: string;
}

// Custom safari gradients
const getSafariGradient = () => {
  const safariGradients = [
    'linear-gradient(135deg, #F97316 0%, #FBBF24 100%)',
    'linear-gradient(135deg, #D97706 0%, #F97316 100%)',
    'linear-gradient(135deg, #EA580C 0%, #F59E0B 100%)',
    'linear-gradient(135deg, #C2410C 0%, #D97706 100%)',
    'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
  ];
  
  return safariGradients[Math.floor(Math.random() * safariGradients.length)];
};

const StickerPreview: React.FC<PreviewProps> = ({ verse, language }) => {
  const [gradient, setGradient] = useState<string>(getSafariGradient());
  
  useEffect(() => {
    // Change gradient when verse changes
    setGradient(getSafariGradient());
  }, [verse]);
  
  if (!verse) {
    return (
      <div className="w-full aspect-[2/1] rounded-lg border border-dashed border-amber-300 flex items-center justify-center bg-amber-50">
        <p className="text-amber-500 font-comic">Select topics and language to see a preview</p>
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
        className="absolute top-2 right-2 bg-white bg-opacity-70 shadow-sm hover:bg-amber-100"
        onClick={() => setGradient(getSafariGradient())}
      >
        <RefreshCw size={16} className="text-amber-600" />
      </Button>
    </div>
  );
};

export default StickerPreview;
