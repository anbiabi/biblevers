
import { BibleVerse, gradients } from "../data/bibleVerses";
import html2canvas from "html2canvas";

export interface StickerProps {
  verse: BibleVerse;
  language: "english" | "korean" | "bilingual";
  gradient: string;
}

export interface StickerSheetOptions {
  verses: BibleVerse[];
  language: "english" | "korean" | "bilingual";
  randomGradients?: boolean;
}

// Helper function to get random gradient
export const getRandomGradient = (): string => {
  return gradients[Math.floor(Math.random() * gradients.length)];
};

// Helper function to get random verses based on topics or completely random
export const getRandomVerses = (
  count: number,
  selectedTopics: string[] = []
): BibleVerse[] => {
  // Access the verses from the bibleVerses array in the imported file
  const bibleVerses = [...gradients.bibleVerses] as BibleVerse[];
  
  const availableVerses = selectedTopics.length 
    ? bibleVerses.filter(verse => 
        verse.topics.some(topic => selectedTopics.includes(topic))
      )
    : bibleVerses;

  // If we don't have enough verses for the selected topics, use all verses
  const versesToUse = availableVerses.length < count 
    ? [...availableVerses, ...bibleVerses.slice(0, count - availableVerses.length)]
    : availableVerses;

  // Shuffle and pick random verses
  const shuffled = [...versesToUse].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const generateImage = async (
  element: HTMLElement,
  filename: string = "bible-stickers.png"
): Promise<void> => {
  try {
    // Create a canvas from the DOM element
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      backgroundColor: "white",
    });

    // Convert canvas to an image and download it
    const imageUrl = canvas.toDataURL("image/png");
    
    // Create a link element to download the image
    const downloadLink = document.createElement("a");
    downloadLink.href = imageUrl;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};
