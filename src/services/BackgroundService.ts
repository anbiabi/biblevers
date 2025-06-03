
import { BibleVerse } from '@/data/bibleVerses';
import { VerseAnalyzer } from '@/utils/verseAnalyzer';
import { AIImageService } from './AIImageService';

// Reference images as fallback backgrounds
export const REFERENCE_BACKGROUNDS = [
  '/lovable-uploads/0f133377-3b6d-46eb-b884-1a1cf4a48e84.png', // Cats in forest scene
  '/lovable-uploads/540b6a29-4c1a-4865-b334-47a17e619d98.png', // Angels in garden
  '/lovable-uploads/ff982c31-779d-4c30-b5e3-074d1ade3b44.png', // Animal stickers pattern
  '/lovable-uploads/4406f99e-d72a-4f6d-a175-aaaab81fef10.png'  // French card sample
];

export interface BackgroundResult {
  backgroundImage: string;
  isAIGenerated: boolean;
  prompt?: string;
}

export class BackgroundService {
  private static instance: BackgroundService;
  private aiService: AIImageService;

  private constructor() {
    this.aiService = AIImageService.getInstance();
  }

  static getInstance(): BackgroundService {
    if (!BackgroundService.instance) {
      BackgroundService.instance = new BackgroundService();
    }
    return BackgroundService.instance;
  }

  async generateCardBackground(verse: BibleVerse): Promise<BackgroundResult> {
    const analysis = VerseAnalyzer.analyzeVerse(verse);
    
    try {
      const aiImage = await this.aiService.generateImage({
        prompt: analysis.imagePrompt,
        width: 400,
        height: 600
      });

      if (aiImage) {
        return {
          backgroundImage: `url('${aiImage.url}')`,
          isAIGenerated: true,
          prompt: aiImage.prompt
        };
      }
    } catch (error) {
      console.error('AI generation failed:', error);
    }

    // Fallback to reference images
    const randomBg = this.getRandomReferenceBackground();
    return {
      backgroundImage: `url('${randomBg}')`,
      isAIGenerated: false
    };
  }

  async generateStickerBackground(verses: BibleVerse[]): Promise<BackgroundResult> {
    if (verses.length === 0) return this.getFallbackBackground();

    const analysis = VerseAnalyzer.analyzeVerse(verses[0]);
    
    try {
      const aiImage = await this.aiService.generateImage({
        prompt: analysis.stickerPrompt,
        width: 800,
        height: 1200
      });

      if (aiImage) {
        return {
          backgroundImage: `url('${aiImage.url}')`,
          isAIGenerated: true,
          prompt: aiImage.prompt
        };
      }
    } catch (error) {
      console.error('AI generation failed:', error);
    }

    return this.getFallbackBackground();
  }

  private getRandomReferenceBackground(): string {
    const cardBackgrounds = REFERENCE_BACKGROUNDS.slice(0, 2); // First two images for cards
    return cardBackgrounds[Math.floor(Math.random() * cardBackgrounds.length)];
  }

  private getFallbackBackground(): BackgroundResult {
    const randomBg = this.getRandomReferenceBackground();
    return {
      backgroundImage: `url('${randomBg}')`,
      isAIGenerated: false
    };
  }
}
