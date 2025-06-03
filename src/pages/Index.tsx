import React, { useState } from 'react';
import AISettingsPanel from '@/components/AISettingsPanel';
import BibleSheetGenerator from "@/components/BibleSheetGenerator";
import FaithCardSheet from "@/components/FaithCardSheet";
import StickerSheet from "@/components/StickerSheet";
import { useSheetGenerator } from "@/hooks/useSheetGenerator";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [showAISettings, setShowAISettings] = useState(false);
  const { 
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
  } = useSheetGenerator();
  const [numberOfSheets, setNumberOfSheets] = useState<number>(1);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [language, setLanguage] = useState<string>("english");
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const sheetRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  const handleTopicChange = (topic: string) => {
    setSelectedTopics((prevTopics) => {
      const isTopicSelected = prevTopics.includes(topic);
      let updatedTopics;
      if (isTopicSelected) {
        updatedTopics = prevTopics.filter((selectedTopic) => selectedTopic !== topic);
      } else {
        updatedTopics = [...prevTopics, topic];
      }
      updatePreviewVerse(updatedTopics);
      return updatedTopics;
    });
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const handleNumberOfSheetsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setNumberOfSheets(isNaN(value) ? 1 : Math.max(1, value));
  };

  const handleGenerate = () => {
    generateSheets(numberOfSheets, selectedTopics, () => {
      setShowPreview(true);
    });
  };

  const handleRefreshPreview = () => {
    refreshPreviewVerse(selectedTopics);
  };

  const handleDownload = () => {
    downloadSheets(sheetRefs);
  };

  const handleDownloadPDF = () => {
    downloadPDF(sheetRefs);
  };

  const renderSheets = () => {
    if (!showPreview) return null;

    return generatedSheets.map((verses, index) => (
      <div key={index} ref={(el) => (sheetRefs.current[index] = el)}>
        {generationType === 'stickers' ? (
          <StickerSheet 
            verses={verses} 
            language={language} 
            selectedTopics={selectedTopics}
          />
        ) : (
          <FaithCardSheet 
            verses={verses} 
            language={language}
            selectedTopics={selectedTopics}
          />
        )}
      </div>
    ));
  };

  return (
    <div className="min-h-screen relative">
      {/* AI Settings Panel */}
      <AISettingsPanel 
        isVisible={showAISettings} 
        onToggle={() => setShowAISettings(!showAISettings)} 
      />
      
      <div className="absolute top-4 left-4 z-50">
        <ModeToggle />
      </div>

      <div className="container py-12">
        <h1 className="text-3xl font-bold text-center mb-8">
          {generationType === 'stickers' ? 'Bible Sticker' : 'Faith Card'} Generator
        </h1>

        {!showPreview ? (
          <BibleSheetGenerator
            previewVerse={previewVerse}
            isGenerating={isGenerating}
            numberOfSheets={numberOfSheets}
            selectedTopics={selectedTopics}
            language={language}
            generationType={generationType}
            setGenerationType={setGenerationType}
            handleTopicChange={handleTopicChange}
            handleLanguageChange={handleLanguageChange}
            handleNumberOfSheetsChange={handleNumberOfSheetsChange}
            handleGenerate={handleGenerate}
            handleRefreshPreview={handleRefreshPreview}
          />
        ) : (
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <Link to="/" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/5 px-4 py-2 bg-muted hover:bg-muted/80">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Generator
              </Link>
            </div>
            <div className="flex justify-center mb-8">
              <Button onClick={handleDownload} disabled={isGenerating} className="mr-4">
                Download as PNG
              </Button>
              <Button onClick={handleDownloadPDF} disabled={isGenerating}>
                Download as PDF
              </Button>
            </div>
            {renderSheets()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
