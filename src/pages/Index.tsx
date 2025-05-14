
import React, { useState, useRef, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Eye, Leaf, Cloud, Sun } from "lucide-react";
import { useSheetGenerator } from '@/hooks/useSheetGenerator';
import EditTab from '@/components/EditTab';
import PreviewTab from '@/components/PreviewTab';

const Index = () => {
  // State for the generator settings
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [language, setLanguage] = useState<string>('english');
  const [numberOfSheets, setNumberOfSheets] = useState<number>(1);
  const [randomizeGradients, setRandomizeGradients] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('edit');
  
  // References
  const sheetRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Use our custom hook for sheet generation logic
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

  // Update preview verse when topics or language change
  useEffect(() => {
    updatePreviewVerse(selectedTopics);
  }, [selectedTopics, language]);

  // When generation type changes, ensure we have exactly 4 topics for cards
  useEffect(() => {
    if (generationType === 'cards' && selectedTopics.length !== 4) {
      // If we have more than 4, trim to 4
      if (selectedTopics.length > 4) {
        setSelectedTopics(selectedTopics.slice(0, 4));
      }
    }
  }, [generationType]);

  const handleGenerate = () => {
    // Pass 'stickers' type to the hook
    setGenerationType('stickers');
    generateSheets(numberOfSheets, selectedTopics, () => setActiveTab('preview'));
  };

  const handleGenerateCards = () => {
    // Pass 'cards' type to the hook
    setGenerationType('cards');
    generateSheets(numberOfSheets, selectedTopics, () => setActiveTab('preview'));
  };

  const handleRefreshPreview = () => {
    refreshPreviewVerse(selectedTopics);
  };

  const handleDownloadAll = () => {
    downloadSheets(sheetRefs);
  };

  const handlePdfDownload = () => {
    downloadPDF(sheetRefs);
  };

  const getPageTitle = () => {
    return generationType === 'stickers' 
      ? 'Bible Sticker Sheet Generator'
      : 'Bible Faith Card Generator';
  };

  const getPageDescription = () => {
    return generationType === 'stickers'
      ? 'Create beautiful, printable Bible verse stickers for children. Select your topics, language, and customize your sheets.'
      : 'Create inspiring faith declaration cards with Bible verses. Great for encouragement, comfort, and spiritual reflection.';
  };

  return (
    <div className="min-h-screen kids-theme-bg">
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-20 w-full">
          <path 
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
            className="fill-green-200"
          ></path>
        </svg>
      </div>
      <Cloud className="absolute top-16 left-1/4 text-white opacity-70 w-16 h-16" />
      <Cloud className="absolute top-24 right-1/4 text-white opacity-50 w-12 h-12" />
      <Sun className="absolute top-12 right-10 text-yellow-200 w-20 h-20" />
      
      <header className="py-8 md:py-16 px-4 md:px-6 text-center animate-fade-in relative z-10">
        <Leaf className="inline-block text-green-500 w-8 h-8 mr-2 animate-bounce" />
        <h1 className="text-3xl md:text-5xl font-bold text-green-800 mb-2 font-comic">
          {getPageTitle()}
        </h1>
        <p className="text-green-700 max-w-2xl mx-auto font-comic">
          {getPageDescription()}
        </p>
      </header>

      <main className="container px-4 lg:px-8 pb-12 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full animate-scale-in">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-green-100 border-2 border-green-200">
            <TabsTrigger value="edit" className="text-sm md:text-base font-comic data-[state=active]:bg-green-200 data-[state=active]:text-green-800">
              <FileText className="w-4 h-4 mr-2" />
              Edit Content
            </TabsTrigger>
            <TabsTrigger value="preview" className="text-sm md:text-base font-comic data-[state=active]:bg-green-200 data-[state=active]:text-green-800">
              <Eye className="w-4 h-4 mr-2" />
              Preview & Download
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit">
            <EditTab 
              selectedTopics={selectedTopics}
              setSelectedTopics={setSelectedTopics}
              language={language}
              setLanguage={setLanguage}
              numberOfSheets={numberOfSheets}
              setNumberOfSheets={setNumberOfSheets}
              randomizeGradients={randomizeGradients}
              setRandomizeGradients={setRandomizeGradients}
              previewVerse={previewVerse}
              refreshPreviewVerse={handleRefreshPreview}
              handleGenerate={handleGenerate}
              handleGenerateCards={handleGenerateCards}
              isGenerating={isGenerating}
              generationType={generationType}
              setGenerationType={setGenerationType}
            />
          </TabsContent>

          <TabsContent value="preview">
            <PreviewTab 
              generatedSheets={generatedSheets}
              language={language}
              randomGradients={randomizeGradients}
              handleDownload={handleDownloadAll}
              handlePdfDownload={handlePdfDownload}
              setActiveTab={setActiveTab}
              sheetRefs={sheetRefs}
              selectedTopics={selectedTopics}
              generationType={generationType}
            />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-green-100 border-t-2 border-green-200 py-6 text-center text-sm text-green-700 font-comic relative z-10">
        <p>Bible {generationType === 'stickers' ? 'Sticker Sheet' : 'Faith Card'} Generator</p>
        <p className="text-xs mt-1">Create beautiful customizable Bible verse {generationType === 'stickers' ? 'stickers for children' : 'declaration cards'}</p>
        <div className="absolute bottom-0 right-0">
          <Leaf className="text-green-400 w-12 h-12 transform -rotate-45" />
        </div>
      </footer>
    </div>
  );
};

export default Index;
