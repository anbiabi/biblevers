
import React, { useRef } from 'react';
import FaithCard from './FaithCard';
import { BibleVerse } from '@/data/bibleVerses';

interface FaithCardSheetProps {
  verses: BibleVerse[];
  language: string;
  selectedTopics?: string[];
}

const FaithCardSheet: React.FC<FaithCardSheetProps> = ({ 
  verses, 
  language,
  selectedTopics = []
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  
  // Generate titles based on selected topics or verse topics
  const generateCardTitles = () => {
    const titleOptions = [
      "Faith Declaration", 
      "Words of Comfort", 
      "Hope & Encouragement", 
      "Promise Keeper", 
      "Identity in Christ",
      "Standing on Truth",
      "God's Faithfulness"
    ];
    
    // If we have selected topics, use them to influence titles
    if (selectedTopics.length > 0) {
      const topicBasedTitles: string[] = [];
      
      // Map topics to relevant titles
      selectedTopics.forEach(topic => {
        switch(topic.toLowerCase()) {
          case 'love':
            topicBasedTitles.push("God's Love", "Beloved Child");
            break;
          case 'faith':
            topicBasedTitles.push("Faith Declaration", "Faithful Promise");
            break;
          case 'hope':
            topicBasedTitles.push("Hope Renewed", "Future Hope");
            break;
          case 'comfort':
            topicBasedTitles.push("Divine Comfort", "Peace in Trials");
            break;
          case 'strength':
            topicBasedTitles.push("God's Strength", "Standing Strong");
            break;
          default:
            topicBasedTitles.push(topic.charAt(0).toUpperCase() + topic.slice(1));
        }
      });
      
      // If we generated topic-based titles, use them, otherwise fall back to defaults
      if (topicBasedTitles.length > 0) {
        return topicBasedTitles.slice(0, 4);
      }
    }
    
    // Use default titles if no specific topics or not enough topic-based titles
    return titleOptions.slice(0, 4);
  };
  
  const cardTitles = generateCardTitles();

  return (
    <div 
      ref={sheetRef} 
      className="faith-card-sheet grid grid-cols-2 gap-4 relative w-[210mm] h-[297mm] p-8 mx-auto bg-white print:border-0 print:shadow-none"
      style={{ 
        pageBreakAfter: 'always',
        boxSizing: 'border-box'
      }}
    >
      {verses.slice(0, 4).map((verse, index) => (
        <div key={`${verse.reference}-${index}`} className="faith-card-container">
          <FaithCard 
            verse={verse} 
            language={language} 
            title={cardTitles[index % cardTitles.length]} 
          />
        </div>
      ))}
    </div>
  );
};

export default FaithCardSheet;
