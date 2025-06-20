import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { wallpaperBackgroundService } from '@/services/WallpaperBackgroundService';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  generationType: 'stickers' | 'cards' | 'wallpapers';
  numberOfSheets: number;
  setNumberOfSheets: (num: number) => void;
  randomizeGradients: boolean;
  setRandomizeGradients: (value: boolean) => void;
  wallpaperCategory?: string;
  setWallpaperCategory?: (category: string) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  generationType,
  numberOfSheets,
  setNumberOfSheets,
  randomizeGradients,
  setRandomizeGradients,
  wallpaperCategory = 'auto',
  setWallpaperCategory
}) => {
  const [localNumberOfSheets, setLocalNumberOfSheets] = useState(numberOfSheets);
  const [localRandomizeGradients, setLocalRandomizeGradients] = useState(randomizeGradients);
  const [localWallpaperCategory, setLocalWallpaperCategory] = useState(wallpaperCategory);

  const handleSave = () => {
    setNumberOfSheets(localNumberOfSheets);
    setRandomizeGradients(localRandomizeGradients);
    if (setWallpaperCategory) {
      setWallpaperCategory(localWallpaperCategory);
    }
    onClose();
  };

  const getModalTitle = () => {
    switch (generationType) {
      case 'stickers': return 'Edit Sticker Settings';
      case 'cards': return 'Edit Faith Card Settings';
      case 'wallpapers': return 'Edit Wallpaper Settings';
      default: return 'Edit Settings';
    }
  };

  const getItemName = () => {
    switch (generationType) {
      case 'stickers': return 'sticker sheets';
      case 'cards': return 'faith card sheets';
      case 'wallpapers': return 'wallpapers';
      default: return 'items';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-comic text-amber-800">{getModalTitle()}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Number of sheets/items */}
          <div className="space-y-2">
            <Label htmlFor="sheets" className="text-sm font-medium">
              Number of {getItemName()}
            </Label>
            <Input
              id="sheets"
              type="number"
              min="1"
              max="10"
              value={localNumberOfSheets}
              onChange={(e) => setLocalNumberOfSheets(parseInt(e.target.value) || 1)}
              className="w-full"
            />
            <p className="text-xs text-gray-500">
              {generationType === 'stickers' && 'Each sheet contains 16 stickers'}
              {generationType === 'cards' && 'Each sheet contains 4 faith cards'}
              {generationType === 'wallpapers' && 'Each wallpaper is a single verse'}
            </p>
          </div>

          {/* Randomize gradients - only for stickers */}
          {generationType === 'stickers' && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="randomize-gradients"
                  checked={localRandomizeGradients}
                  onCheckedChange={(checked) => setLocalRandomizeGradients(checked as boolean)}
                />
                <Label htmlFor="randomize-gradients" className="text-sm">
                  Randomize background colors
                </Label>
              </div>
              <p className="text-xs text-gray-500">
                Use different gradient colors for each sticker
              </p>
            </div>
          )}

          {/* Wallpaper category - only for wallpapers */}
          {generationType === 'wallpapers' && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Background Category</Label>
              <Select value={localWallpaperCategory} onValueChange={setLocalWallpaperCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select background category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto (Smart Selection)</SelectItem>
                  <SelectItem value="nature">Nature</SelectItem>
                  <SelectItem value="christmas">Christmas</SelectItem>
                  <SelectItem value="easter">Easter</SelectItem>
                  <SelectItem value="cross">Cross/Salvation</SelectItem>
                  <SelectItem value="spring">Spring</SelectItem>
                  <SelectItem value="summer">Summer</SelectItem>
                  <SelectItem value="autumn">Autumn</SelectItem>
                  <SelectItem value="winter">Winter</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                Auto selection chooses backgrounds based on verse content and season
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-amber-600 hover:bg-amber-700">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;