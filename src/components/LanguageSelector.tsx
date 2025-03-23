
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface LanguageSelectorProps {
  language: string;
  onChange: (value: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, onChange }) => {
  const handleLanguageChange = (value: string) => {
    onChange(value);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium font-comic text-green-700">Select Language</h3>
      
      <Select value={language} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-full font-comic">
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="english" className="font-comic">English</SelectItem>
          <SelectItem value="korean" className="font-comic">Korean</SelectItem>
          <SelectItem value="bilingual" className="font-comic">Bilingual (Eng/Kor)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
