import { BibleVerse } from '@/data/bibleVerses';
import { aiImageService } from './AIImageService';

// Default fallback images from the uploaded samples
const FALLBACK_BACKGROUNDS = [
  '/lovable-uploads/4406f99e-d72a-4f6d-a175-aaaab81fef10.png',
  '/lovable-uploads/0f133377-3b6d-46eb-b884-1a1cf4a48e84.png', 
  '/lovable-uploads/540b6a29-4c1a-4865-b334-47a17e619d98.png',
  '/lovable-uploads/ff982c31-779d-4c30-b5e3-074d1ade3b44.png'
];

// Picsum Photos categories for different themes
const PICSUM_CATEGORIES = {
  nature: [
    'https://picsum.photos/512/768?random=1&blur=1',
    'https://picsum.photos/512/768?random=2&blur=1',
    'https://picsum.photos/512/768?random=3&blur=1',
    'https://picsum.photos/512/768?random=4&blur=1',
    'https://picsum.photos/512/768?random=5&blur=1'
  ],
  peaceful: [
    'https://picsum.photos/512/768?random=10&blur=2',
    'https://picsum.photos/512/768?random=11&blur=2',
    'https://picsum.photos/512/768?random=12&blur=2',
    'https://picsum.photos/512/768?random=13&blur=2',
    'https://picsum.photos/512/768?random=14&blur=2'
  ],
  serene: [
    'https://picsum.photos/512/768?random=20&blur=1',
    'https://picsum.photos/512/768?random=21&blur=1',
    'https://picsum.photos/512/768?random=22&blur=1',
    'https://picsum.photos/512/768?random=23&blur=1',
    'https://picsum.photos/512/768?random=24&blur=1'
  ],
  warm: [
    'https://picsum.photos/512/768?random=30&blur=1',
    'https://picsum.photos/512/768?random=31&blur=1',
    'https://picsum.photos/512/768?random=32&blur=1',
    'https://picsum.photos/512/768?random=33&blur=1',
    'https://picsum.photos/512/768?random=34&blur=1'
  ]
};

export interface BackgroundOptions {
  useAI: boolean;
  fallbackIndex?: number;
  usePicsum?: boolean;
}

class BackgroundService {
  private getThemeFromVerse(verse: BibleVerse): keyof typeof PICSUM_CATEGORIES {
    const text = verse.text.english.toLowerCase();
    const topics = verse.topics.map(t => t.toLowerCase());

    // Determine theme based on verse content
    if (text.includes('peace') || text.includes('rest') || text.includes('calm') || 
        topics.includes('peace') || topics.includes('comfort')) {
      return 'peaceful';
    } else if (text.includes('love') || text.includes('warm') || text.includes('heart') ||
               topics.includes('love') || topics.includes('joy')) {
      return 'warm';
    } else if (text.includes('quiet') || text.includes('still') || text.includes('gentle') ||
               topics.includes('patience') || topics.includes('wisdom')) {
      return 'serene';
    } else {
      return 'nature'; // Default to nature
    }
  }

  private getPicsumBackground(verse: BibleVerse): string {
    const theme = this.getThemeFromVerse(verse);
    const themeBackgrounds = PICSUM_CATEGORIES[theme];
    const randomIndex = Math.floor(Math.random() * themeBackgrounds.length);
    return themeBackgrounds[randomIndex];
  }

  async getCardBackground(
    verse: BibleVerse, 
    options: BackgroundOptions = { useAI: true, usePicsum: true }
  ): Promise<string> {
    
    // Try AI generation first if enabled and API key available
    if (options.useAI) {
      try {
        const result = await aiImageService.generateImage({
          verse,
          style: 'serene',
          width: 512,
          height: 768
        });
        
        if (result?.imageUrl) {
          console.log(`Successfully generated ${result.provider} background for:`, verse.reference);
          return result.imageUrl;
        }
      } catch (error) {
        // More specific error handling
        if (error instanceof Error) {
          if (error.message.includes('402')) {
            console.warn('AI image generation failed due to billing issue. Using Picsum fallback background.');
          } else if (error.message.includes('401')) {
            console.warn('AI image generation failed due to invalid API key. Using Picsum fallback background.');
          } else if (error.message.includes('429')) {
            console.warn('AI image generation failed due to rate limiting. Using Picsum fallback background.');
          } else {
            console.warn('AI image generation failed:', error.message, 'Using Picsum fallback background.');
          }
        } else {
          console.warn('AI image generation failed with unknown error. Using Picsum fallback background.');
        }
      }
    }
    
    // Try Picsum Photos if enabled
    if (options.usePicsum !== false) {
      try {
        const picsumUrl = this.getPicsumBackground(verse);
        console.log('Using Picsum background:', picsumUrl, 'for verse:', verse.reference);
        return picsumUrl;
      } catch (error) {
        console.warn('Picsum Photos failed, falling back to local images:', error);
      }
    }
    
    // Fallback to local sample images
    const fallbackIndex = options.fallbackIndex ?? Math.floor(Math.random() * FALLBACK_BACKGROUNDS.length);
    const selectedBackground = FALLBACK_BACKGROUNDS[fallbackIndex % FALLBACK_BACKGROUNDS.length];
    console.log('Using local fallback background:', selectedBackground, 'for verse:', verse.reference);
    return selectedBackground;
  }

  getFallbackBackground(index?: number): string {
    const selectedIndex = index ?? Math.floor(Math.random() * FALLBACK_BACKGROUNDS.length);
    return FALLBACK_BACKGROUNDS[selectedIndex % FALLBACK_BACKGROUNDS.length];
  }

  preloadFallbackImages(): void {
    FALLBACK_BACKGROUNDS.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }
}

export const backgroundService = new BackgroundService();