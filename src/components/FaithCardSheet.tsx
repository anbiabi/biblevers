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
        padding: '3mm', // 3mm bleed area
        position: 'relative'
      }}
    >
      {/* Professional cutting guidelines */}
      <div className="absolute inset-0 pointer-events-none print:block hidden">
        {/* Outer bleed area border */}
        <div className="absolute inset-0 border border-gray-300" style={{ borderStyle: 'solid', borderWidth: '0.5pt' }} />
        
        {/* Vertical center cutting line */}
        <div 
          className="absolute top-0 bottom-0 border-l-2 border-dashed border-gray-400"
          style={{ 
            left: '50%', 
            transform: 'translateX(-50%)',
            borderStyle: 'dashed',
            borderWidth: '0 0 0 1pt'
          }}
        />
        
        {/* Horizontal center cutting line */}
        <div 
          className="absolute left-0 right-0 border-t-2 border-dashed border-gray-400"
          style={{ 
            top: '50%', 
            transform: 'translateY(-50%)',
            borderStyle: 'dashed',
            borderWidth: '1pt 0 0 0'
          }}
        />
        
        {/* Corner registration marks */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-black" style={{ margin: '1mm' }} />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-black" style={{ margin: '1mm' }} />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-black" style={{ margin: '1mm' }} />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-black" style={{ margin: '1mm' }} />
      </div>
      
      {/* Card grid with precise dimensions */}
      <div 
        className="grid grid-cols-2 grid-rows-2 h-full w-full gap-0"
        style={{
          padding: '3mm', // Inner safe area
          height: 'calc(297mm - 6mm)', // Total height minus bleed
          width: 'calc(210mm - 6mm)'   // Total width minus bleed
        }}
      >
        {orderedVerses.slice(0, 4).map((verse, index) => (
          <div 
            key={`${verse.reference}-${index}`} 
            className="faith-card-container relative"
            style={{
              // Each card is exactly 1/4 of the printable area
              width: 'calc((210mm - 12mm) / 2)', // Half width minus margins
              height: 'calc((297mm - 12mm) / 2)', // Half height minus margins
              padding: '2mm', // Internal padding for content safety
              boxSizing: 'border-box'
            }}
          >
            {/* Card content area with safe margins */}
            <div 
              className="w-full h-full"
              style={{
                border: '0.5pt solid #e5e7eb', // Light border for cutting reference
                borderRadius: '2mm',
                overflow: 'hidden'
              }}
            >
              <FaithCard 
                verse={verse} 
                language={language} 
                title={cardTitles[index]} 
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