
import React, { useEffect, useState } from 'react';
import FaithCard from './FaithCard';
import { BibleVerse } from '@/data/bibleVerses';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface FaithCardPreviewProps {
  verse: BibleVerse | null;
  language: string;
}

const FaithCardPreview: React.FC<FaithCardPreviewProps> = ({ verse, language }) => {
  const [key, setKey] = useState(0);
  
  useEffect(() => {
    // Change key when verse changes to force re-render
    setKey(prev => prev + 1);
  }, [verse]);
  
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
        <FaithCard key={key} verse={verse} language={language} />
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-2 right-2 bg-white bg-opacity-70 shadow-sm hover:bg-green-100"
        onClick={() => setKey(prev => prev + 1)}
      >
        <RefreshCw size={16} className="text-green-600" />
      </Button>
    </div>
  );
};

export default FaithCardPreview;
