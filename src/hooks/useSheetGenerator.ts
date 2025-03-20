
import { useState } from 'react';
import { toast } from "sonner";
import { BibleVerse } from '@/data/bibleVerses';
import { getRandomVerses, generatePDF } from '@/utils/pdfGenerator';

export const useSheetGenerator = () => {
  const [previewVerse, setPreviewVerse] = useState<BibleVerse | null>(null);
  const [generatedSheets, setGeneratedSheets] = useState<BibleVerse[][]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

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
        const versesForSheet = getRandomVerses(16, selectedTopics);
        sheets.push(versesForSheet);
      }
      
      setGeneratedSheets(sheets);
      callback(); // Call the callback (usually to navigate to preview)
      toast.success(`${numberOfSheets} sticker sheet${numberOfSheets > 1 ? 's' : ''} generated! Scroll down to see.`);
    } catch (error) {
      console.error("Error generating sheets:", error);
      toast.error("There was an error generating your sticker sheets.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadSheets = async (sheetRefs: React.MutableRefObject<(HTMLDivElement | null)[]>) => {
    if (generatedSheets.length === 0) {
      toast.error("No sticker sheets to download. Generate some first!");
      return;
    }
    
    try {
      toast.info("Preparing your PDF. This might take a moment...");
      
      // If we have multiple sheets, merge them into one PDF
      if (generatedSheets.length === 1 && sheetRefs.current[0]) {
        await generatePDF(sheetRefs.current[0], "bible-stickers.pdf");
      } else {
        // For multiple sheets, download each as a separate PDF
        for (let i = 0; i < generatedSheets.length; i++) {
          if (sheetRefs.current[i]) {
            await generatePDF(sheetRefs.current[i], `bible-stickers-sheet-${i+1}.pdf`);
          }
        }
      }
      
      toast.success("PDF download ready!");
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast.error("There was an error creating your PDF.");
    }
  };

  const handlePrint = () => {
    if (generatedSheets.length === 0) {
      toast.error("No sticker sheets to print. Generate some first!");
      return;
    }
    
    window.print();
  };

  return {
    previewVerse,
    generatedSheets,
    isGenerating,
    updatePreviewVerse,
    refreshPreviewVerse,
    generateSheets,
    downloadSheets,
    handlePrint
  };
};
