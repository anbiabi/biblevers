
import { BibleVerse } from '@/data/bibleVerses';

export interface VerseAnalysis {
  primaryTheme: string;
  secondaryThemes: string[];
  emotionalTone: 'uplifting' | 'comforting' | 'peaceful' | 'joyful' | 'hopeful';
  imagery: string[];
  colorSuggestions: string[];
}

export const analyzeVerse = (verse: BibleVerse): VerseAnalysis => {
  const text = verse.text.english.toLowerCase();
  const topics = verse.topics;
  
  // Determine primary theme
  const primaryTheme = topics[0] || 'faith';
  const secondaryThemes = topics.slice(1);
  
  // Analyze emotional tone based on text content
  let emotionalTone: VerseAnalysis['emotionalTone'] = 'peaceful';
  
  if (text.includes('joy') || text.includes('rejoice') || text.includes('glad')) {
    emotionalTone = 'joyful';
  } else if (text.includes('hope') || text.includes('future') || text.includes('promise')) {
    emotionalTone = 'hopeful';
  } else if (text.includes('comfort') || text.includes('peace') || text.includes('rest')) {
    emotionalTone = 'comforting';
  } else if (text.includes('strength') || text.includes('power') || text.includes('mighty')) {
    emotionalTone = 'uplifting';
  }
  
  // Extract imagery suggestions based on common biblical metaphors
  const imagery: string[] = [];
  
  if (text.includes('mountain') || text.includes('rock') || text.includes('stone')) {
    imagery.push('mountains', 'rocks', 'solid foundations');
  }
  if (text.includes('water') || text.includes('river') || text.includes('stream')) {
    imagery.push('flowing water', 'peaceful streams', 'gentle waterfalls');
  }
  if (text.includes('light') || text.includes('sun') || text.includes('dawn')) {
    imagery.push('golden sunlight', 'sunrise', 'warm glow');
  }
  if (text.includes('tree') || text.includes('forest') || text.includes('branch')) {
    imagery.push('ancient trees', 'peaceful forest', 'strong branches');
  }
  if (text.includes('flower') || text.includes('garden') || text.includes('field')) {
    imagery.push('wildflowers', 'peaceful meadow', 'blooming garden');
  }
  if (text.includes('sky') || text.includes('heaven') || text.includes('cloud')) {
    imagery.push('peaceful sky', 'soft clouds', 'heavenly light');
  }
  
  // Default imagery if none found
  if (imagery.length === 0) {
    imagery.push('peaceful landscape', 'gentle nature', 'serene vista');
  }
  
  // Color suggestions based on theme and tone
  const colorSuggestions: string[] = [];
  
  switch (primaryTheme.toLowerCase()) {
    case 'love':
      colorSuggestions.push('warm gold', 'soft pink', 'gentle rose');
      break;
    case 'peace':
      colorSuggestions.push('soft blue', 'gentle lavender', 'calm teal');
      break;
    case 'hope':
      colorSuggestions.push('golden yellow', 'bright orange', 'warm amber');
      break;
    case 'strength':
      colorSuggestions.push('deep blue', 'rich purple', 'strong green');
      break;
    case 'joy':
      colorSuggestions.push('bright yellow', 'cheerful orange', 'happy pink');
      break;
    case 'comfort':
      colorSuggestions.push('warm beige', 'soft cream', 'gentle brown');
      break;
    default:
      colorSuggestions.push('soft pastels', 'warm earth tones', 'gentle blues');
  }
  
  return {
    primaryTheme,
    secondaryThemes,
    emotionalTone,
    imagery,
    colorSuggestions
  };
};
