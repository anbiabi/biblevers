import React from 'react';
import { BibleVerse } from '../data/bibleVerses';

export interface StickerProps {
  verse: BibleVerse;
  language: string;
  gradient: string;
}

const Sticker: React.FC<StickerProps> = ({ verse, language, gradient }) => {
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
      case 'bilingual':
        return (
          <>
            <p className="text-center font-comic text-xs sm:text-sm mb-1 line-clamp-2">{verse.text.english}</p>
            <p className="text-center font-comic text-xs sm:text-sm line-clamp-2">{verse.text.korean || ''}</p>
          </>
        );
      default:
        return verse.text.english;
    }
  };

  // Calculate text size class based on verse length
  const getTextSizeClass = () => {
    let text = '';
    
    switch (language) {
      case 'english':
        text = verse.text.english;
        break;
      case 'korean':
        text = verse.text.korean || verse.text.english;
        break;
      case 'spanish':
        text = verse.text.spanish || verse.text.english;
        break;
      case 'french':
        text = verse.text.french || verse.text.english;
        break;
      case 'german':
        text = verse.text.german || verse.text.english;
        break;
      default:
        text = verse.text.english;
    }
    
    if (text.length > 150) return 'text-xs';
    if (text.length > 100) return 'text-sm';
    return 'text-base';
  };

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

  // Combined rendering for verse text and reference in a single container
  const renderVerseContent = () => {
    if (language === 'bilingual') {
      return (
        <div className="flex flex-col items-center justify-center h-full w-full py-1">
          <div className="font-comic text-xs sm:text-sm mb-0.5 text-center print:text-lg print:font-bold">{verse.text.english}</div>
          <div className="font-comic text-xs sm:text-sm text-center print:text-lg print:font-bold">{verse.text.korean || ''}</div>
          <div className="font-comic font-bold text-sm mt-1 text-center print:text-xs print:font-normal print:opacity-75">{formatReference()}</div>
        </div>
      );
    } else {
      const textContent = renderVerseText();
      const textSizeClass = getTextSizeClass();
      
      return (
        <div className="flex flex-col items-center justify-center h-full w-full py-1">
          <div className={`font-comic ${textSizeClass} text-center mb-1 print:text-lg print:font-bold`}>{textContent}</div>
          <div className="font-comic font-bold text-sm text-center print:text-xs print:font-normal print:opacity-75">{formatReference()}</div>
        </div>
      );
    }
  };

  return (
    <div 
      className="sticker w-full h-full rounded-lg p-2 print:p-1" 
      style={{ background: gradient }}
    >
      {renderVerseContent()}
    </div>
  );
};

export default Sticker;
