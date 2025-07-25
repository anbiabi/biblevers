import React, { useEffect, useState, useRef } from 'react';
import { BibleVerse } from '@/data/bibleVerses';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { backgroundService } from '@/services/BackgroundService';
import { aiVerseAnalyzer } from '@/services/AIVerseAnalyzer';

interface FaithCardProps {
  verse: BibleVerse;
  language: string;
  theme?: string;
  title?: string;
  useMagicalGarden?: boolean;
}

const FaithCard: React.FC<FaithCardProps> = ({ 
  verse, 
  language,
  theme = "Faith",
  title,
  useMagicalGarden = false
}) => {
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [textSizes, setTextSizes] = useState({
    verse: 'text-xl',
    reference: 'text-lg',
    commentary: 'text-lg'
  });
  
  const verseRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadBackground = async () => {
      setIsLoading(true);
      try {
        // Check if we should use the magical garden background
        if (useMagicalGarden) {
          setBackgroundImage(backgroundService.getMagicalGardenBackground());
        } else {
          const bg = await backgroundService.getCardBackground(verse, { 
            useAI: true, 
            preferMagical: Math.random() > 0.7 // 30% chance for magical garden
          });
          
          // Validate background URL
          if (bg && (bg.startsWith('http') || bg.startsWith('/'))) {
            setBackgroundImage(bg);
          } else {
            console.warn('Invalid background URL, using fallback');
            setBackgroundImage(backgroundService.getFallbackBackground());
          }
        }
      } catch (error) {
        console.error('Failed to load background:', error);
        setBackgroundImage(backgroundService.getFallbackBackground());
      } finally {
        setIsLoading(false);
      }
    };

    loadBackground();
  }, [verse, useMagicalGarden]);

  // Dynamic text sizing based on content length
  useEffect(() => {
    const adjustTextSizes = () => {
      if (!containerRef.current || !verseRef.current) return;
      
      const verseText = renderVerseText();
      const verseLength = verseText.length;
      
      let verseFontSize = 'text-xl';
      let referenceFontSize = 'text-lg';
      let commentaryFontSize = 'text-lg';
      
      // Adjust verse text size based on length
      if (verseLength > 300) {
        verseFontSize = 'text-base';
      } else if (verseLength > 200) {
        verseFontSize = 'text-lg';
      } else if (verseLength > 100) {
        verseFontSize = 'text-xl';
      } else {
        verseFontSize = 'text-2xl';
      }
      
      // Adjust reference and commentary sizes proportionally
      if (verseFontSize === 'text-base') {
        referenceFontSize = 'text-sm';
        commentaryFontSize = 'text-sm';
      } else if (verseFontSize === 'text-lg') {
        referenceFontSize = 'text-base';
        commentaryFontSize = 'text-base';
      }
      
      setTextSizes({
        verse: verseFontSize,
        reference: referenceFontSize,
        commentary: commentaryFontSize
      });
    };

    adjustTextSizes();
    window.addEventListener('resize', adjustTextSizes);
    
    return () => window.removeEventListener('resize', adjustTextSizes);
  }, [verse, language]);

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

  const formatReference = () => {
    if (language === 'korean') {
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
      
      const koreanBookName = referenceMap[bookName] || bookName;
      return `${koreanBookName} ${chapterVerse}`;
    } else if (language === 'spanish') {
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
  
  // Generate AI contextual phrase in the selected language
  const getContextualPhrase = () => {
    const contextualPhrase = aiVerseAnalyzer.generateContextualPhrase(verse, language);
    return contextualPhrase.phrase;
  };
  
  // Card title based on theme or topics
  const cardTitle = title || theme || verse.topics[0] || "Faith Declaration";
  
  // Determine if we should use magical styling based on background
  const isMagicalTheme = useMagicalGarden || backgroundImage.includes('bck4.png');
  
  // Select a handwriting font for the verse text
  const handwritingFonts = [
    "'Caveat', cursive",
    "'Satisfy', cursive",
    "'Kalam', cursive",
    "'Indie Flower', cursive",
    "'Dancing Script', cursive"
  ];
  
  const randomHandwritingFont = handwritingFonts[Math.floor(Math.random() * handwritingFonts.length)];
  
  return (
    <div className="faith-card w-full h-full flex flex-col overflow-hidden">
      <AspectRatio ratio={3/4} className="w-full h-full">
        <div ref={containerRef} className="w-full h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden relative">
          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <span className="text-gray-500">Loading...</span>
            </div>
          )}
          
          {/* Background */}
          <div 
            className="absolute inset-0"
            style={{
              background: backgroundImage.startsWith('http') || backgroundImage.startsWith('/') 
                ? `url(${backgroundImage})` 
                : backgroundImage || 'white',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          
          {/* Content overlay for better text readability */}
          {backgroundImage && (
            <div className="absolute inset-0 bg-white bg-opacity-75" />
          )}
          
          {/* Content container */}
          <div className="relative z-10 h-full flex flex-col p-4 sm:p-6">
            {/* Card Title - Big and fun */}
            <div 
              className="text-center font-bold text-2xl sm:text-3xl mb-3 text-white drop-shadow-lg"
              style={{
                fontFamily: randomHandwritingFont,
                textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(255,255,255,0.3)',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
              }}
            >
              {cardTitle.toUpperCase()}
            </div>
            {/* Verse text - Using handwriting font */}
            <div 
              ref={verseRef}
              className={`text-center font-bold ${textSizes.verse} leading-tight mb-4 sm:mb-6 flex-grow flex items-center justify-center`}
              style={{ 
                fontFamily: randomHandwritingFont,
                color: '#1f2937',
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
              }}>
              "{renderVerseText()}"
            </div>
            
            {/* Reference - Colored and right aligned */}
            <div 
              className={`text-right ${textSizes.reference} font-bold mb-4 sm:mb-6`}
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: '#1f2937',
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
              }}>
              {formatReference()}
            </div>
            
            {/* Divider line */}
            <div className="w-full h-px bg-gray-200 mb-4"></div>
            
            {/* AI-generated contextual phrase - Combined section */}
            <div 
              className={`text-center font-bold italic ${textSizes.commentary} text-purple-700`}
              style={{ 
                fontFamily: 'Inter, sans-serif',
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
              }}>
              {getContextualPhrase()}
            </div>
          </div>
        </div>
      </AspectRatio>
    </div>
  );
};

export default FaithCard;