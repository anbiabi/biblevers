import { BibleVerse } from '@/data/bibleVerses';

export interface OpenAIImageGenerationParams {
  verse: BibleVerse;
  style: 'serene' | 'nature' | 'peaceful';
  width?: number;
  height?: number;
}

export interface OpenAIGeneratedImageResult {
  imageUrl: string;
  prompt: string;
  timestamp: number;
}

export interface OpenAIError {
  code: number;
  message: string;
  type: 'auth' | 'billing' | 'rate_limit' | 'server' | 'unknown';
}

class OpenAIService {
  private apiKey: string | null = null;
  private cache: Map<string, OpenAIGeneratedImageResult> = new Map();

  setApiKey(key: string) {
    this.apiKey = key;
    localStorage.setItem('openai_api_key', key);
  }

  getApiKey(): string | null {
    if (!this.apiKey) {
      this.apiKey = localStorage.getItem('openai_api_key');
    }
    return this.apiKey;
  }

  private generateCacheKey(verse: BibleVerse, style: string): string {
    return `openai-${verse.reference}-${style}`;
  }

  private createPrompt(verse: BibleVerse, style: 'serene' | 'nature' | 'peaceful'): string {
    const text = verse.text.english.toLowerCase();
    const topics = verse.topics.map(t => t.toLowerCase());
    
    const basePrompts = {
      serene: "peaceful serene landscape with soft lighting and gentle colors",
      nature: "beautiful nature scene with mountains, forests, and soft sunlight",
      peaceful: "tranquil peaceful scene with soft pastels and gentle lighting"
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
    
    // Add theme-specific elements based on verse topics
    const primaryTopic = topics[0];
    if (primaryTopic && themePrompts[primaryTopic as keyof typeof themePrompts]) {
      prompt += `, ${themePrompts[primaryTopic as keyof typeof themePrompts]}`;
    }

    // Add emotional tone based on verse content
    if (text.includes('joy') || text.includes('rejoice')) {
      prompt += ", uplifting bright atmosphere, inspiring vista";
    } else if (text.includes('comfort') || text.includes('peace')) {
      prompt += ", warm comforting glow, safe haven, cozy atmosphere";
    } else if (text.includes('strength') || text.includes('power')) {
      prompt += ", powerful majestic scene, awe-inspiring landscape";
    }

    return `${prompt}, beautiful digital art, high quality, soft focus background suitable for text overlay, ethereal, spiritual, inspirational, 4k resolution`;
  }

  private parseApiError(status: number, responseText?: string): OpenAIError {
    switch (status) {
      case 401:
        return {
          code: 401,
          message: 'Invalid OpenAI API key. Please check your API key.',
          type: 'auth'
        };
      case 402:
      case 429:
        if (responseText?.includes('quota')) {
          return {
            code: 402,
            message: 'OpenAI quota exceeded. Please check your billing settings.',
            type: 'billing'
          };
        }
        return {
          code: 429,
          message: 'OpenAI rate limit exceeded. Please wait before making more requests.',
          type: 'rate_limit'
        };
      case 500:
      case 502:
      case 503:
        return {
          code: status,
          message: 'OpenAI service temporarily unavailable. Please try again later.',
          type: 'server'
        };
      default:
        return {
          code: status,
          message: `OpenAI API request failed with status ${status}. ${responseText || ''}`,
          type: 'unknown'
        };
    }
  }

  async generateImage(params: OpenAIImageGenerationParams): Promise<OpenAIGeneratedImageResult | null> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      console.warn('No OpenAI API key provided');
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
      
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: prompt,
          n: 1,
          size: params.width && params.height 
            ? (params.width > params.height ? '1792x1024' : '1024x1792')
            : '1024x1024',
          quality: 'standard',
          style: 'natural'
        }),
      });

      if (!response.ok) {
        const responseText = await response.text().catch(() => '');
        const error = this.parseApiError(response.status, responseText);
        
        throw new Error(`${error.message} (Status: ${error.code})`);
      }

      const data = await response.json();
      
      if (!data.data || !data.data[0] || !data.data[0].url) {
        throw new Error('Invalid response from OpenAI API');
      }

      const imageUrl = data.data[0].url;
      
      const result: OpenAIGeneratedImageResult = {
        imageUrl,
        prompt,
        timestamp: Date.now()
      };

      // Cache the result
      this.cache.set(cacheKey, result);
      
      return result;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error generating OpenAI image:', {
          message: error.message,
          verse: params.verse.reference,
          style: params.style
        });
      } else {
        console.error('Unknown error generating OpenAI image:', error);
      }
      return null;
    }
  }

  clearCache() {
    this.cache.clear();
  }
}

export const openAIService = new OpenAIService();