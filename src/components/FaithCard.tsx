import React from 'react';
import { BibleVerse } from '@/data/bibleVerses';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getRandomVibrantGradient } from "@/lib/utils";

interface FaithCardProps {
  verse: BibleVerse;
  language: string;
  theme?: string;
  title?: string;
}

// Array of moody, blurry backgrounds
const moodyBackgrounds = [
  "linear-gradient(to right, rgba(66, 66, 74, 0.8), rgba(25, 22, 84, 0.7)), url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3CfeColorMatrix type=\"saturate\" values=\"0\"/%3E%3C/filter%3E%3Crect width=\"100\" height=\"100\" filter=\"url(%23noise)\" opacity=\"0.4\"/%3E%3C/svg%3E')",
  "linear-gradient(to bottom, rgba(76, 76, 109, 0.8), rgba(28, 28, 45, 0.7)), url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.7\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3CfeColorMatrix type=\"saturate\" values=\"0\"/%3E%3C/filter%3E%3Crect width=\"100\" height=\"100\" filter=\"url(%23noise)\" opacity=\"0.3\"/%3E%3C/svg%3E')",
  "linear-gradient(to right, rgba(87, 83, 124, 0.8), rgba(42, 39, 80, 0.7)), url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.75\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3CfeColorMatrix type=\"saturate\" values=\"0\"/%3E%3C/filter%3E%3Crect width=\"100\" height=\"100\" filter=\"url(%23noise)\" opacity=\"0.35\"/%3E%3C/svg%3E')",
  "linear-gradient(135deg, rgba(44, 44, 84, 0.85), rgba(19, 19, 47, 0.75)), url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3CfeColorMatrix type=\"saturate\" values=\"0\"/%3E%3C/filter%3E%3Crect width=\"100\" height=\"100\" filter=\"url(%23noise)\" opacity=\"0.25\"/%3E%3C/svg%3E')",
  "linear-gradient(to right, rgba(55, 65, 81, 0.85), rgba(17, 24, 39, 0.75)), url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.7\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3CfeColorMatrix type=\"saturate\" values=\"0\"/%3E%3C/filter%3E%3Crect width=\"100\" height=\"100\" filter=\"url(%23noise)\" opacity=\"0.3\"/%3E%3C/svg%3E')"
];

// Function to get a random moody background
const getRandomMoodyBackground = () => {
  return moodyBackgrounds[Math.floor(Math.random() * moodyBackgrounds.length)];
};

const FaithCard: React.FC<FaithCardProps> = ({ 
  verse, 
  language,
  theme = "Faith",
  title
}) => {
  // Generate a moody background (for cards) or vibrant gradient (for stickers)
  const gradient = getRandomVibrantGradient();
  const moodyBackground = getRandomMoodyBackground();
  
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
    const verseText = verse.text.english.toLowerCase();
    const cardTitle = title?.toLowerCase() || '';
    
    // Faith declarations
    if (cardTitle.includes('faith') || cardTitle.includes('declaration') || cardTitle.includes('believe') || primaryTopic === 'faith') {
      if (verse.reference.includes('Hebrews')) {
        return "I declare today that my faith is the substance of things hoped for and the evidence of things not seen. My faith moves mountains and pleases God.";
      } else if (verseText.includes('believe') || verseText.includes('faith')) {
        return "I stand firmly on this promise, declaring my unwavering faith in God's Word. Though circumstances may change, His faithfulness remains constant.";
      } else if (verseText.includes('trust')) {
        return "I choose to trust in the Lord with all my heart, not leaning on my own understanding. My faith is anchored in His perfect wisdom and unfailing love.";
      } else {
        return "I choose to walk by faith, not by sight. My faith is anchored in God's unchanging character, not in changing circumstances. His Word is my foundation.";
      }
    }
    
    // Words of comfort/grief
    else if (cardTitle.includes('comfort') || cardTitle.includes('peace') || cardTitle.includes('trials') || primaryTopic === 'comfort' || verse.topics.includes('comfort')) {
      if (verseText.includes('peace')) {
        return "In times of grief and loss, I receive God's peace that surpasses understanding. His comfort wraps around me like a blanket, bringing healing to my wounded heart.";
      } else if (verseText.includes('troubled') || verseText.includes('trouble') || verseText.includes('suffer')) {
        return "Even in my darkest moments, I am never alone. God's presence brings comfort and strength when I feel overwhelmed. His compassion never fails.";
      } else if (verseText.includes('fear')) {
        return "When fear surrounds me, I remember that God has not given me a spirit of fear, but of power, love and a sound mind. His perfect love casts out all fear.";
      } else {
        return "The God of all comfort draws near to the brokenhearted. He collects every tear and turns mourning into dancing. His loving presence sustains me through every trial.";
      }
    }
    
    // Identity declarations
    else if (cardTitle.includes('identity') || cardTitle.includes('who i am') || cardTitle.includes('child of god') || primaryTopic === 'identity') {
      if (verseText.includes('chosen') || verseText.includes('elect')) {
        return "I am chosen by God, set apart for His purposes. My identity is secure as His beloved child. I am fearfully and wonderfully made, fully known and deeply loved.";
      } else if (verseText.includes('love')) {
        return "I am completely loved and fully accepted in Christ. Nothing can separate me from His love. I am His treasured possession, the apple of His eye.";
      } else if (verseText.includes('created') || verseText.includes('made')) {
        return "I am God's masterpiece, created in Christ Jesus for good works that He prepared in advance. My worth comes from Him, not from what I do or accomplish.";
      } else {
        return "I am not defined by my past, my performance, or others' opinions. I am who God says I am—His masterpiece, created for good works that He prepared in advance.";
      }
    }
    
    // Hope & Encouragement
    else if (cardTitle.includes('hope') || cardTitle.includes('encourage') || cardTitle.includes('strong') || cardTitle.includes('promise') || primaryTopic === 'hope') {
      if (verseText.includes('strength') || verseText.includes('strong')) {
        return "Take courage! The same power that raised Christ from the dead lives in you. You have divine strength for every challenge and grace for each new day.";
      } else if (verseText.includes('fear')) {
        return "Fear has no hold over you. Stand tall in confidence, knowing that God's perfect love casts out all fear. You are empowered to walk in boldness.";
      } else if (verseText.includes('hope')) {
        return "Your hope in God will never put you to shame. Hold fast to this confident expectation, for the One who promised is faithful. Your future is secure in His hands.";
      } else {
        return "Hold fast to hope, for God is faithful to fulfill every promise. Your perseverance is developing character that will shine brightly in this dark world.";
      }
    }
    
    // Thanksgiving responses
    else if (cardTitle.includes('thanksgiving') || cardTitle.includes('gratitude') || cardTitle.includes('praise')) {
      if (verseText.includes('thank')) {
        return "Thank you, Lord, for Your faithfulness in every season. Your goodness and mercy follow me all the days of my life. My heart overflows with gratitude for Your countless blessings.";
      } else if (verseText.includes('praise')) {
        return "I lift my voice in praise to You, my God and King! You are worthy of all glory, honor and praise. My soul magnifies You for Your wondrous deeds and steadfast love.";
      } else if (verseText.includes('joy') || verseText.includes('rejoice')) {
        return "The joy of the Lord is my strength! I choose to rejoice in You always, knowing that in Your presence is fullness of joy. Thank You for being my song in the night.";
      } else {
        return "I give thanks with a grateful heart for all You are and all You've done. Your loving kindness is better than life itself. My heart is filled with praise for Your faithfulness.";
      }
    }
    
    // Love themes
    else if (cardTitle.includes('love') || primaryTopic === 'love' || verseText.includes('love')) {
      return "God's love is not based on my performance but on His character. I rest in this unchanging truth: I am perfectly loved, completely forgiven, and eternally accepted.";
    }
    
    // Peace themes
    else if (cardTitle.includes('peace') || primaryTopic === 'peace' || verseText.includes('peace')) {
      return "God's peace guards my heart and mind in Christ Jesus. I exchange my anxiety for His tranquility as I fix my thoughts on what is true, noble, and praiseworthy.";
    } 
    
    // Joy themes
    else if (cardTitle.includes('joy') || primaryTopic === 'joy' || verseText.includes('joy') || verseText.includes('rejoice')) {
      return "The joy of the Lord is my strength! This joy doesn't depend on circumstances but flows from the unshakable hope I have in Christ Jesus. I choose joy today!";
    }
    
    // Default for any other verses
    else {
      // Generate based on verse keywords
      if (verseText.includes('pray') || verseText.includes('prayer')) {
        return "As I approach God's throne with confidence, I know He hears my prayers. I can cast all my cares on Him because He cares for me. My prayers are powerful and effective.";
      } else if (verseText.includes('word') || verseText.includes('scripture')) {
        return "God's Word is living and active in my life. As I meditate on Scripture day and night, I am transformed by the renewing of my mind. His truth guides my every step.";
      } else if (verseText.includes('heart')) {
        return "I guard my heart above all else, for it determines the course of my life. God is creating in me a clean heart and renewing a right spirit within me.";
      } else {
        return "Let this truth take root deep in my heart and transform my perspective. As I meditate on God's Word, I am being renewed and strengthened for His purposes.";
      }
    }
  };
  
  // Card title based on theme or topics
  const cardTitle = title || theme || verse.topics[0] || "Faith Declaration";
  
  return (
    <div className="faith-card w-full h-full flex flex-col overflow-hidden">
      <AspectRatio ratio={3/4} className="w-full h-full">
        <div 
          className="w-full h-full flex flex-col p-5 border border-gray-200 rounded-lg overflow-hidden"
          style={{
            background: moodyBackground,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
            backdropFilter: "blur(4px)"
          }}
        >
          {/* Top section with title */}
          <div className="uppercase font-bold tracking-wider text-center py-2 mb-3 bg-white bg-opacity-70 backdrop-blur-sm rounded-md text-gray-800">
            {cardTitle}
          </div>
          
          {/* Verse section in vertical split mode */}
          <div className="flex flex-col flex-grow">
            <div className="flex-1 flex flex-col justify-center items-center mb-4">
              {/* Verse text in italics with improved readability background */}
              <div className="text-center font-comic italic text-white mb-2 bg-black bg-opacity-30 p-3 rounded-lg backdrop-blur-sm">
                "{renderVerseText()}"
              </div>
              
              {/* Reference below verse */}
              <div className="text-center text-sm mt-1 mb-4 text-white font-medium">
                {formatReference()}
              </div>
            </div>
            
            {/* Application in bold with improved readability background */}
            <div className="mt-auto text-center font-comic font-bold text-gray-800 bg-white bg-opacity-70 backdrop-blur-sm p-4 rounded-md">
              {getApplicationMessage()}
            </div>
          </div>
        </div>
      </AspectRatio>
    </div>
  );
};

export default FaithCard;
