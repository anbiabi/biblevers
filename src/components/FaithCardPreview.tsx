import React, { useEffect, useState } from 'react';
import FaithCard from './FaithCard';
import { BibleVerse } from '@/data/bibleVerses';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface FaithCardPreviewProps {
  verse: BibleVerse | null;
  language: string;
  useMagicalGarden?: boolean;
}

const FaithCardPreview: React.FC<FaithCardPreviewProps> = ({ 
  verse, 
  language, 
  useMagicalGarden = false 
}) => {
  const [key, setKey] = useState(0);
  
  useEffect(() => {
    // Change key when verse changes to force re-render
    setKey(prev => prev + 1);
  }, [verse, useMagicalGarden]);
  
  if (!verse) {
    return (
      <div className="w-full aspect-[3/4] rounded-lg border border-dashed border-green-300 flex items-center justify-center bg-green-50">
        <p className="text-green-500 font-comic">Select topics and language to see a preview</p>
      </div>
    );
  }
  
  return (
    <div className="relative max-w-sm mx-auto">
      <div className="w-full rounded-lg overflow-hidden shadow-lg">
        <FaithCard 
          key={key} 
          verse={verse} 
          language={language} 
          useMagicalGarden={useMagicalGarden}
        />
      </div>
      
    </div>
  );
};

export default FaithCardPreview;