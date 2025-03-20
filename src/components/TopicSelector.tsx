
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { topics } from '../data/bibleVerses';

interface TopicSelectorProps {
  selectedTopics: string[];
  onChange: (topics: string[]) => void;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ selectedTopics, onChange }) => {
  const handleTopicChange = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      onChange(selectedTopics.filter(t => t !== topic));
    } else {
      onChange([...selectedTopics, topic]);
    }
  };

  const handleSelectAll = () => {
    onChange([...topics]);
  };

  const handleClearAll = () => {
    onChange([]);
  };

  const handleRandomize = () => {
    // Select 3-5 random topics
    const count = Math.floor(Math.random() * 3) + 3;
    const shuffled = [...topics].sort(() => 0.5 - Math.random());
    onChange(shuffled.slice(0, count));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Select Topics</h3>
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
            All
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {topics.map(topic => (
          <div key={topic} className="flex items-center space-x-2">
            <Checkbox 
              id={`topic-${topic}`}
              checked={selectedTopics.includes(topic)}
              onCheckedChange={() => handleTopicChange(topic)}
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
