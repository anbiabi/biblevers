import { BibleVerse } from '@/data/bibleVerses';
import { analyzeVerse } from '@/utils/verseAnalyzer';
import { openAIService } from './OpenAIService';

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
  provider: 'huggingface' | 'openai';
}

export interface AIImageError {
  code: number;
  message: string;
  type: 'auth' | 'billing' | 'rate_limit' | 'server' | 'unknown';
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

  private parseApiError(status: number, responseText?: string): AIImageError {
    switch (status) {
      case 401:
        return {
          code: 401,
          message: 'Invalid API key. Please check your Hugging Face API key.',
          type: 'auth'
        };
      case 402:
        return {
          code: 402,
          message: 'Billing issue. Your Hugging Face account may need credits or an upgraded plan.',
          type: 'billing'
        };
      case 429:
        return {
          code: 429,
          message: 'Rate limit exceeded. Please wait before making more requests.',
          type: 'rate_limit'
        };
      case 500:
      case 502:
      case 503:
        return {
          code: status,
          message: 'Hugging Face service temporarily unavailable. Please try again later.',
          type: 'server'
        };
      default:
        return {
          code: status,
          message: `API request failed with status ${status}. ${responseText || ''}`,
          type: 'unknown'
        };
    }
  }

  async generateImage(params: AIImageGenerationParams): Promise<GeneratedImageResult | null> {
    const cacheKey = this.generateCacheKey(params.verse, params.style);
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)!;
      // Cache for 1 hour
      if (Date.now() - cached.timestamp < 3600000) {
        return cached;
      }
    }

    // Try OpenAI first if available
    const openAIKey = openAIService.getApiKey();
    if (openAIKey) {
      try {
        console.log('Attempting OpenAI image generation for:', params.verse.reference);
        const openAIResult = await openAIService.generateImage(params);
        
        if (openAIResult?.imageUrl) {
          const result: GeneratedImageResult = {
            imageUrl: openAIResult.imageUrl,
            prompt: openAIResult.prompt,
            timestamp: openAIResult.timestamp,
            provider: 'openai'
          };
          
          this.cache.set(cacheKey, result);
          console.log('Successfully generated OpenAI image for:', params.verse.reference);
          return result;
        }
      } catch (error) {
        console.warn('OpenAI generation failed, falling back to Hugging Face:', error);
      }
    }

    // Fallback to Hugging Face
    const huggingFaceKey = this.getApiKey();
    if (!huggingFaceKey) {
      console.warn('No Hugging Face API key provided');
      return null;
    }

    try {
      console.log('Attempting Hugging Face image generation for:', params.verse.reference);
      const prompt = this.createPrompt(params.verse, params.style);
      
      const response = await fetch('https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${huggingFaceKey}`,
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
        const responseText = await response.text().catch(() => '');
        const error = this.parseApiError(response.status, responseText);
        
        throw new Error(`${error.message} (Status: ${error.code})`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      
      const result: GeneratedImageResult = {
        imageUrl,
        prompt,
        timestamp: Date.now(),
        provider: 'huggingface'
      };

      this.cache.set(cacheKey, result);
      console.log('Successfully generated Hugging Face image for:', params.verse.reference);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error generating Hugging Face image:', {
          message: error.message,
          verse: params.verse.reference,
          style: params.style
        });
      } else {
        console.error('Unknown error generating Hugging Face image:', error);
      }
      return null;
    }
  }

  clearCache() {
    this.cache.clear();
  }
}

export const aiImageService = new AIImageService();