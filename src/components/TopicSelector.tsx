
import React, { useState, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { topics } from '../data/bibleVerses';
import { toast } from "sonner";

interface TopicSelectorProps {
  selectedTopics: string[];
  onChange: (topics: string[]) => void;
  generationType: 'stickers' | 'cards';
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ selectedTopics, onChange, generationType }) => {
  // For cards, we want exactly 4 topics selected
  const maxTopics = generationType === 'cards' ? 4 : topics.length;
  
  const [showWarning, setShowWarning] = useState(false);
  
  useEffect(() => {
    if (generationType === 'cards' && selectedTopics.length > 4) {
      onChange(selectedTopics.slice(0, 4));
      toast.warning("For faith cards, you can select exactly 4 topics - one for each card.");
    }
    
    setShowWarning(generationType === 'cards' && selectedTopics.length !== 4);
  }, [generationType, selectedTopics.length]);

  const handleTopicChange = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      onChange(selectedTopics.filter(t => t !== topic));
    } else {
      if (generationType === 'cards' && selectedTopics.length >= 4) {
        toast.warning("For faith cards, you can select exactly 4 topics - one for each card.");
        return;
      }
      onChange([...selectedTopics, topic]);
    }
  };

  const handleSelectAll = () => {
    // For cards, select the first 4 topics
    if (generationType === 'cards') {
      onChange(topics.slice(0, 4));
      toast.info("Selected 4 topics for your faith cards.");
    } else {
      onChange([...topics]);
    }
  };

  const handleClearAll = () => {
    onChange([]);
  };

  const handleRandomize = () => {
    // For cards, always pick exactly 4 random topics
    const count = generationType === 'cards' ? 4 : Math.floor(Math.random() * 3) + 3;
    const shuffled = [...topics].sort(() => 0.5 - Math.random());
    onChange(shuffled.slice(0, count));
    
    if (generationType === 'cards') {
      toast.info("Selected 4 random topics for your faith cards.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">
          {generationType === 'cards' ? "Select 4 Topics (One per Card)" : "Select Topics"}
        </h3>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRandomize}
            className="text-xs"
          >
            Randomize
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSelectAll}
            className="text-xs"
          >
            {generationType === 'cards' ? "Select 4" : "All"}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleClearAll}
            className="text-xs"
          >
            Clear
          </Button>
        </div>
      </div>

      {generationType === 'cards' && showWarning && (
        <div className="rounded-md bg-yellow-50 p-3 border border-yellow-200">
          <p className="text-sm text-yellow-700">
            Please select <strong>exactly 4 topics</strong> - one for each faith card.
            Currently selected: {selectedTopics.length}/4
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {topics.map(topic => (
          <div key={topic} className="flex items-center space-x-2">
            <Checkbox 
              id={`topic-${topic}`}
              checked={selectedTopics.includes(topic)}
              onCheckedChange={() => handleTopicChange(topic)}
              disabled={generationType === 'cards' && selectedTopics.length >= 4 && !selectedTopics.includes(topic)}
            />
            <Label htmlFor={`topic-${topic}`} className="cursor-pointer">
              {topic}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicSelector;
