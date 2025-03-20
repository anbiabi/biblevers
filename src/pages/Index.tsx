
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Download, FileText, Printer, Shuffle, Eye } from "lucide-react";
import TopicSelector from '@/components/TopicSelector';
import LanguageSelector from '@/components/LanguageSelector';
import StickerPreview from '@/components/StickerPreview';
import StickerSheet from '@/components/StickerSheet';
import { getRandomVerses, generatePDF } from '@/utils/pdfGenerator';
import { BibleVerse } from '@/data/bibleVerses';

// Import dependencies for PDF generation
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';

// Need to add this dependency
<lov-add-dependency>html2canvas@latest</lov-add-dependency>
<lov-add-dependency>jspdf@latest</lov-add-dependency>

const Index = () => {
  // State for the generator settings
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [language, setLanguage] = useState<'english' | 'korean' | 'bilingual'>('english');
  const [numberOfSheets, setNumberOfSheets] = useState<number>(1);
  const [randomizeGradients, setRandomizeGradients] = useState<boolean>(true);
  
  // Generated stickers state
  const [previewVerse, setPreviewVerse] = useState<BibleVerse | null>(null);
  const [generatedSheets, setGeneratedSheets] = useState<BibleVerse[][]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('edit');
  
  // References
  const sheetRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isMobile = useIsMobile();

  // Update preview verse when topics or language change
  useEffect(() => {
    if (selectedTopics.length > 0) {
      const randomVerses = getRandomVerses(1, selectedTopics);
      setPreviewVerse(randomVerses[0]);
    } else if (previewVerse === null) {
      const randomVerses = getRandomVerses(1);
      setPreviewVerse(randomVerses[0]);
    }
  }, [selectedTopics, language]);

  const handleGenerate = () => {
    setIsGenerating(true);
    
    try {
      // Generate verses for each sheet
      const sheets: BibleVerse[][] = [];
      
      for (let i = 0; i < numberOfSheets; i++) {
        const versesForSheet = getRandomVerses(16, selectedTopics);
        sheets.push(versesForSheet);
      }
      
      setGeneratedSheets(sheets);
      setActiveTab('preview');
      toast.success(`${numberOfSheets} sticker sheet${numberOfSheets > 1 ? 's' : ''} generated! Scroll down to see.`);
    } catch (error) {
      console.error("Error generating sheets:", error);
      toast.error("There was an error generating your sticker sheets.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadAll = async () => {
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
        // This is a simplified version - a more complex solution would merge PDFs
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

          <TabsContent value="edit" className="space-y-8 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <Card>
                  <CardContent className="pt-6">
                    <TopicSelector 
                      selectedTopics={selectedTopics} 
                      onChange={setSelectedTopics} 
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <LanguageSelector 
                      language={language} 
                      onChange={setLanguage} 
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Number of Sheets</h3>
                      <span className="font-medium text-blue-600">{numberOfSheets}</span>
                    </div>
                    
                    <div className="px-2">
                      <Slider
                        value={[numberOfSheets]}
                        min={1}
                        max={10}
                        step={1}
                        onValueChange={(values) => setNumberOfSheets(values[0])}
                      />
                    </div>
                    
                    <div className="pt-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="randomize-gradients"
                          checked={randomizeGradients}
                          onChange={(e) => setRandomizeGradients(e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                        <Label htmlFor="randomize-gradients">Randomize background colors</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-4">Preview</h3>
                    <StickerPreview verse={previewVerse} language={language} />
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => {
                        const randomVerses = getRandomVerses(1, selectedTopics);
                        setPreviewVerse(randomVerses[0]);
                      }}
                    >
                      <Shuffle className="w-4 h-4 mr-2" />
                      New Random Verse
                    </Button>
                  </CardContent>
                </Card>

                <Button 
                  className="w-full h-12 text-lg shadow-lg transition transform hover:scale-105 bg-gradient-to-r from-blue-600 to-indigo-600"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? "Generating..." : "Generate Sticker Sheets"}
                </Button>

                <p className="text-xs text-gray-500 text-center px-2">
                  Generates {numberOfSheets} sheet{numberOfSheets > 1 ? 's' : ''} with 16 stickers each,
                  sized for A4 paper.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="animate-fade-in">
            {generatedSheets.length > 0 ? (
              <div className="space-y-8">
                <Card className="w-full">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold">Your Sticker Sheets</h2>
                        <p className="text-sm text-gray-500">
                          {generatedSheets.length} sheet{generatedSheets.length > 1 ? 's' : ''} with {generatedSheets.length * 16} stickers total
                        </p>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          onClick={handlePrint}
                        >
                          <Printer className="w-4 h-4 mr-2" />
                          Print
                        </Button>
                        
                        <Button
                          onClick={handleDownloadAll}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-12">
                  {generatedSheets.map((verses, index) => (
                    <div key={index} className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Sheet {index + 1}
                      </h3>
                      
                      <div 
                        ref={(el) => sheetRefs.current[index] = el}
                        className="bg-white p-4 shadow-lg rounded-lg overflow-hidden"
                      >
                        <StickerSheet
                          verses={verses}
                          language={language}
                          randomGradients={randomizeGradients}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setActiveTab('edit')}
                >
                  Back to Editor
                </Button>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No sticker sheets generated yet</p>
                <Button onClick={() => setActiveTab('edit')}>
                  Go to Editor
                </Button>
              </div>
            )}
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
