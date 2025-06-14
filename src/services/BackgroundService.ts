import { BibleVerse } from '@/data/bibleVerses';
import { aiImageService } from './AIImageService';

// Default fallback images from the uploaded samples
const FALLBACK_BACKGROUNDS = [
  '/lovable-uploads/4406f99e-d72a-4f6d-a175-aaaab81fef10.png',
  '/lovable-uploads/0f133377-3b6d-46eb-b884-1a1cf4a48e84.png', 
  '/lovable-uploads/540b6a29-4c1a-4865-b334-47a17e619d98.png',
  '/lovable-uploads/ff982c31-779d-4c30-b5e3-074d1ade3b44.png'
];

export interface BackgroundOptions {
  useAI: boolean;
  fallbackIndex?: number;
}

class BackgroundService {
  async getCardBackground(
    verse: BibleVerse, 
    options: BackgroundOptions = { useAI: true }
  ): Promise<string> {
    
    // Try AI generation first if enabled and API key available
    if (options.useAI && aiImageService.getApiKey()) {
      try {
        const result = await aiImageService.generateImage({
          verse,
          style: 'serene',
          width: 512,
          height: 768
        });
        
        if (result?.imageUrl) {
          console.log('Successfully generated AI background for:', verse.reference);
          return result.imageUrl;
        }
      } catch (error) {
        // More specific error handling
        if (error instanceof Error) {
          if (error.message.includes('402')) {
            console.warn('AI image generation failed due to billing issue. Using fallback background.');
          } else if (error.message.includes('401')) {
            console.warn('AI image generation failed due to invalid API key. Using fallback background.');
          } else if (error.message.includes('429')) {
            console.warn('AI image generation failed due to rate limiting. Using fallback background.');
          } else {
            console.warn('AI image generation failed:', error.message, 'Using fallback background.');
          }
        } else {
          console.warn('AI image generation failed with unknown error. Using fallback background.');
        }
      }
    }
    
    // Fallback to sample images
    const fallbackIndex = options.fallbackIndex ?? Math.floor(Math.random() * FALLBACK_BACKGROUNDS.length);
    const selectedBackground = FALLBACK_BACKGROUNDS[fallbackIndex % FALLBACK_BACKGROUNDS.length];
    console.log('Using fallback background:', selectedBackground, 'for verse:', verse.reference);
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