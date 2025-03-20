
import { jsPDF } from "jspdf";
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

export const generatePDF = async (
  element: HTMLElement,
  filename: string = "bible-stickers.pdf"
): Promise<void> => {
  try {
    // Create a canvas from the DOM element
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      backgroundColor: "white",
    });

    // Calculate the PDF dimensions (A4 is 210 x 297 mm)
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Add the image to the PDF (maintaining aspect ratio)
    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      210,
      297, // A4 dimensions
      undefined,
      "FAST"
    );

    // Save the PDF
    pdf.save(filename);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};
