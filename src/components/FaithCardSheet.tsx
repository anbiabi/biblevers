import React, { useRef } from 'react';
import FaithCard from './FaithCard';
import { BibleVerse } from '@/data/bibleVerses';

interface FaithCardSheetProps {
  verses: BibleVerse[];
  language: string;
  selectedTopics?: string[];
  useMagicalGarden?: boolean;
}

const FaithCardSheet: React.FC<FaithCardSheetProps> = ({ 
  verses, 
  language,
  selectedTopics = [],
  useMagicalGarden = false
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  
  // Generate titles based on selected topics
  const generateCardTitles = () => {
    // If we have exactly 4 selected topics, use them directly
    if (selectedTopics.length === 4) {
      // Capitalize first letter of each topic
      return selectedTopics.map(topic => 
        topic.charAt(0).toUpperCase() + topic.slice(1)
      );
    }
    
    // Create an array to hold our specific title categories
    const faithDeclarations = ["Faith Declaration", "Standing on Truth", "I Believe"];
    const comfortMessages = ["Words of Comfort", "Divine Comfort", "Peace in Trials"];
    const identityStatements = ["Identity in Christ", "Who I Am", "Child of God"];
    const encouragementWords = ["Hope & Encouragement", "Promise Keeper", "Be Strong"];
    const thanksgivingResponses = ["Gratitude", "Thanksgiving", "Praise Response"];
    
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
            topicBasedTitles.push(...faithDeclarations);
            break;
          case 'hope':
            topicBasedTitles.push("Hope Renewed", "Future Hope", ...encouragementWords);
            break;
          case 'comfort':
            topicBasedTitles.push(...comfortMessages);
            break;
          case 'strength':
            topicBasedTitles.push("God's Strength", "Standing Strong", ...encouragementWords);
            break;
          case 'identity':
            topicBasedTitles.push(...identityStatements);
            break;
          case 'thanksgiving':
            topicBasedTitles.push(...thanksgivingResponses);
            break;
          default:
            // Capitalize first letter of the topic
            topicBasedTitles.push(topic.charAt(0).toUpperCase() + topic.slice(1));
        }
      });
      
      // If we have four titles that match our four cards, return them
      if (topicBasedTitles.length >= 4) {
        // Shuffle the array to get random selections from our topic-based titles
        return [...topicBasedTitles].sort(() => 0.5 - Math.random()).slice(0, 4);
      }
      
      // If we don't have enough, add some default ones to fill out the array
      while (topicBasedTitles.length < 4) {
        // Add general titles that work with any verse
        const generalTitles = [
          "Faith Declaration", 
          "God's Promise",
          "Words of Life",
          "Divine Truth"
        ];
        
        // Add a random general title that's not already in our list
        const randomTitle = generalTitles[Math.floor(Math.random() * generalTitles.length)];
        if (!topicBasedTitles.includes(randomTitle)) {
          topicBasedTitles.push(randomTitle);
        }
      }
      
      return topicBasedTitles.slice(0, 4);
    }
    
    // Default titles if no specific topics selected
    const defaultTitles = [
      "Faith Declaration", 
      "Words of Comfort", 
      "Identity in Christ",
      "God's Promise"
    ];
    
    return defaultTitles;
  };
  
  // Match verses to topics when possible
  const matchVersesToTopics = () => {
    if (selectedTopics.length !== 4 || verses.length < 4) {
      return verses.slice(0, 4);
    }
    
    const result: BibleVerse[] = [];
    const unusedVerses = [...verses];
    
    // For each topic, find a matching verse
    selectedTopics.forEach(topic => {
      // Find a verse that has this topic
      const matchIndex = unusedVerses.findIndex(verse => 
        verse.topics.some(t => t.toLowerCase() === topic.toLowerCase())
      );
      
      if (matchIndex >= 0) {
        // Add this verse to the result and remove from unused
        result.push(unusedVerses[matchIndex]);
        unusedVerses.splice(matchIndex, 1);
      } else if (unusedVerses.length > 0) {
        // If no match found, just take the next verse
        result.push(unusedVerses[0]);
        unusedVerses.splice(0, 1);
      }
    });
    
    // If we don't have 4 verses yet, add any remaining
    while (result.length < 4 && unusedVerses.length > 0) {
      result.push(unusedVerses[0]);
      unusedVerses.splice(0, 1);
    }
    
    return result;
  };
  
  const cardTitles = generateCardTitles();
  const orderedVerses = matchVersesToTopics();

  return (
    <div 
      ref={sheetRef} 
      className="faith-card-sheet relative w-[210mm] h-[297mm] mx-auto bg-white print:border-0 print:shadow-none"
      style={{ 
        pageBreakAfter: 'always',
        boxSizing: 'border-box',
        padding: '5mm',
        position: 'relative'
      }}
    >
      {/* Cutting guidelines */}
      <div className="absolute inset-0 pointer-events-none print:block hidden">
        {/* Vertical center cutting line */}
        <div 
          className="absolute top-0 bottom-0 border-l border-dashed border-gray-300"
          style={{ 
            left: '50%', 
            transform: 'translateX(-50%)',
            borderWidth: '0.25pt'
          }}
        />
        
        {/* Horizontal center cutting line */}
        <div 
          className="absolute left-0 right-0 border-t border-dashed border-gray-300"
          style={{ 
            top: '50%', 
            transform: 'translateY(-50%)',
            borderWidth: '0.25pt'
          }}
        />
      </div>
      
      {/* Card grid */}
      <div 
        className="grid grid-cols-2 grid-rows-2 h-full w-full gap-1"
        style={{
          padding: '2mm',
          height: 'calc(297mm - 10mm)',
          width: 'calc(210mm - 10mm)'
        }}
      >
        {orderedVerses.slice(0, 4).map((verse, index) => (
          <div 
            key={`${verse.reference}-${index}`} 
            className="faith-card-container relative"
            style={{
              width: 'calc((210mm - 12mm) / 2)',
              height: 'calc((297mm - 12mm) / 2)',
              padding: '1mm',
              boxSizing: 'border-box'
            }}
          >
            <div 
              className="w-full h-full"
              style={{
                border: '0.25pt solid #f3f4f6',
                borderRadius: '1mm',
                overflow: 'hidden'
              }}
            >
              <FaithCard 
                verse={verse} 
                language={language} 
                title={cardTitles[index]} 
                useMagicalGarden={useMagicalGarden}
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Print instructions (hidden on screen, visible in print) */}
      <div className="hidden print:block absolute bottom-1 right-1 text-xs text-gray-500">
        Cut along dashed lines • 3mm bleed included
      </div>
    </div>
  );
};

export default FaithCardSheet;