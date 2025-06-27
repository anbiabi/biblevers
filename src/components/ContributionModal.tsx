import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart, Coffee, Star, Download } from "lucide-react";

interface ContributionModalProps {
  onClose: (shouldProceed: boolean) => void;
  contentType: 'stickers' | 'cards' | 'wallpapers';
}

const ContributionModal: React.FC<ContributionModalProps> = ({ onClose, contentType }) => {
  const getContentTypeName = () => {
    switch (contentType) {
      case 'stickers': return 'Bible Stickers';
      case 'cards': return 'Faith Cards';
      case 'wallpapers': return 'Wallpapers';
      default: return 'content';
    }
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose(false)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Heart className="h-5 w-5 text-rose-500" />
            Support Our Ministry
          </DialogTitle>
          <DialogDescription>
            You've downloaded several {getContentTypeName().toLowerCase()} today. Would you consider supporting our work?
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
            <p className="text-sm text-blue-800 mb-2">
              <strong>Your support helps us:</strong>
            </p>
            <ul className="text-sm text-blue-700 space-y-1 pl-5 list-disc">
              <li>Keep our servers running</li>
              <li>Develop new features</li>
              <li>Improve AI background generation</li>
              <li>Add more Bible translations</li>
              <li>Maintain this ministry for everyone</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <div className="flex flex-col space-y-2">
              <Button 
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                onClick={() => window.open('https://www.paypal.com/donate?business=anbiabi@yahoo.fr&item_name=Bible+Verse+Creator+-+Maintenance+Fee&amount=1', '_blank')}
              >
                <Coffee className="mr-2 h-4 w-4" />
                Contribute $1
              </Button>
              <Button 
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                onClick={() => window.open('https://www.paypal.com/donate?business=anbiabi@yahoo.fr&item_name=Bible+Verse+Creator+-+Maintenance+Fee&amount=5', '_blank')}
              >
                <Star className="mr-2 h-4 w-4" />
                Contribute $5
              </Button>
              <Button 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                onClick={() => window.open('https://www.paypal.com/donate?business=anbiabi@yahoo.fr&item_name=Bible+Verse+Creator+-+Maintenance+Fee&amount=10', '_blank')}
              >
                <Heart className="mr-2 h-4 w-4" />
                Contribute $10
              </Button>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500 text-center mb-4">
          100% optional • Secure payment through PayPal • No account required
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onClose(true)}
            className="sm:w-full"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Anyway
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => onClose(false)}
            className="sm:w-auto"
          >
            Maybe Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContributionModal;