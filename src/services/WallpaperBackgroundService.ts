import { BibleVerse } from '@/data/bibleVerses';
import { aiImageService } from './AIImageService';

// Christian and seasonal background categories
const CHRISTIAN_BACKGROUNDS = {
  christmas: [
    'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg',
    'https://images.pexels.com/photos/1303098/pexels-photo-1303098.jpeg',
    'https://images.pexels.com/photos/1303099/pexels-photo-1303099.jpeg'
  ],
  easter: [
    'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg',
    'https://images.pexels.com/photos/1166210/pexels-photo-1166210.jpeg',
    'https://images.pexels.com/photos/1166211/pexels-photo-1166211.jpeg'
  ],
  cross: [
    'https://images.pexels.com/photos/208315/pexels-photo-208315.jpeg',
    'https://images.pexels.com/photos/208316/pexels-photo-208316.jpeg',
    'https://images.pexels.com/photos/208317/pexels-photo-208317.jpeg'
  ],
  nature: [
    '/lovable-uploads/4406f99e-d72a-4f6d-a175-aaaab81fef10.png',
    '/lovable-uploads/0f133377-3b6d-46eb-b884-1a1cf4a48e84.png',
    '/lovable-uploads/540b6a29-4c1a-4865-b334-47a17e619d98.png',
    '/lovable-uploads/ff982c31-779d-4c30-b5e3-074d1ade3b44.png'
  ]
};

// Picsum Photos for wallpapers with phone dimensions and themes
const PICSUM_WALLPAPER_CATEGORIES = {
  nature: [
    'https://picsum.photos/1080/1920?random=100&blur=1',
    'https://picsum.photos/1080/1920?random=101&blur=1',
    'https://picsum.photos/1080/1920?random=102&blur=1',
    'https://picsum.photos/1080/1920?random=103&blur=1',
    'https://picsum.photos/1080/1920?random=104&blur=1'
  ],
  peaceful: [
    'https://picsum.photos/1080/1920?random=110&blur=2',
    'https://picsum.photos/1080/1920?random=111&blur=2',
    'https://picsum.photos/1080/1920?random=112&blur=2',
    'https://picsum.photos/1080/1920?random=113&blur=2',
    'https://picsum.photos/1080/1920?random=114&blur=2'
  ],
  serene: [
    'https://picsum.photos/1080/1920?random=120&blur=1',
    'https://picsum.photos/1080/1920?random=121&blur=1',
    'https://picsum.photos/1080/1920?random=122&blur=1',
    'https://picsum.photos/1080/1920?random=123&blur=1',
    'https://picsum.photos/1080/1920?random=124&blur=1'
  ],
  warm: [
    'https://picsum.photos/1080/1920?random=130&blur=1',
    'https://picsum.photos/1080/1920?random=131&blur=1',
    'https://picsum.photos/1080/1920?random=132&blur=1',
    'https://picsum.photos/1080/1920?random=133&blur=1',
    'https://picsum.photos/1080/1920?random=134&blur=1'
  ],
  spring: [
    'https://picsum.photos/1080/1920?random=140&blur=1',
    'https://picsum.photos/1080/1920?random=141&blur=1',
    'https://picsum.photos/1080/1920?random=142&blur=1',
    'https://picsum.photos/1080/1920?random=143&blur=1',
    'https://picsum.photos/1080/1920?random=144&blur=1'
  ],
  summer: [
    'https://picsum.photos/1080/1920?random=150&blur=1',
    'https://picsum.photos/1080/1920?random=151&blur=1',
    'https://picsum.photos/1080/1920?random=152&blur=1',
    'https://picsum.photos/1080/1920?random=153&blur=1',
    'https://picsum.photos/1080/1920?random=154&blur=1'
  ],
  autumn: [
    'https://picsum.photos/1080/1920?random=160&blur=1',
    'https://picsum.photos/1080/1920?random=161&blur=1',
    'https://picsum.photos/1080/1920?random=162&blur=1',
    'https://picsum.photos/1080/1920?random=163&blur=1',
    'https://picsum.photos/1080/1920?random=164&blur=1'
  ],
  winter: [
    'https://picsum.photos/1080/1920?random=170&blur=1',
    'https://picsum.photos/1080/1920?random=171&blur=1',
    'https://picsum.photos/1080/1920?random=172&blur=1',
    'https://picsum.photos/1080/1920?random=173&blur=1',
    'https://picsum.photos/1080/1920?random=174&blur=1'
  ]
};

const SEASONAL_BACKGROUNDS = {
  spring: [
    'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg',
    'https://images.pexels.com/photos/56867/garden-rose-red-pink-56867.jpeg',
    'https://images.pexels.com/photos/56868/garden-rose-red-pink-56868.jpeg'
  ],
  summer: [
    'https://images.pexels.com/photos/158251/forest-the-sun-morning-tucholskie-158251.jpeg',
    'https://images.pexels.com/photos/158252/forest-the-sun-morning-tucholskie-158252.jpeg',
    'https://images.pexels.com/photos/158253/forest-the-sun-morning-tucholskie-158253.jpeg'
  ],
  autumn: [
    'https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg',
    'https://images.pexels.com/photos/33110/fall-autumn-red-season.jpg',
    'https://images.pexels.com/photos/33111/fall-autumn-red-season.jpg'
  ],
  winter: [
    'https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg',
    'https://images.pexels.com/photos/235622/pexels-photo-235622.jpeg',
    'https://images.pexels.com/photos/235623/pexels-photo-235623.jpeg'
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
  usePicsum?: boolean;
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

  private getThemeFromVerse(verse: BibleVerse): keyof typeof PICSUM_WALLPAPER_CATEGORIES {
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

  private getPicsumWallpaperBackground(verse: BibleVerse, category?: string): string {
    let theme: keyof typeof PICSUM_WALLPAPER_CATEGORIES;
    
    if (category && PICSUM_WALLPAPER_CATEGORIES[category as keyof typeof PICSUM_WALLPAPER_CATEGORIES]) {
      theme = category as keyof typeof PICSUM_WALLPAPER_CATEGORIES;
    } else {
      // Auto-select based on verse content or season
      if (category === 'auto' || !category) {
        const selectedCategory = this.selectCategoryBasedOnVerse(verse);
        if (PICSUM_WALLPAPER_CATEGORIES[selectedCategory as keyof typeof PICSUM_WALLPAPER_CATEGORIES]) {
          theme = selectedCategory as keyof typeof PICSUM_WALLPAPER_CATEGORIES;
        } else {
          theme = this.getThemeFromVerse(verse);
        }
      } else {
        theme = this.getThemeFromVerse(verse);
      }
    }
    
    const themeBackgrounds = PICSUM_WALLPAPER_CATEGORIES[theme];
    const randomIndex = Math.floor(Math.random() * themeBackgrounds.length);
    return themeBackgrounds[randomIndex];
  }

  async getWallpaperBackground(
    verse: BibleVerse, 
    options: WallpaperBackgroundOptions = { useAI: true, category: 'auto', usePicsum: true }
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
            console.warn('AI wallpaper generation failed due to billing issue. Using Picsum fallback background.');
          } else if (error.message.includes('401')) {
            console.warn('AI wallpaper generation failed due to invalid API key. Using Picsum fallback background.');
          } else if (error.message.includes('429')) {
            console.warn('AI wallpaper generation failed due to rate limiting. Using Picsum fallback background.');
          } else {
            console.warn('AI wallpaper generation failed:', error.message, 'Using Picsum fallback background.');
          }
        } else {
          console.warn('AI wallpaper generation failed with unknown error. Using Picsum fallback background.');
        }
      }
    }
    
    // Try Picsum Photos if enabled
    if (options.usePicsum !== false) {
      try {
        const picsumUrl = this.getPicsumWallpaperBackground(verse, options.category);
        console.log(`Using Picsum wallpaper background:`, picsumUrl, 'for verse:', verse.reference);
        return picsumUrl;
      } catch (error) {
        console.warn('Picsum Photos failed for wallpapers, falling back to categorized images:', error);
      }
    }
    
    // Determine category for fallback
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