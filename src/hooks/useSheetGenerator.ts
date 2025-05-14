
import { useState } from 'react';
import { toast } from "sonner";
import { BibleVerse } from '@/data/bibleVerses';
import { getRandomVerses, generateImage, generatePDF } from '@/utils/imageGenerator';

export const useSheetGenerator = () => {
  const [previewVerse, setPreviewVerse] = useState<BibleVerse | null>(null);
  const [generatedSheets, setGeneratedSheets] = useState<BibleVerse[][]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationType, setGenerationType] = useState<'stickers' | 'cards'>('stickers');

  const updatePreviewVerse = (selectedTopics: string[]) => {
    if (selectedTopics.length > 0) {
      const randomVerses = getRandomVerses(1, selectedTopics);
      setPreviewVerse(randomVerses[0]);
    } else if (previewVerse === null) {
      const randomVerses = getRandomVerses(1);
      setPreviewVerse(randomVerses[0]);
    }
  };

  const refreshPreviewVerse = (selectedTopics: string[]) => {
    const randomVerses = getRandomVerses(1, selectedTopics);
    setPreviewVerse(randomVerses[0]);
  };

  const generateSheets = (numberOfSheets: number, selectedTopics: string[], callback: () => void) => {
    setIsGenerating(true);
    
    try {
      // Generate verses for each sheet
      const sheets: BibleVerse[][] = [];
      
      for (let i = 0; i < numberOfSheets; i++) {
        // For stickers, we need 16 verses per sheet, for cards we need 4
        const versesPerSheet = generationType === 'stickers' ? 16 : 4;
        const versesForSheet = getRandomVerses(versesPerSheet, selectedTopics);
        sheets.push(versesForSheet);
      }
      
      setGeneratedSheets(sheets);
      callback(); // Call the callback (usually to navigate to preview)
      toast.success(`${numberOfSheets} ${generationType} sheet${numberOfSheets > 1 ? 's' : ''} generated! Scroll down to see.`);
    } catch (error) {
      console.error(`Error generating ${generationType}:`, error);
      toast.error(`There was an error generating your ${generationType}.`);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadSheets = async (sheetRefs: React.MutableRefObject<(HTMLDivElement | null)[]>) => {
    if (generatedSheets.length === 0) {
      toast.error(`No ${generationType} to download. Generate some first!`);
      return;
    }
    
    try {
      toast.info("Preparing your PNG images. This might take a moment...");
      
      // If we have multiple sheets, create separate images
      for (let i = 0; i < generatedSheets.length; i++) {
        if (sheetRefs.current[i]) {
          const filename = generationType === 'stickers' 
            ? `bible-stickers-sheet-${i+1}.png`
            : `faith-cards-sheet-${i+1}.png`;
          await generateImage(sheetRefs.current[i], filename);
        }
      }
      
      toast.success("PNG image download ready!");
    } catch (error) {
      console.error("Error downloading image:", error);
      toast.error("There was an error creating your image.");
    }
  };

  const downloadPDF = async (sheetRefs: React.MutableRefObject<(HTMLDivElement | null)[]>) => {
    if (generatedSheets.length === 0) {
      toast.error(`No ${generationType} to download. Generate some first!`);
      return;
    }
    
    try {
      toast.info("Preparing your PDF. This might take a moment...");
      
      // Collect all valid sheet elements
      const elements = sheetRefs.current.filter(ref => ref !== null) as HTMLDivElement[];
      
      if (elements.length > 0) {
        const filename = generationType === 'stickers' 
          ? "bible-stickers.pdf"
          : "faith-cards.pdf";
        await generatePDF(elements, filename);
        toast.success("PDF download ready!");
      } else {
        toast.error("Could not find sheet elements to convert to PDF.");
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast.error("There was an error creating your PDF.");
    }
  };

  return {
    previewVerse,
    generatedSheets,
    isGenerating,
    generationType,
    setGenerationType,
    updatePreviewVerse,
    refreshPreviewVerse,
    generateSheets,
    downloadSheets,
    downloadPDF
  };
};
