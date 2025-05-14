
import React from 'react';
import { BibleVerse } from '@/data/bibleVerses';
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
  
  // Generate a contextual message based on verse content and card title/theme
  const getApplicationMessage = () => {
    const primaryTopic = verse.topics[0]?.toLowerCase() || '';
    
    // Faith declarations
    if (title?.toLowerCase().includes('faith') || theme?.toLowerCase().includes('faith') || primaryTopic === 'faith') {
      if (verse.reference.includes('Hebrews')) {
        return "I declare today that my faith is the substance of things hoped for and the evidence of things not seen. My faith moves mountains and pleases God.";
      } else if (verse.text.english.toLowerCase().includes('believe')) {
        return "I stand firmly on this promise, declaring my unwavering faith in God's Word. Though circumstances may change, His faithfulness remains constant.";
      } else {
        return "I choose to walk by faith, not by sight. My faith is anchored in God's unchanging character, not in changing circumstances. His Word is my foundation.";
      }
    }
    
    // Words of comfort/grief
    else if (title?.toLowerCase().includes('comfort') || primaryTopic === 'comfort' || verse.topics.includes('comfort')) {
      if (verse.text.english.toLowerCase().includes('peace')) {
        return "In times of grief and loss, I receive God's peace that surpasses understanding. His comfort wraps around me like a blanket, bringing healing to my wounded heart.";
      } else if (verse.text.english.toLowerCase().includes('trouble') || verse.text.english.toLowerCase().includes('suffer')) {
        return "Even in my darkest moments, I am never alone. God's presence brings comfort and strength when I feel overwhelmed. His compassion never fails.";
      } else {
        return "The God of all comfort draws near to the brokenhearted. He collects every tear and turns mourning into dancing. His loving presence sustains me through every trial.";
      }
    }
    
    // Identity declarations
    else if (title?.toLowerCase().includes('identity') || primaryTopic === 'identity') {
      if (verse.text.english.toLowerCase().includes('chosen') || verse.text.english.toLowerCase().includes('elect')) {
        return "I am chosen by God, set apart for His purposes. My identity is secure as His beloved child. I am fearfully and wonderfully made, fully known and deeply loved.";
      } else if (verse.text.english.toLowerCase().includes('love')) {
        return "I am completely loved and fully accepted in Christ. Nothing can separate me from His love. I am His treasured possession, the apple of His eye.";
      } else {
        return "I am not defined by my past, my performance, or others' opinions. I am who God says I am—His masterpiece, created for good works that He prepared in advance.";
      }
    }
    
    // Thanksgiving responses
    else if (title?.toLowerCase().includes('thanksgiving') || title?.toLowerCase().includes('gratitude')) {
      return "Thank you, Lord, for Your faithfulness in every season. Your goodness and mercy follow me all the days of my life. My heart overflows with gratitude for Your countless blessings.";
    }
    
    // Encouragement
    else if (title?.toLowerCase().includes('encouragement') || title?.toLowerCase().includes('hope') || primaryTopic === 'hope') {
      if (verse.text.english.toLowerCase().includes('strength') || verse.text.english.toLowerCase().includes('strong')) {
        return "Take courage! The same power that raised Christ from the dead lives in you. You have divine strength for every challenge and grace for each new day.";
      } else if (verse.text.english.toLowerCase().includes('fear')) {
        return "Fear has no hold over you. Stand tall in confidence, knowing that God's perfect love casts out all fear. You are empowered to walk in boldness.";
      } else {
        return "Hold fast to hope, for God is faithful to fulfill every promise. Your perseverance is developing character that will shine brightly in this dark world.";
      }
    }
    
    // Default inspirational message based on common verse themes
    else {
      if (verse.text.english.toLowerCase().includes('love')) {
        return "God's love is not based on your performance but on His character. Rest in this unchanging truth: you are perfectly loved, completely forgiven, and eternally accepted.";
      } else if (verse.text.english.toLowerCase().includes('peace')) {
        return "God's peace guards your heart and mind in Christ Jesus. Exchange your anxiety for His tranquility as you fix your thoughts on what is true, noble, and praiseworthy.";
      } else if (verse.text.english.toLowerCase().includes('joy') || verse.text.english.toLowerCase().includes('rejoice')) {
        return "The joy of the Lord is your strength! This joy doesn't depend on circumstances but flows from the unshakable hope you have in Christ Jesus.";
      } else {
        return "Let this truth take root deep in your heart and transform your perspective. As you meditate on God's Word, you are being renewed and strengthened for His purposes.";
      }
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
              {getApplicationMessage()}
            </div>
          </div>
        </div>
      </AspectRatio>
    </div>
  );
};

export default FaithCard;
