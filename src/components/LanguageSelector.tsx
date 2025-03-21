
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface LanguageSelectorProps {
  language: string;
  onChange: (value: 'english' | 'korean' | 'bilingual') => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, onChange }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium font-comic text-green-700">Select Language</h3>
      
      <RadioGroup 
        defaultValue={language} 
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
        onValueChange={(value) => onChange(value as 'english' | 'korean' | 'bilingual')}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="english" id="english" />
          <Label htmlFor="english" className="cursor-pointer font-comic">English</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="korean" id="korean" />
          <Label htmlFor="korean" className="cursor-pointer font-comic">Korean</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="bilingual" id="bilingual" />
          <Label htmlFor="bilingual" className="cursor-pointer font-comic">Bilingual</Label>
        </div>
      </RadioGroup>
      
      <div className="pt-4 border-t border-green-100 mt-4">
        <h4 className="text-sm font-medium mb-2 text-green-600 font-comic">Other Major Languages</h4>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select another language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="spanish">Spanish</SelectItem>
            <SelectItem value="french">French</SelectItem>
            <SelectItem value="german">German</SelectItem>
            <SelectItem value="chinese">Chinese</SelectItem>
            <SelectItem value="japanese">Japanese</SelectItem>
            <SelectItem value="arabic">Arabic</SelectItem>
            <SelectItem value="hindi">Hindi</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500 mt-2 font-comic">More languages coming soon!</p>
      </div>
    </div>
  );
};

export default LanguageSelector;
