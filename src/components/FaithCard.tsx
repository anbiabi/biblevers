
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
  // Generate a vibrant, joyful gradient background
  const getVibrantGradient = () => {
    const joyfulGradients = [
      "linear-gradient(to bottom right, #ffcf87, #ff8ba7)",
      "linear-gradient(to bottom right, #fbd07c, #f7f779, #b0f4e6)",
      "linear-gradient(to bottom right, #adffd6, #84ffc9, #c4e0ff)",
      "linear-gradient(to bottom right, #ffccc9, #ffb0cd, #d8bbff)",
      "linear-gradient(to bottom right, #a8ff78, #78ffd6)",
      "linear-gradient(to bottom right, #f0ffe9, #c9f5d9, #fcffbf)",
      "linear-gradient(to bottom right, #fee17c, #ffcbb6, #ffd6de)",
      "linear-gradient(to bottom right, #eaefb1, #e0f9b5, #abede8)",
      "linear-gradient(to bottom right, #fdfcfb, #e2d1c3)",
      "linear-gradient(to bottom right, #fdcbf1, #e6dee9)",
    ];
    return joyfulGradients[Math.floor(Math.random() * joyfulGradients.length)];
  };
  
  const gradient = getVibrantGradient();
  
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
      return "Find comfort in God's unfailing presence during difficult times. His peace will carry you through every storm and situation.";
    } else if (verse.topics.includes('hope')) {
      return "Hold onto this promise of hope, even when circumstances seem impossible. God is faithful to fulfill His word in your life.";
    } else if (verse.topics.includes('love')) {
      return "Remember that you are deeply loved by God, no matter what you face. His love is unchanging, unfailing, and always pursuing you.";
    } else if (verse.topics.includes('faith')) {
      return "Stand firm in faith, knowing God is faithful to His promises. Your faith is not in vain - He will surely bring His word to pass.";
    } else if (verse.topics.includes('courage')) {
      return "Take courage from these words when facing life's challenges. God has not given you a spirit of fear, but of power, love and sound mind.";
    } else {
      return "Meditate on this truth and allow it to transform your perspective. Let God's Word renew your mind and strengthen your spirit daily.";
    }
  };
  
  // Card title based on theme or topics
  const cardTitle = title || theme || verse.topics[0] || "Faith Declaration";
  
  return (
    <div className="faith-card w-full h-full flex flex-col overflow-hidden">
      <AspectRatio ratio={3/4} className="w-full h-full">
        <div 
          className="w-full h-full flex flex-col p-5 border border-green-200 rounded-lg overflow-hidden"
          style={{
            background: gradient,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
          }}
        >
          {/* Top section with title */}
          <div className="uppercase font-bold tracking-wider text-center py-2 mb-3 bg-white bg-opacity-40 backdrop-blur-sm rounded-md">
            {cardTitle}
          </div>
          
          {/* Verse section in vertical split mode */}
          <div className="flex flex-col flex-grow">
            <div className="flex-1 flex flex-col justify-center items-center mb-4">
              {/* Verse text in italics (less emphasized) */}
              <div className="text-center font-comic italic text-gray-700 mb-2">
                "{renderVerseText()}"
              </div>
              
              {/* Reference below verse */}
              <div className="text-center text-sm mt-1 mb-4">
                {formatReference()}
              </div>
            </div>
            
            {/* Application in bold (emphasized) */}
            <div className="mt-auto text-center font-comic font-bold text-gray-800 bg-white bg-opacity-60 backdrop-blur-sm p-4 rounded-md">
              {getApplication()}
            </div>
          </div>
        </div>
      </AspectRatio>
    </div>
  );
};

export default FaithCard;
