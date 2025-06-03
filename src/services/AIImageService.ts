
import { toast } from "sonner";

export interface AIImageParams {
  prompt: string;
  width?: number;
  height?: number;
  model?: string;
}

export interface GeneratedImage {
  url: string;
  prompt: string;
}

export class AIImageService {
  private static instance: AIImageService;
  private apiKey: string | null = null;
  private cache: Map<string, string> = new Map();

  private constructor() {}

  static getInstance(): AIImageService {
    if (!AIImageService.instance) {
      AIImageService.instance = new AIImageService();
    }
    return AIImageService.instance;
  }

  setApiKey(key: string) {
    this.apiKey = key;
  }

  async generateImage(params: AIImageParams): Promise<GeneratedImage | null> {
    if (!this.apiKey) {
      console.warn('No API key set for AI image generation');
      return null;
    }

    const cacheKey = `${params.prompt}_${params.width}_${params.height}`;
    if (this.cache.has(cacheKey)) {
      return {
        url: this.cache.get(cacheKey)!,
        prompt: params.prompt
      };
    }

    try {
      const response = await fetch('https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: params.prompt,
          parameters: {
            width: params.width || 512,
            height: params.height || 512,
            num_inference_steps: 20,
            guidance_scale: 7.5
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      
      this.cache.set(cacheKey, imageUrl);
      
      return {
        url: imageUrl,
        prompt: params.prompt
      };
    } catch (error) {
      console.error('Error generating AI image:', error);
      toast.error('Failed to generate AI background. Using default background.');
      return null;
    }
  }
}
