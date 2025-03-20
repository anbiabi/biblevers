
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface LanguageSelectorProps {
  language: string;
  onChange: (value: 'english' | 'korean' | 'bilingual') => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, onChange }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium">Language</h3>
      
      <RadioGroup 
        defaultValue={language} 
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
        onValueChange={(value) => onChange(value as 'english' | 'korean' | 'bilingual')}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="english" id="english" />
          <Label htmlFor="english" className="cursor-pointer">English</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="korean" id="korean" />
          <Label htmlFor="korean" className="cursor-pointer">Korean</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="bilingual" id="bilingual" />
          <Label htmlFor="bilingual" className="cursor-pointer">Bilingual</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default LanguageSelector;
