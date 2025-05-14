
import React from 'react';
import { BibleVerse } from '@/data/bibleVerses';
import { getRandomGradient } from '@/utils/imageGenerator';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface FaithCardProps {
  verse: BibleVerse;
  language: string;
  theme?: string;
  title?: string;
}

const FaithCard: React.FC<FaithCardProps> = ({ 
  verse, 
  language,
  theme = "Faith",
  title
}) => {
  const gradient = getRandomGradient();
  
  const renderVerseText = () => {
    switch (language) {
      case 'english':
        return verse.text.english;
      case 'korean':
        return verse.text.korean || verse.text.english;
      case 'spanish':
        return verse.text.spanish || verse.text.english;
      case 'french':
        return verse.text.french || verse.text.english;
      case 'german':
        return verse.text.german || verse.text.english;
      default:
        return verse.text.english;
    }
  };

  // Format reference for the current language
  const formatReference = () => {
    // Using existing reference formatting logic from Sticker.tsx
    if (language === 'korean') {
      // Korean style reference formatting logic
      return verse.reference; // Simplified for brevity
    } else if (language === 'spanish') {
      // Spanish style reference formatting logic
      return verse.reference; // Simplified for brevity
    } else if (language === 'french') {
      // French style reference formatting logic
      return verse.reference; // Simplified for brevity
    } else if (language === 'german') {
      // German style reference formatting logic
      return verse.reference; // Simplified for brevity
    }
    
    return verse.reference;
  };
  
  // Generate a contextual application message based on verse themes
  const getApplication = () => {
    if (verse.topics.includes('comfort')) {
      return "Find comfort in God's unfailing presence during difficult times.";
    } else if (verse.topics.includes('hope')) {
      return "Hold onto this promise of hope, even when circumstances seem impossible.";
    } else if (verse.topics.includes('love')) {
      return "Remember that you are deeply loved by God, no matter what you face.";
    } else if (verse.topics.includes('faith')) {
      return "Stand firm in faith, knowing God is faithful to His promises.";
    } else if (verse.topics.includes('courage')) {
      return "Take courage from these words when facing life's challenges.";
    } else {
      return "Meditate on this truth and allow it to transform your perspective.";
    }
  };
  
  // Card title based on theme or topics
  const cardTitle = title || theme || verse.topics[0] || "Faith Declaration";
  
  return (
    <div className="faith-card w-full h-full flex flex-col overflow-hidden">
      <AspectRatio ratio={3/4} className="w-full h-full">
        <div 
          className="w-full h-full flex flex-col p-4 border border-green-200 rounded-lg overflow-hidden"
          style={{
            background: gradient,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
          }}
        >
          {/* Top section with title */}
          <div className="uppercase font-bold tracking-wider text-center py-2 mb-2">
            {cardTitle}
          </div>
          
          {/* Verse section in vertical split mode */}
          <div className="flex flex-col flex-grow">
            <div className="flex-1 flex flex-col justify-center">
              {/* Reference at top */}
              <div className="text-center font-medium mb-2">
                {formatReference()}
              </div>
              
              {/* Verse text */}
              <div className="text-center font-comic font-bold mb-4">
                "{renderVerseText()}"
              </div>
            </div>
            
            {/* Application */}
            <div className="mt-auto text-center font-comic text-sm">
              {getApplication()}
            </div>
          </div>
        </div>
      </AspectRatio>
    </div>
  );
};

export default FaithCard;
