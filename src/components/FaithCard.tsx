import React, { useEffect, useState } from 'react';
import { BibleVerse } from '@/data/bibleVerses';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { backgroundService } from '@/services/BackgroundService';

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
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBackground = async () => {
      setIsLoading(true);
      try {
        const bg = await backgroundService.getCardBackground(verse, { useAI: true });
        setBackgroundImage(bg);
      } catch (error) {
        console.error('Failed to load background:', error);
        setBackgroundImage(backgroundService.getFallbackBackground());
      } finally {
        setIsLoading(false);
      }
    };

    loadBackground();
  }, [verse]);

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
    if (language === 'korean') {
      // Korean style reference names
      const referenceMap: {[key: string]: string} = {
        'Genesis': '창세기',
        'Exodus': '출애굽기',
        'Leviticus': '레위기',
        'Numbers': '민수기',
        'Deuteronomy': '신명기',
        'Joshua': '여호수아',
        'Judges': '사사기',
        'Ruth': '룻기',
        'Samuel': '사무엘',
        '1 Samuel': '사무엘상',
        '2 Samuel': '사무엘하',
        'Kings': '열왕기',
        '1 Kings': '열왕기상',
        '2 Kings': '열왕기하',
        'Chronicles': '역대기',
        '1 Chronicles': '역대상',
        '2 Chronicles': '역대하',
        'Ezra': '에스라',
        'Nehemiah': '느헤미야',
        'Esther': '에스더',
        'Job': '욥기',
        'Psalm': '시편',
        'Psalms': '시편',
        'Proverbs': '잠언',
        'Ecclesiastes': '전도서',
        'Song of Solomon': '아가',
        'Isaiah': '이사야',
        'Jeremiah': '예레미야',
        'Lamentations': '예레미야애가',
        'Ezekiel': '에스겔',
        'Daniel': '다니엘',
        'Hosea': '호세아',
        'Joel': '요엘',
        'Amos': '아모스',
        'Obadiah': '오바댜',
        'Jonah': '요나',
        'Micah': '미가',
        'Nahum': '나훔',
        'Habakkuk': '하박국',
        'Zephaniah': '스바냐',
        'Haggai': '학개',
        'Zechariah': '스가랴',
        'Malachi': '말라기',
        'Matthew': '마태복음',
        'Mark': '마가복음',
        'Luke': '누가복음',
        'John': '요한복음',
        'Acts': '사도행전',
        'Romans': '로마서',
        'Corinthians': '고린도서',
        '1 Corinthians': '고린도전서',
        '2 Corinthians': '고린도후서',
        'Galatians': '갈라디아서',
        'Ephesians': '에베소서',
        'Philippians': '빌립보서',
        'Colossians': '골로새서',
        'Thessalonians': '데살로니가서',
        '1 Thessalonians': '데살로니가전서',
        '2 Thessalonians': '데살로니가후서',
        'Timothy': '디모데서',
        '1 Timothy': '디모데전서',
        '2 Timothy': '디모데후서',
        'Titus': '디도서',
        'Philemon': '빌레몬서',
        'Hebrews': '히브리서',
        'James': '야고보서',
        'Peter': '베드로서',
        '1 Peter': '베드로전서',
        '2 Peter': '베드로후서',
        '1 John': '요한일서',
        '2 John': '요한이서',
        '3 John': '요한삼서',
        'Jude': '유다서',
        'Revelation': '요한계시록'
      };
      
      // Parse the reference to separate book from chapter and verse
      const parts = verse.reference.split(/\s+/);
      let bookName = "";
      let chapterVerse = "";
      
      // Handle complex book names like "1 Corinthians"
      if (parts.length > 1 && (parts[0] === '1' || parts[0] === '2' || parts[0] === '3')) {
        bookName = `${parts[0]} ${parts[1]}`;
        chapterVerse = parts.slice(2).join(' ');
      } else {
        bookName = parts[0];
        chapterVerse = parts.slice(1).join(' ');
      }
      
      // Translate the book name to Korean if available
      const koreanBookName = referenceMap[bookName] || bookName;
      
      // Return the formatted Korean reference
      return `${koreanBookName} ${chapterVerse}`;
    } else if (language === 'spanish') {
      // Spanish reference formatting
      const referenceMap: {[key: string]: string} = {
        'Genesis': 'Génesis',
        'Exodus': 'Éxodo',
        'Leviticus': 'Levítico',
        'Numbers': 'Números',
        'Deuteronomy': 'Deuteronomio',
        'Joshua': 'Josué',
        'Judges': 'Jueces',
        'Ruth': 'Rut',
        'Samuel': 'Samuel',
        '1 Samuel': '1 Samuel',
        '2 Samuel': '2 Samuel',
        'Kings': 'Reyes',
        '1 Kings': '1 Reyes',
        '2 Kings': '2 Reyes',
        'Chronicles': 'Crónicas',
        '1 Chronicles': '1 Crónicas',
        '2 Chronicles': '2 Crónicas',
        'Ezra': 'Esdras',
        'Nehemiah': 'Nehemías',
        'Esther': 'Ester',
        'Job': 'Job',
        'Psalm': 'Salmo',
        'Psalms': 'Salmos',
        'Proverbs': 'Proverbios',
        'Ecclesiastes': 'Eclesiastés',
        'Song of Solomon': 'Cantares',
        'Isaiah': 'Isaías',
        'Jeremiah': 'Jeremías',
        'Lamentations': 'Lamentaciones',
        'Ezekiel': 'Ezequiel',
        'Daniel': 'Daniel',
        'Hosea': 'Oseas',
        'Joel': 'Joel',
        'Amos': 'Amós',
        'Obadiah': 'Abdías',
        'Jonah': 'Jonás',
        'Micah': 'Miqueas',
        'Nahum': 'Nahúm',
        'Habakkuk': 'Habacuc',
        'Zephaniah': 'Sofonías',
        'Haggai': 'Hageo',
        'Zechariah': 'Zacarías',
        'Malachi': 'Malaquías',
        'Matthew': 'Mateo',
        'Mark': 'Marcos',
        'Luke': 'Lucas',
        'John': 'Juan',
        'Acts': 'Hechos',
        'Romans': 'Romanos',
        'Corinthians': 'Corintios',
        '1 Corinthians': '1 Corintios',
        '2 Corinthians': '2 Corintios',
        'Galatians': 'Gálatas',
        'Ephesians': 'Efesios',
        'Philippians': 'Filipenses',
        'Colossians': 'Colosenses',
        'Thessalonians': 'Tesalonicenses',
        '1 Thessalonians': '1 Tesalonicenses',
        '2 Thessalonians': '2 Tesalonicenses',
        'Timothy': 'Timoteo',
        '1 Timothy': '1 Timoteo',
        '2 Timothy': '2 Timoteo',
        'Titus': 'Tito',
        'Philemon': 'Filemón',
        'Hebrews': 'Hebreos',
        'James': 'Santiago',
        'Peter': 'Pedro',
        '1 Peter': '1 Pedro',
        '2 Peter': '2 Pedro',
        '1 John': '1 Juan',
        '2 John': '2 Juan',
        '3 John': '3 Juan',
        'Jude': 'Judas',
        'Revelation': 'Apocalipsis'
      };
      
      // Parse the reference
      const parts = verse.reference.split(/\s+/);
      let bookName = "";
      let chapterVerse = "";
      
      if (parts.length > 1 && (parts[0] === '1' || parts[0] === '2' || parts[0] === '3')) {
        bookName = `${parts[0]} ${parts[1]}`;
        chapterVerse = parts.slice(2).join(' ');
      } else {
        bookName = parts[0];
        chapterVerse = parts.slice(1).join(' ');
      }
      
      const spanishBookName = referenceMap[bookName] || bookName;
      return `${spanishBookName} ${chapterVerse}`;
    } else if (language === 'french') {
      // French reference formatting
      const referenceMap: {[key: string]: string} = {
        'Genesis': 'Genèse',
        'Exodus': 'Exode',
        'Leviticus': 'Lévitique',
        'Numbers': 'Nombres',
        'Deuteronomy': 'Deutéronome',
        'Joshua': 'Josué',
        'Judges': 'Juges',
        'Ruth': 'Ruth',
        'Samuel': 'Samuel',
        '1 Samuel': '1 Samuel',
        '2 Samuel': '2 Samuel',
        'Kings': 'Rois',
        '1 Kings': '1 Rois',
        '2 Kings': '2 Rois',
        'Chronicles': 'Chroniques',
        '1 Chronicles': '1 Chroniques',
        '2 Chronicles': '2 Chroniques',
        'Ezra': 'Esdras',
        'Nehemiah': 'Néhémie',
        'Esther': 'Esther',
        'Job': 'Job',
        'Psalm': 'Psaume',
        'Psalms': 'Psaumes',
        'Proverbs': 'Proverbes',
        'Ecclesiastes': 'Ecclésiaste',
        'Song of Solomon': 'Cantique des Cantiques',
        'Isaiah': 'Ésaïe',
        'Jeremiah': 'Jérémie',
        'Lamentations': 'Lamentations',
        'Ezekiel': 'Ézéchiel',
        'Daniel': 'Daniel',
        'Hosea': 'Osée',
        'Joel': 'Joël',
        'Amos': 'Amos',
        'Obadiah': 'Abdias',
        'Jonah': 'Jonas',
        'Micah': 'Michée',
        'Nahum': 'Nahum',
        'Habakkuk': 'Habacuc',
        'Zephaniah': 'Sophonie',
        'Haggai': 'Aggée',
        'Zechariah': 'Zacharie',
        'Malachi': 'Malachie',
        'Matthew': 'Matthieu',
        'Mark': 'Marc',
        'Luke': 'Luc',
        'John': 'Jean',
        'Acts': 'Actes',
        'Romans': 'Romains',
        'Corinthians': 'Corinthiens',
        '1 Corinthians': '1 Corinthiens',
        '2 Corinthians': '2 Corinthiens',
        'Galatians': 'Galates',
        'Ephesians': 'Éphésiens',
        'Philippians': 'Philippiens',
        'Colossians': 'Colossiens',
        'Thessalonians': 'Thessaloniciens',
        '1 Thessaloniciens': '1 Thessaloniciens',
        '2 Thessaloniciens': '2 Thessaloniciens',
        'Timothy': 'Timothée',
        '1 Timothy': '1 Timothée',
        '2 Timothy': '2 Timothée',
        'Titus': 'Tite',
        'Philemon': 'Philémon',
        'Hebrews': 'Hébreux',
        'James': 'Jacques',
        'Peter': 'Pierre',
        '1 Peter': '1 Pierre',
        '2 Peter': '2 Pierre',
        '1 John': '1 Jean',
        '2 John': '2 Jean',
        '3 John': '3 Jean',
        'Jude': 'Jude',
        'Revelation': 'Apocalypse'
      };
      
      // Parse the reference
      const parts = verse.reference.split(/\s+/);
      let bookName = "";
      let chapterVerse = "";
      
      if (parts.length > 1 && (parts[0] === '1' || parts[0] === '2' || parts[0] === '3')) {
        bookName = `${parts[0]} ${parts[1]}`;
        chapterVerse = parts.slice(2).join(' ');
      } else {
        bookName = parts[0];
        chapterVerse = parts.slice(1).join(' ');
      }
      
      const frenchBookName = referenceMap[bookName] || bookName;
      return `${frenchBookName} ${chapterVerse}`;
    } else if (language === 'german') {
      // German reference formatting
      const referenceMap: {[key: string]: string} = {
        'Genesis': '1. Mose',
        'Exodus': '2. Mose',
        'Leviticus': '3. Mose',
        'Numbers': '4. Mose',
        'Deuteronomy': '5. Mose',
        'Joshua': 'Josua',
        'Judges': 'Richter',
        'Ruth': 'Ruth',
        'Samuel': 'Samuel',
        '1 Samuel': '1. Samuel',
        '2 Samuel': '2. Samuel',
        'Kings': 'Könige',
        '1 Kings': '1. Könige',
        '2 Kings': '2. Könige',
        'Chronicles': 'Chronik',
        '1 Chronicles': '1. Chronik',
        '2 Chronicles': '2. Chronik',
        'Ezra': 'Esra',
        'Nehemiah': 'Nehemia',
        'Esther': 'Ester',
        'Job': 'Hiob',
        'Psalm': 'Psalm',
        'Psalms': 'Psalmen',
        'Proverbs': 'Sprüche',
        'Ecclesiastes': 'Prediger',
        'Song of Solomon': 'Hohelied',
        'Isaiah': 'Jesaja',
        'Jeremiah': 'Jeremia',
        'Lamentations': 'Klagelieder',
        'Ezekiel': 'Hesekiel',
        'Daniel': 'Daniel',
        'Hosea': 'Hosea',
        'Joel': 'Joel',
        'Amos': 'Amos',
        'Obadiah': 'Obadja',
        'Jonah': 'Jona',
        'Micah': 'Micha',
        'Nahum': 'Nahum',
        'Habakkuk': 'Habakuk',
        'Zephaniah': 'Zefanja',
        'Haggai': 'Haggai',
        'Zechariah': 'Sacharja',
        'Malachi': 'Maleachi',
        'Matthew': 'Matthäus',
        'Mark': 'Markus',
        'Luke': 'Lukas',
        'John': 'Johannes',
        'Acts': 'Apostelgeschichte',
        'Romans': 'Römer',
        'Corinthians': 'Korinther',
        '1 Corinthians': '1. Korinther',
        '2 Corinthians': '2. Korinther',
        'Galatians': 'Galater',
        'Ephesians': 'Epheser',
        'Philippians': 'Philipper',
        'Colossians': 'Kolosser',
        'Thessalonians': 'Thessalonicher',
        '1 Thessalonians': '1. Thessalonicher',
        '2 Thessalonians': '2. Thessalonicher',
        'Timothy': 'Timotheus',
        '1 Timothy': '1. Timotheus',
        '2 Timothy': '2. Timotheus',
        'Titus': 'Titus',
        'Philemon': 'Philemon',
        'Hebrews': 'Hebräer',
        'James': 'Jakobus',
        'Peter': 'Petrus',
        '1 Peter': '1. Petrus',
        '2 Peter': '2. Petrus',
        '1 John': '1. Johannes',
        '2 John': '2. Johannes',
        '3 John': '3. Johannes',
        'Jude': 'Judas',
        'Revelation': 'Offenbarung'
      };
      
      // Parse the reference
      const parts = verse.reference.split(/\s+/);
      let bookName = "";
      let chapterVerse = "";
      
      if (parts.length > 1 && (parts[0] === '1' || parts[0] === '2' || parts[0] === '3')) {
        bookName = `${parts[0]} ${parts[1]}`;
        chapterVerse = parts.slice(2).join(' ');
      } else {
        bookName = parts[0];
        chapterVerse = parts.slice(1).join(' ');
      }
      
      const germanBookName = referenceMap[bookName] || bookName;
      return `${germanBookName} ${chapterVerse}`;
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
          className="w-full h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden relative"
          style={{
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <span className="text-gray-500">Loading...</span>
            </div>
          )}
          
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          
          {/* Content container */}
          <div className="relative z-10 h-full flex flex-col p-5">
            {/* Top section with title */}
            <div className="uppercase font-bold tracking-wider text-center py-2 mb-3 bg-white bg-opacity-90 backdrop-blur-sm rounded-md text-gray-800 shadow-sm">
              {cardTitle}
            </div>
            
            {/* Verse section */}
            <div className="flex flex-col flex-grow">
              <div className="flex-1 flex flex-col justify-center items-center mb-4">
                {/* Verse text in italics with improved readability background */}
                <div className="text-center font-comic italic text-white mb-2 bg-black bg-opacity-50 p-3 rounded-lg backdrop-blur-sm shadow-lg">
                  "{renderVerseText()}"
                </div>
                
                {/* Reference below verse */}
                <div className="text-center text-sm mt-1 mb-4 text-white font-medium bg-black bg-opacity-30 px-2 py-1 rounded">
                  {formatReference()}
                </div>
              </div>
              
              {/* Application in bold with improved readability background */}
              <div className="mt-auto text-center font-comic font-bold text-gray-800 bg-white bg-opacity-90 backdrop-blur-sm p-4 rounded-md shadow-sm">
                {getApplicationMessage()}
              </div>
            </div>
          </div>
        </div>
      </AspectRatio>
    </div>
  );
};

export default FaithCard;
