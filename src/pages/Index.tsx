
import React, { useState, useRef, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Eye } from "lucide-react";
import { useSheetGenerator } from '@/hooks/useSheetGenerator';
import EditTab from '@/components/EditTab';
import PreviewTab from '@/components/PreviewTab';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

const Index = () => {
  // State for the generator settings
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [language, setLanguage] = useState<'english' | 'korean' | 'bilingual'>('english');
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
    updatePreviewVerse,
    refreshPreviewVerse,
    generateSheets,
    downloadSheets,
    handlePrint
  } = useSheetGenerator();

  // Update preview verse when topics or language change
  useEffect(() => {
    updatePreviewVerse(selectedTopics);
  }, [selectedTopics, language]);

  const handleGenerate = () => {
    generateSheets(numberOfSheets, selectedTopics, () => setActiveTab('preview'));
  };

  const handleRefreshPreview = () => {
    refreshPreviewVerse(selectedTopics);
  };

  const handleDownloadAll = () => {
    downloadSheets(sheetRefs);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <header className="py-6 md:py-12 px-4 md:px-6 text-center animate-fade-in">
        <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-2 font-comic">
          Bible Sticker Sheet Generator
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Create beautiful, printable Bible verse stickers for children. Select your topics,
          language, and customize your sheets.
        </p>
      </header>

      <main className="container px-4 lg:px-8 pb-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full animate-scale-in">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="edit" className="text-sm md:text-base">
              <FileText className="w-4 h-4 mr-2" />
              Edit Stickers
            </TabsTrigger>
            <TabsTrigger value="preview" className="text-sm md:text-base">
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
              isGenerating={isGenerating}
            />
          </TabsContent>

          <TabsContent value="preview">
            <PreviewTab 
              generatedSheets={generatedSheets}
              language={language}
              randomGradients={randomizeGradients}
              handleDownload={handleDownloadAll}
              handlePrint={handlePrint}
              setActiveTab={setActiveTab}
              sheetRefs={sheetRefs}
            />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        <p>Bible Sticker Sheet Generator</p>
        <p className="text-xs mt-1">Create beautiful customizable Bible verse stickers for children</p>
      </footer>
    </div>
  );
};

export default Index;
