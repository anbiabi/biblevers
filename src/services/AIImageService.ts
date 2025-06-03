
import { BibleVerse } from '@/data/bibleVerses';
import { analyzeVerse } from '@/utils/verseAnalyzer';

export interface AIImageGenerationParams {
  verse: BibleVerse;
  style: 'serene' | 'nature' | 'peaceful';
  width?: number;
  height?: number;
}

export interface GeneratedImageResult {
  imageUrl: string;
  prompt: string;
  timestamp: number;
}

class AIImageService {
  private apiKey: string | null = null;
  private cache: Map<string, GeneratedImageResult> = new Map();

  setApiKey(key: string) {
    this.apiKey = key;
    localStorage.setItem('huggingface_api_key', key);
  }

  getApiKey(): string | null {
    if (!this.apiKey) {
      this.apiKey = localStorage.getItem('huggingface_api_key');
    }
    return this.apiKey;
  }

  private generateCacheKey(verse: BibleVerse, style: string): string {
    return `${verse.reference}-${style}`;
  }

  private createPrompt(verse: BibleVerse, style: 'serene' | 'nature' | 'peaceful'): string {
    const analysis = analyzeVerse(verse);
    
    const basePrompts = {
      serene: "peaceful serene landscape, soft lighting, gentle colors, calming atmosphere",
      nature: "beautiful nature scene, mountains, forests, soft sunlight, peaceful wildlife",
      peaceful: "tranquil peaceful scene, soft pastels, gentle lighting, harmonious composition"
    };

    const themePrompts = {
      love: "warm golden light, heart-shaped elements, roses, soft pink and gold tones",
      faith: "mountain peaks, solid rock formations, sunrise, strong foundations",
      hope: "sunrise, dawn breaking, bright horizon, golden light piercing clouds",
      peace: "still waters, gentle streams, dove, olive branch, soft blue tones",
      strength: "mighty mountains, oak trees, strong foundations, uplifting light",
      comfort: "gentle embrace of light, soft blanket of clouds, warm hearth",
      joy: "bright flowers, rainbow, dancing light, vibrant but soft colors",
      grace: "waterfall, flowing water, gentle rain, cleansing light",
      wisdom: "ancient trees, owl, open book, soft golden light",
      forgiveness: "new dawn, clean slate, fresh snow, pure white light"
    };

    let prompt = basePrompts[style];
    
    // Add theme-specific elements
    const primaryTheme = analysis.primaryTheme.toLowerCase();
    if (themePrompts[primaryTheme as keyof typeof themePrompts]) {
      prompt += `, ${themePrompts[primaryTheme as keyof typeof themePrompts]}`;
    }

    // Add emotional tone
    if (analysis.emotionalTone === 'uplifting') {
      prompt += ", uplifting bright atmosphere, inspiring vista";
    } else if (analysis.emotionalTone === 'comforting') {
      prompt += ", warm comforting glow, safe haven, cozy atmosphere";
    } else if (analysis.emotionalTone === 'peaceful') {
      prompt += ", deeply peaceful, meditative, zen-like tranquility";
    }

    return `${prompt}, beautiful digital art, high quality, soft focus background for text overlay, ethereal, spiritual, inspirational, 4k`;
  }

  async generateImage(params: AIImageGenerationParams): Promise<GeneratedImageResult | null> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      console.warn('No Hugging Face API key provided');
      return null;
    }

    const cacheKey = this.generateCacheKey(params.verse, params.style);
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)!;
      // Cache for 1 hour
      if (Date.now() - cached.timestamp < 3600000) {
        return cached;
      }
    }

    try {
      const prompt = this.createPrompt(params.verse, params.style);
      
      const response = await fetch('https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            width: params.width || 512,
            height: params.height || 768,
            num_inference_steps: 20,
            guidance_scale: 7.5
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      
      const result: GeneratedImageResult = {
        imageUrl,
        prompt,
        timestamp: Date.now()
      };

      // Cache the result
      this.cache.set(cacheKey, result);
      
      return result;
    } catch (error) {
      console.error('Error generating AI image:', error);
      return null;
    }
  }

  clearCache() {
    this.cache.clear();
  }
}

export const aiImageService = new AIImageService();
