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
  
  let availableVerses = selectedTopics.length 
    ? versesPool.filter(verse => 
        verse.topics.some(topic => selectedTopics.includes(topic))
      )
    : versesPool;

  // If we don't have enough verses for the selected topics, log a warning and use all verses
  if (availableVerses.length < count) {
    console.warn('Not enough verses for selected topics, including additional verses');
    availableVerses = versesPool;
  }

  // Shuffle verses while trying to maintain topic consistency
  const shuffled = [...availableVerses].sort(() => 0.5 - Math.random());
  
  // Try to prioritize verses that match multiple selected topics
  return shuffled
    .sort((a, b) => {
      const aTopicMatches = a.topics.filter(t => selectedTopics.includes(t)).length;
      const bTopicMatches = b.topics.filter(t => selectedTopics.includes(t)).length;
      return bTopicMatches - aTopicMatches;
    })
    .slice(0, count);
};

export const generateImage = async (
  element: HTMLElement,
  filename: string = "bible-stickers.png"
): Promise<void> => {
  try {
    // Create a copy of the element with proper positioning
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '0';
    tempContainer.style.top = '0';
    tempContainer.style.width = '210mm';
    tempContainer.style.height = '297mm';
    tempContainer.style.margin = '0';
    tempContainer.style.padding = '0';
    tempContainer.style.overflow = 'hidden';
    tempContainer.style.backgroundColor = 'white';
    
    // Clone the element for canvas rendering
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.position = 'relative';
    clone.style.margin = '0 auto';
    clone.style.left = '0';
    clone.style.right = '0';
    tempContainer.appendChild(clone);
    
    // Append to body temporarily (will be removed after)
    document.body.appendChild(tempContainer);
    
    // Create a canvas from the DOM element
    const canvas = await html2canvas(tempContainer, {
      scale: 3, // Higher scale for better quality
      useCORS: true,
      logging: false,
      backgroundColor: "white",
      width: 210 * 3.779528, // A4 width in pixels (at 96 DPI)
      height: 297 * 3.779528, // A4 height in pixels (at 96 DPI)
    });
    
    // Remove temporary container
    document.body.removeChild(tempContainer);

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
    // Create a new PDF with appropriate dimensions
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true
    });
    
    // For each element (sheet)
    for (let i = 0; i < elements.length; i++) {
      // Add a new page for each sheet except the first one
      if (i > 0) {
        pdf.addPage('a4', 'portrait');
      }
      
      // Create a temporary container for proper alignment
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '0';
      tempContainer.style.top = '0';
      tempContainer.style.width = '210mm';
      tempContainer.style.height = '297mm';
      tempContainer.style.margin = '0';
      tempContainer.style.padding = '0';
      tempContainer.style.overflow = 'hidden';
      tempContainer.style.backgroundColor = 'white';
      
      // Clone the element
      const clone = elements[i].cloneNode(true) as HTMLElement;
      clone.style.position = 'relative';
      clone.style.margin = '0 auto';
      clone.style.left = '0';
      clone.style.right = '0';
      tempContainer.appendChild(clone);
      
      // Append to body temporarily
      document.body.appendChild(tempContainer);
      
      // Convert the element to canvas
      const canvas = await html2canvas(tempContainer, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: "white",
        width: 210 * 3.779528, // A4 width in pixels
        height: 297 * 3.779528, // A4 height in pixels
      });
      
      // Remove temporary container
      document.body.removeChild(tempContainer);
      
      // Add the canvas to the PDF - ensure it's perfectly centered on A4
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
