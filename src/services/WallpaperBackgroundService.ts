import { BibleVerse } from '@/data/bibleVerses';
import { aiImageService } from './AIImageService';

// Christian and seasonal background categories
const CHRISTIAN_BACKGROUNDS = {
  christmas: [
    '/lovable-uploads/christmas-1.jpg',
    '/lovable-uploads/christmas-2.jpg',
    '/lovable-uploads/christmas-3.jpg'
  ],
  easter: [
    '/lovable-uploads/easter-1.jpg',
    '/lovable-uploads/easter-2.jpg',
    '/lovable-uploads/easter-3.jpg'
  ],
  cross: [
    '/lovable-uploads/cross-1.jpg',
    '/lovable-uploads/cross-2.jpg',
    '/lovable-uploads/cross-3.jpg'
  ],
  nature: [
    '/lovable-uploads/4406f99e-d72a-4f6d-a175-aaaab81fef10.png',
    '/lovable-uploads/0f133377-3b6d-46eb-b884-1a1cf4a48e84.png',
    '/lovable-uploads/540b6a29-4c1a-4865-b334-47a17e619d98.png',
    '/lovable-uploads/ff982c31-779d-4c30-b5e3-074d1ade3b44.png'
  ]
};

const SEASONAL_BACKGROUNDS = {
  spring: [
    '/lovable-uploads/spring-1.jpg',
    '/lovable-uploads/spring-2.jpg',
    '/lovable-uploads/spring-3.jpg'
  ],
  summer: [
    '/lovable-uploads/summer-1.jpg',
    '/lovable-uploads/summer-2.jpg',
    '/lovable-uploads/summer-3.jpg'
  ],
  autumn: [
    '/lovable-uploads/autumn-1.jpg',
    '/lovable-uploads/autumn-2.jpg',
    '/lovable-uploads/autumn-3.jpg'
  ],
  winter: [
    '/lovable-uploads/winter-1.jpg',
    '/lovable-uploads/winter-2.jpg',
    '/lovable-uploads/winter-3.jpg'
  ]
};

// Combine all backgrounds for fallback
const ALL_WALLPAPER_BACKGROUNDS = [
  ...CHRISTIAN_BACKGROUNDS.nature,
  ...Object.values(CHRISTIAN_BACKGROUNDS).flat(),
  ...Object.values(SEASONAL_BACKGROUNDS).flat()
].filter((bg, index, arr) => arr.indexOf(bg) === index); // Remove duplicates

export interface WallpaperBackgroundOptions {
  useAI: boolean;
  category?: 'christmas' | 'easter' | 'cross' | 'nature' | 'spring' | 'summer' | 'autumn' | 'winter' | 'auto';
  fallbackIndex?: number;
}

class WallpaperBackgroundService {
  private getCurrentSeason(): 'spring' | 'summer' | 'autumn' | 'winter' {
    const month = new Date().getMonth() + 1; // 1-12
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'autumn';
    return 'winter';
  }

  private isChristmasTime(): boolean {
    const month = new Date().getMonth() + 1;
    return month === 12 || month === 1; // December or January
  }

  private isEasterTime(): boolean {
    const month = new Date().getMonth() + 1;
    return month >= 3 && month <= 5; // March to May (approximate Easter season)
  }

  private selectCategoryBasedOnVerse(verse: BibleVerse): string {
    const text = verse.text.english.toLowerCase();
    const topics = verse.topics.map(t => t.toLowerCase());

    // Check for Christmas themes
    if (this.isChristmasTime() || 
        text.includes('born') || text.includes('birth') || text.includes('savior') ||
        text.includes('emmanuel') || text.includes('bethlehem')) {
      return 'christmas';
    }

    // Check for Easter themes
    if (this.isEasterTime() || 
        text.includes('resurrection') || text.includes('risen') || text.includes('tomb') ||
        text.includes('cross') || text.includes('crucified')) {
      return 'easter';
    }

    // Check for cross/salvation themes
    if (text.includes('cross') || text.includes('salvation') || text.includes('forgiveness') ||
        topics.includes('forgiveness') || topics.includes('salvation')) {
      return 'cross';
    }

    // Default to seasonal or nature
    if (Math.random() > 0.5) {
      return this.getCurrentSeason();
    } else {
      return 'nature';
    }
  }

  private getBackgroundsForCategory(category: string): string[] {
    switch (category) {
      case 'christmas':
        return CHRISTIAN_BACKGROUNDS.christmas;
      case 'easter':
        return CHRISTIAN_BACKGROUNDS.easter;
      case 'cross':
        return CHRISTIAN_BACKGROUNDS.cross;
      case 'nature':
        return CHRISTIAN_BACKGROUNDS.nature;
      case 'spring':
        return SEASONAL_BACKGROUNDS.spring;
      case 'summer':
        return SEASONAL_BACKGROUNDS.summer;
      case 'autumn':
        return SEASONAL_BACKGROUNDS.autumn;
      case 'winter':
        return SEASONAL_BACKGROUNDS.winter;
      default:
        return CHRISTIAN_BACKGROUNDS.nature;
    }
  }

  async getWallpaperBackground(
    verse: BibleVerse, 
    options: WallpaperBackgroundOptions = { useAI: true, category: 'auto' }
  ): Promise<string> {
    
    // Try AI generation first if enabled and API key available
    if (options.useAI && aiImageService.getApiKey()) {
      try {
        const result = await aiImageService.generateImage({
          verse,
          style: 'serene',
          width: 1080,
          height: 1920 // Phone wallpaper dimensions
        });
        
        if (result?.imageUrl) {
          console.log('Successfully generated AI wallpaper background for:', verse.reference);
          return result.imageUrl;
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes('402')) {
            console.warn('AI wallpaper generation failed due to billing issue. Using categorized fallback background.');
          } else if (error.message.includes('401')) {
            console.warn('AI wallpaper generation failed due to invalid API key. Using categorized fallback background.');
          } else if (error.message.includes('429')) {
            console.warn('AI wallpaper generation failed due to rate limiting. Using categorized fallback background.');
          } else {
            console.warn('AI wallpaper generation failed:', error.message, 'Using categorized fallback background.');
          }
        } else {
          console.warn('AI wallpaper generation failed with unknown error. Using categorized fallback background.');
        }
      }
    }
    
    // Determine category
    let category = options.category;
    if (category === 'auto' || !category) {
      category = this.selectCategoryBasedOnVerse(verse);
    }

    // Get backgrounds for the selected category
    const categoryBackgrounds = this.getBackgroundsForCategory(category);
    
    // Select a background from the category
    const fallbackIndex = options.fallbackIndex ?? Math.floor(Math.random() * categoryBackgrounds.length);
    const selectedBackground = categoryBackgrounds[fallbackIndex % categoryBackgrounds.length];
    
    console.log(`Using ${category} wallpaper background:`, selectedBackground, 'for verse:', verse.reference);
    return selectedBackground;
  }

  getFallbackWallpaperBackground(index?: number): string {
    const selectedIndex = index ?? Math.floor(Math.random() * ALL_WALLPAPER_BACKGROUNDS.length);
    return ALL_WALLPAPER_BACKGROUNDS[selectedIndex % ALL_WALLPAPER_BACKGROUNDS.length];
  }

  preloadWallpaperImages(): void {
    ALL_WALLPAPER_BACKGROUNDS.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  getAvailableCategories(): string[] {
    return ['auto', 'christmas', 'easter', 'cross', 'nature', 'spring', 'summer', 'autumn', 'winter'];
  }
}

export const wallpaperBackgroundService = new WallpaperBackgroundService();