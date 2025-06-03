
import { BibleVerse } from '@/data/bibleVerses';

export interface VerseAnalysis {
  themes: string[];
  mood: 'peaceful' | 'hopeful' | 'comforting' | 'joyful' | 'reflective' | 'powerful';
  imagePrompt: string;
  stickerPrompt: string;
}

export class VerseAnalyzer {
  static analyzeVerse(verse: BibleVerse): VerseAnalysis {
    const text = verse.text.english.toLowerCase();
    const reference = verse.reference.toLowerCase();
    const topics = verse.topics;

    // Determine mood based on content
    let mood: VerseAnalysis['mood'] = 'peaceful';
    
    if (text.includes('joy') || text.includes('rejoice') || text.includes('glad')) {
      mood = 'joyful';
    } else if (text.includes('hope') || text.includes('faith') || text.includes('trust')) {
      mood = 'hopeful';
    } else if (text.includes('comfort') || text.includes('peace') || text.includes('rest')) {
      mood = 'comforting';
    } else if (text.includes('strength') || text.includes('power') || text.includes('mighty')) {
      mood = 'powerful';
    } else if (text.includes('meditate') || text.includes('consider') || text.includes('remember')) {
      mood = 'reflective';
    }

    // Generate themes based on verse content and topics
    const themes = this.extractThemes(text, topics);

    // Generate image prompts
    const imagePrompt = this.generateCardPrompt(themes, mood, text);
    const stickerPrompt = this.generateStickerPrompt(themes, mood);

    return {
      themes,
      mood,
      imagePrompt,
      stickerPrompt
    };
  }

  private static extractThemes(text: string, topics: string[]): string[] {
    const themes: string[] = [...topics];

    // Add contextual themes based on content
    const themeKeywords = {
      nature: ['mountain', 'tree', 'forest', 'river', 'garden', 'flower', 'valley'],
      light: ['light', 'lamp', 'sun', 'bright', 'shine', 'dawn'],
      protection: ['shield', 'fortress', 'refuge', 'shelter', 'guard', 'protect'],
      guidance: ['path', 'way', 'guide', 'lead', 'direct', 'show'],
      heaven: ['heaven', 'glory', 'throne', 'angel', 'holy', 'divine'],
      animals: ['sheep', 'lamb', 'dove', 'eagle', 'lion', 'deer']
    };

    Object.entries(themeKeywords).forEach(([theme, keywords]) => {
      if (keywords.some(keyword => text.includes(keyword))) {
        themes.push(theme);
      }
    });

    return [...new Set(themes)];
  }

  private static generateCardPrompt(themes: string[], mood: string, text: string): string {
    const baseStyle = "dreamy watercolor illustration, soft atmospheric lighting, peaceful serene landscape";
    
    let sceneElements = [];
    
    // Add nature elements based on themes
    if (themes.includes('nature') || themes.includes('peace')) {
      sceneElements.push("mountain ranges in soft pastels");
      sceneElements.push("gentle rolling hills");
    }
    
    if (themes.includes('light') || themes.includes('hope')) {
      sceneElements.push("warm golden sunlight");
      sceneElements.push("soft glowing sky");
    }
    
    if (themes.includes('animals') || themes.includes('comfort')) {
      sceneElements.push("cute woodland creatures");
      sceneElements.push("small peaceful animals");
    }
    
    // Add flowers and trees for beauty
    sceneElements.push("delicate wildflowers");
    sceneElements.push("majestic pine trees");
    
    // Mood-specific additions
    switch (mood) {
      case 'joyful':
        sceneElements.push("bright cheerful colors", "dancing butterflies");
        break;
      case 'peaceful':
        sceneElements.push("calm misty atmosphere", "tranquil silence");
        break;
      case 'hopeful':
        sceneElements.push("rays of sunlight breaking through clouds", "dawn breaking");
        break;
      case 'comforting':
        sceneElements.push("warm cozy atmosphere", "gentle embracing light");
        break;
    }
    
    const scene = sceneElements.slice(0, 4).join(", ");
    
    return `${baseStyle}, ${scene}, fantasy art style, no text, no words, ethereal beauty, inspirational atmosphere`;
  }

  private static generateStickerPrompt(themes: string[], mood: string): string {
    const baseStyle = "cute cartoon style illustration, simple clean design, child-friendly";
    
    let elements = [];
    
    if (themes.includes('animals')) {
      elements.push("adorable cartoon animals");
    }
    
    if (themes.includes('nature')) {
      elements.push("simple trees and flowers");
    }
    
    if (themes.includes('light') || themes.includes('hope')) {
      elements.push("bright cheerful colors");
    }
    
    const scene = elements.length > 0 ? elements.join(", ") : "simple peaceful landscape";
    
    return `${baseStyle}, ${scene}, pastel colors, no text, sticker design, minimalist`;
  }
}
