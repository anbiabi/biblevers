
import { BibleVerse, gradients, bibleVerses } from "../data/bibleVerses";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export interface StickerProps {
  verse: BibleVerse;
  language: string;
  gradient: string;
}

export interface StickerSheetOptions {
  verses: BibleVerse[];
  language: string;
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
  // Access the verses from the bibleVerses array directly from the import
  const versesPool = [...bibleVerses];
  
  const availableVerses = selectedTopics.length 
    ? versesPool.filter(verse => 
        verse.topics.some(topic => selectedTopics.includes(topic))
      )
    : versesPool;

  // If we don't have enough verses for the selected topics, use all verses
  const versesToUse = availableVerses.length < count 
    ? [...availableVerses, ...versesPool.slice(0, count - availableVerses.length)]
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
      scale: 3, // Higher scale for better quality
      useCORS: true,
      logging: false,
      backgroundColor: "white",
    });

    // Convert canvas to an image and download it
    const imageUrl = canvas.toDataURL("image/png", 1.0);
    
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

export const generatePDF = async (
  elements: HTMLElement[],
  filename: string = "bible-stickers.pdf"
): Promise<void> => {
  try {
    // Create a new PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    
    // For each element (sheet)
    for (let i = 0; i < elements.length; i++) {
      // Add a new page for each sheet except the first one
      if (i > 0) {
        pdf.addPage();
      }
      
      // Convert the element to canvas
      const canvas = await html2canvas(elements[i], {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: "white",
      });
      
      // Add the canvas to the PDF
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData, "JPEG", 0, 0, 210, 297); // A4 size in mm
    }
    
    // Save the PDF
    pdf.save(filename);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};
