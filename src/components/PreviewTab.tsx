import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Printer, FileText, Leaf } from "lucide-react";
import StickerSheet from '@/components/StickerSheet';
import FaithCardSheet from '@/components/FaithCardSheet';
import WallpaperSheet from '@/components/WallpaperSheet';
import { BibleVerse } from '@/data/bibleVerses';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import ContributionModal from '@/components/ContributionModal';
import { toast } from "sonner";

interface PreviewTabProps {
  generatedSheets: BibleVerse[][];
  language: string;
  randomGradients: boolean;
  handleDownload: () => void;
  handlePdfDownload: () => void;
  setActiveTab: (tab: string) => void;
  sheetRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  selectedTopics: string[];
  generationType: 'stickers' | 'cards' | 'wallpapers';
}

const PreviewTab: React.FC<PreviewTabProps> = ({
  generatedSheets,
  language,
  randomGradients,
  handleDownload,
  handlePdfDownload,
  setActiveTab,
  sheetRefs,
  selectedTopics,
  generationType
}) => {
  const { isAuthenticated, shouldShowContributionPrompt, incrementDownloadCount } = useAuth();
  const navigate = useNavigate();
  const [showContributionModal, setShowContributionModal] = useState(false);

  if (generatedSheets.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <p className="text-amber-600 mb-4 font-comic">No {generationType} generated yet</p>
        <Button onClick={() => setActiveTab('edit')} className="bg-amber-600 hover:bg-amber-700 font-comic">
          <Leaf className="w-4 h-4 mr-2" />
          Go to Editor
        </Button>
      </div>
    );
  }

  const getTypeDisplayName = () => {
    switch (generationType) {
      case 'stickers': return 'Sticker Sheets';
      case 'cards': return 'Faith Cards';
      case 'wallpapers': return 'Phone Wallpapers';
      default: return 'Items';
    }
  };

  const getItemCount = () => {
    switch (generationType) {
      case 'stickers': return generatedSheets.length * 16;
      case 'cards': return generatedSheets.length * 4;
      case 'wallpapers': return generatedSheets.length;
      default: return generatedSheets.length;
    }
  };

  const getItemUnit = () => {
    switch (generationType) {
      case 'stickers': return 'stickers';
      case 'cards': return 'faith cards';
      case 'wallpapers': return 'wallpapers';
      default: return 'items';
    }
  };

  const handleDownloadClick = () => {
    // Allow wallpaper downloads for everyone
    if (generationType === 'wallpapers') {
      handleDownload();
      return;
    }
    
    // Check if user is authenticated for other content types
    if (!isAuthenticated) {
      toast.error("Login required to download this content", {
        description: "Please sign in to download stickers and faith cards",
        action: {
          label: "Login",
          onClick: () => navigate('/login')
        }
      });
      return;
    }
    
    // Check if we should show contribution prompt
    if (shouldShowContributionPrompt(generationType)) {
      setShowContributionModal(true);
    } else {
      handleDownload();
    }
  };

  const handlePdfDownloadClick = () => {
    // Allow wallpaper downloads for everyone
    if (generationType === 'wallpapers') {
      handlePdfDownload();
      return;
    }
    
    // Check if user is authenticated for other content types
    if (!isAuthenticated) {
      toast.error("Login required to download this content", {
        description: "Please sign in to download stickers and faith cards",
        action: {
          label: "Login",
          onClick: () => navigate('/login')
        }
      });
      return;
    }
    
    // Check if we should show contribution prompt
    if (shouldShowContributionPrompt(generationType)) {
      setShowContributionModal(true);
    } else {
      handlePdfDownload();
    }
  };

  const handleContributionModalClose = (shouldProceed: boolean) => {
    setShowContributionModal(false);
    
    if (shouldProceed) {
      handleDownload();
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="w-full border-amber-200 bg-amber-50">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-amber-800 font-comic">
                Your {getTypeDisplayName()}
              </h2>
              <p className="text-sm text-amber-600 font-comic">
                {generatedSheets.length} sheet{generatedSheets.length > 1 ? 's' : ''} with {getItemCount()} {getItemUnit()} total
              </p>
            </div>
            
            <div className="flex gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    className={`${
                      !isAuthenticated && generationType !== 'wallpapers' 
                        ? 'bg-gray-400 hover:bg-gray-500' 
                        : 'bg-amber-600 hover:bg-amber-700'
                    } font-comic`}
                    disabled={!isAuthenticated && generationType !== 'wallpapers'}
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    {!isAuthenticated && generationType !== 'wallpapers' ? 'Login to Download' : 'Download'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleDownloadClick}>
                    <Printer className="w-4 h-4 mr-2" />
                    High-Res PNG
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handlePdfDownloadClick}>
                    <FileText className="w-4 h-4 mr-2" />
                    PDF Format
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-12">
        {generatedSheets.map((verses, index) => (
          <div key={index} className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="text-orange-500 w-5 h-5" />
              <h3 className="text-lg font-medium text-orange-700 font-comic">
                {generationType === 'wallpapers' ? `Wallpaper ${index + 1}` : `Sheet ${index + 1}`}
              </h3>
            </div>
            
            <div 
              ref={(el) => sheetRefs.current[index] = el}
              className="overflow-auto max-w-full shadow-md"
            >
              {generationType === 'stickers' ? (
                <StickerSheet
                  verses={verses}
                  language={language}
                  randomGradients={randomGradients}
                  selectedTopics={selectedTopics}
                />
              ) : generationType === 'cards' ? (
                <FaithCardSheet
                  verses={verses}
                  language={language}
                  selectedTopics={selectedTopics}
                />
              ) : (
                <WallpaperSheet
                  verses={verses}
                  language={language}
                  selectedTopics={selectedTopics}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      
      <Button 
        variant="outline" 
        className="w-full border-amber-300 text-amber-700 hover:bg-amber-100 font-comic"
        onClick={() => setActiveTab('edit')}
      >
        Back to Editor
      </Button>

      {/* Contribution Modal */}
      {showContributionModal && (
        <ContributionModal 
          onClose={handleContributionModalClose}
          contentType={generationType}
        />
      )}
    </div>
  );
};

export default PreviewTab;