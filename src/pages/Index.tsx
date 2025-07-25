import React, { useState, useRef, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Eye, Leaf, Cloud, Sun, Zap } from "lucide-react";
import { useSheetGenerator } from '@/hooks/useSheetGenerator';
import { useAuth } from '@/hooks/useAuth';
import EditTab from '@/components/EditTab';
import PreviewTab from '@/components/PreviewTab';
import UserMenu from '@/components/UserMenu';
import UsageLimitBanner from '@/components/UsageLimitBanner';
import AISettingsPanel from '@/components/AISettingsPanel';
import { backgroundService } from '@/services/BackgroundService';
import { wallpaperBackgroundService } from '@/services/WallpaperBackgroundService';
import { toast } from "sonner";
import AdSenseComponent from '@/components/AdSenseComponent';

export default function Index() {
  // Auth state
  const { user, incrementUsage, getRemainingUsage, canUseFeature, isAuthenticated } = useAuth();
  
  // State for the generator settings
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [language, setLanguage] = useState<string>('english');
  const [numberOfSheets, setNumberOfSheets] = useState<number>(1);
  const [randomizeGradients, setRandomizeGradients] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('edit');
  const [showAISettings, setShowAISettings] = useState<boolean>(false);
  
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

  // Preload fallback images on mount
  useEffect(() => {
    backgroundService.preloadFallbackImages();
    wallpaperBackgroundService.preloadWallpaperImages();
  }, []);

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
        toast.info('For faith cards, only 4 topics are allowed. Selection trimmed to first 4.');
      }
    }
  }, [generationType]);

  const checkUsageLimit = (): boolean => {
    if (!user || user.plan !== 'free') {
      return true; // Premium users have no limits
    }
    
    const remaining = getRemainingUsage();
    if (remaining <= 0) {
      toast.error('Daily limit reached! Upgrade to Premium for unlimited creations.');
      return false;
    }
    
    return incrementUsage();
  };

  const handleGenerate = () => {
    if (!checkUsageLimit()) return;
    
    // Pass 'stickers' type to the hook
    setGenerationType('stickers');
    generateSheets(numberOfSheets, selectedTopics, () => setActiveTab('preview'));
  };

  const handleGenerateCards = () => {
    if (!checkUsageLimit()) return;
    
    // Pass 'cards' type to the hook
    setGenerationType('cards');
    generateSheets(numberOfSheets, selectedTopics, () => setActiveTab('preview'));
  };

  const handleGenerateWallpapers = () => {
    if (!checkUsageLimit()) return;
    
    // Pass 'wallpapers' type to the hook
    setGenerationType('wallpapers');
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
    switch (generationType) {
      case 'stickers': return 'Bible Sticker Sheet Generator';
      case 'cards': return 'Bible Faith Card Generator';
      case 'wallpapers': return 'Bible Verse Wallpaper Generator';
      default: return 'Bible Sticker Sheet Generator';
    }
  };

  const getPageDescription = () => {
    switch (generationType) {
      case 'stickers': 
        return 'Create beautiful, printable Bible verse stickers for children. Select your topics, language, and customize your sheets.';
      case 'cards':
        return 'Create inspiring faith declaration cards with Bible verses. Great for encouragement, comfort, and spiritual reflection.';
      case 'wallpapers':
        return 'Create beautiful daily Bible verse wallpapers for your phone. Perfect for daily inspiration and spiritual reminders.';
      default:
        return 'Create beautiful, printable Bible verse stickers for children. Select your topics, language, and customize your sheets.';
    }
  };

  return (
    <div className="min-h-screen safari-theme-bg">
      {/* AI Settings Panel */}
      <AISettingsPanel 
        isVisible={showAISettings} 
        onToggle={() => setShowAISettings(!showAISettings)} 
      />

      {/* Top decorative elements */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-20 w-full">
          <path 
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
            className="fill-amber-300"
          ></path>
        </svg>
      </div>
      <Cloud className="absolute top-16 left-1/4 text-white opacity-70 w-16 h-16" />
      <Cloud className="absolute top-24 right-1/4 text-white opacity-50 w-12 h-12" />
      <Sun className="absolute top-12 right-10 text-yellow-400 w-20 h-20" />
      
      <header className="py-8 md:py-16 px-4 md:px-6 text-center animate-fade-in relative z-10">
        {/* User Menu */}
        <div className="absolute top-4 right-4">
          <UserMenu />
        </div>
        
        <Leaf className="inline-block text-orange-500 w-8 h-8 mr-2 animate-bounce" />
        <h1 className="text-3xl md:text-5xl font-bold text-amber-800 mb-2 font-comic">
          {getPageTitle()}
        </h1>
        <p className="text-amber-700 max-w-2xl mx-auto font-comic">
          {getPageDescription()}
        </p>
        
        {!isAuthenticated && generationType !== 'wallpapers' && (
          <div className="mt-4 bg-amber-100 border border-amber-300 rounded-lg p-3 max-w-md mx-auto">
            <p className="text-amber-800 text-sm">
              <strong>Note:</strong> You're using the app as a guest. 
              <span className="font-bold"> Login to download {generationType}.</span>
            </p>
          </div>
        )}
      </header>

      <main className="container px-4 lg:px-8 pb-12 relative z-10">
        {/* Usage Limit Banner */}
        <UsageLimitBanner />
        
        {/* AdSense Ad - Top of App */}
        <div className="mb-8 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-4">
          <div className="min-h-[90px] flex items-center justify-center">
            <AdSenseComponent />
          </div>
        </div>
        
        {/* Content area - IMPORTANT: Wrapping all content in Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full animate-scale-in">
          <div className="mb-8">
            {/* TabsContent components are now properly nested within Tabs */}
            <TabsContent value="edit" className="animate-fade-in mb-8">
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
                handleGenerateWallpapers={handleGenerateWallpapers}
                isGenerating={isGenerating}
                generationType={generationType}
                setGenerationType={setGenerationType}
              />
            </TabsContent>

            <TabsContent value="preview" className="animate-fade-in mb-8">
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
          </div>
          
          {/* AdSense Ad - Bottom of App */}
          <div className="mt-8 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-4">
            <div className="min-h-[250px] flex items-center justify-center">
              <AdSenseComponent adFormat="rectangle" />
            </div>
          </div>
          
          {/* Tabs navigation moved to the bottom */}
          <TabsList className="grid w-full grid-cols-2 bg-orange-100 border-2 border-orange-200 mt-8">
            <TabsTrigger value="edit" className="text-sm md:text-base font-comic data-[state=active]:bg-orange-200 data-[state=active]:text-orange-800">
              <FileText className="w-4 h-4 mr-2" />
              Edit Content
            </TabsTrigger>
            <TabsTrigger value="preview" className="text-sm md:text-base font-comic data-[state=active]:bg-orange-200 data-[state=active]:text-orange-800">
              <Eye className="w-4 h-4 mr-2" />
              Preview & Print
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-amber-100 border-t-2 border-amber-200 py-6 text-center text-sm text-amber-700 font-comic relative z-10">
        <p>Bible {generationType === 'stickers' ? 'Sticker Sheet' : generationType === 'cards' ? 'Faith Card' : 'Verse Wallpaper'} Generator</p>
        <p className="text-xs mt-1">Create beautiful customizable Bible verse {generationType === 'stickers' ? 'stickers for children' : generationType === 'cards' ? 'declaration cards' : 'phone wallpapers'}</p>
        <div className="absolute bottom-0 right-0">
          <Leaf className="text-amber-400 w-12 h-12 transform -rotate-45" />
        </div>
        <div className="absolute bottom-6 left-6">
          <Zap className="text-orange-400 w-8 h-8" />
        </div>
      </footer>
    </div>
  );
}