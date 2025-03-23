
import React from 'react';
import { BibleVerse } from '../data/bibleVerses';

export interface StickerProps {
  verse: BibleVerse;
  language: string;
  gradient: string;
}

const Sticker: React.FC<StickerProps> = ({ verse, language, gradient }) => {
  const renderVerseText = () => {
    if (language === 'english') {
      return <p className="text-center font-comic text-sm sm:text-base line-clamp-4">{verse.text.english}</p>;
    } else if (language === 'korean') {
      return <p className="text-center font-comic text-sm sm:text-base line-clamp-4">{verse.text.korean || verse.text.english}</p>;
    } else if (language === 'bilingual') {
      return (
        <>
          <p className="text-center font-comic text-xs sm:text-sm mb-1 line-clamp-2">{verse.text.english}</p>
          <p className="text-center font-comic text-xs sm:text-sm line-clamp-2">{verse.text.korean || ''}</p>
        </>
      );
    } else {
      // For other languages, just show English for now
      return <p className="text-center font-comic text-sm sm:text-base line-clamp-4">{verse.text.english}</p>;
    }
  };

  // Calculate text size class based on verse length
  const getTextSizeClass = () => {
    const text = language === 'english' ? verse.text.english 
              : language === 'korean' ? (verse.text.korean || verse.text.english)
              : verse.text.english;
    
    if (text.length > 150) return 'text-xs';
    if (text.length > 100) return 'text-sm';
    return 'text-base';
  };

  // Format reference based on language
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
    }
    
    return verse.reference;
  };

  return (
    <div 
      className="sticker w-full h-full rounded-lg flex flex-col justify-center items-center p-2" 
      style={{ background: gradient }}
    >
      {/* Verse text first */}
      <div className={`font-comic ${getTextSizeClass()} text-center mb-2 flex-1 flex items-center`}>
        {renderVerseText()}
      </div>
      
      {/* Reference at the bottom */}
      <div className="font-comic font-bold text-sm mt-auto">
        {formatReference()}
      </div>
    </div>
  );
};

export default Sticker;
