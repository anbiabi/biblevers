import { useState } from 'react';
import { toast } from "sonner";
import { BibleVerse } from '@/data/bibleVerses';
import { getRandomVerses, generateImage, generatePDF } from '@/utils/imageGenerator';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const useSheetGenerator = () => {
  const [previewVerse, setPreviewVerse] = useState<BibleVerse | null>(null);
  const [generatedSheets, setGeneratedSheets] = useState<BibleVerse[][]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationType, setGenerationType] = useState<'stickers' | 'cards' | 'wallpapers'>('stickers');
  
  const { isAuthenticated, incrementDownloadCount, shouldShowContributionPrompt } = useAuth();
  const navigate = useNavigate();

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
        // For stickers, we need 16 verses per sheet, for cards we need 4, for wallpapers we need 1
        let versesPerSheet: number;
        switch (generationType) {
          case 'stickers':
            versesPerSheet = 16;
            break;
          case 'cards':
            versesPerSheet = 4;
            break;
          case 'wallpapers':
            versesPerSheet = 1;
            break;
          default:
            versesPerSheet = 16;
        }
        
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
    
    // Check if user is authenticated for stickers and cards
    if ((generationType === 'stickers' || generationType === 'cards') && !isAuthenticated) {
      toast.error("Login required to download this content", {
        description: "Please sign in to download stickers and faith cards",
        action: {
          label: "Login",
          onClick: () => navigate('/login')
        }
      });
      return;
    }
    
    try {
      toast.info("Preparing your PNG images. This might take a moment...");
      
      // If we have multiple sheets, create separate images
      for (let i = 0; i < generatedSheets.length; i++) {
        if (sheetRefs.current[i]) {
          let filename: string;
          switch (generationType) {
            case 'stickers':
              filename = `bible-stickers-sheet-${i+1}.png`;
              break;
            case 'cards':
              filename = `faith-cards-sheet-${i+1}.png`;
              break;
            case 'wallpapers':
              filename = `bible-wallpaper-${i+1}.png`;
              break;
            default:
              filename = `bible-sheet-${i+1}.png`;
          }
          await generateImage(sheetRefs.current[i], filename);
        }
      }
      
      // Track download for authenticated users
      if (isAuthenticated) {
        incrementDownloadCount(generationType);
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
    
    // Check if user is authenticated for stickers and cards
    if ((generationType === 'stickers' || generationType === 'cards') && !isAuthenticated) {
      toast.error("Login required to download this content", {
        description: "Please sign in to download stickers and faith cards",
        action: {
          label: "Login",
          onClick: () => navigate('/login')
        }
      });
      return;
    }
    
    try {
      toast.info("Preparing your PDF. This might take a moment...");
      
      // Collect all valid sheet elements
      const elements = sheetRefs.current.filter(ref => ref !== null) as HTMLDivElement[];
      
      if (elements.length > 0) {
        let filename: string;
        switch (generationType) {
          case 'stickers':
            filename = "bible-stickers.pdf";
            break;
          case 'cards':
            filename = "faith-cards.pdf";
            break;
          case 'wallpapers':
            filename = "bible-wallpapers.pdf";
            break;
          default:
            filename = "bible-sheets.pdf";
        }
        await generatePDF(elements, filename);
        
        // Track download for authenticated users
        if (isAuthenticated) {
          incrementDownloadCount(generationType);
        }
        
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