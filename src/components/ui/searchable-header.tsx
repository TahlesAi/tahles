
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import AutocompleteSearch from "@/components/search/AutocompleteSearch";
import { cn } from "@/lib/utils";
import { useSearchSuggestions } from "@/lib/searchSuggestions";

interface SearchableHeaderProps {
  className?: string;
  buttonClassName?: string;
  inputClassName?: string;
  placeholder?: string;
  dir?: "rtl" | "ltr";
  maxWidth?: string;
}

const SearchableHeader: React.FC<SearchableHeaderProps> = ({
  className,
  buttonClassName,
  inputClassName,
  placeholder = "חיפוש...",
  dir = "rtl",
  maxWidth = "75%"
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { searchSuggestions } = useSearchSuggestions();

  const handleSearch = (term: string) => {
    if (term.trim()) {
      navigate(`/search?q=${encodeURIComponent(term)}`);
    }
  };

  // הרחבת ההצעות בחיפוש עבור אמני חושים
  const enhancedSuggestions = React.useMemo(() => {
    // הוספת אמני חושים מותאמים אישית אם חסרים
    const hasMentalists = searchSuggestions.some(
      s => s.value.includes('אמני חושים') || 
           s.value.includes('נטע ברסלר') || 
           s.value.includes('קליספרו')
    );
    
    if (!hasMentalists) {
      return [
        ...searchSuggestions,
        { id: 'mental-artists', value: 'אמני חושים', type: 'תת-קטגוריה' },
        { id: 'netta-bressler', value: 'נטע ברסלר - קריאת מחשבות', type: 'ספק' },
        { id: 'calispro', value: 'קליספרו - אמן חושים', type: 'ספק' }
      ];
    }
    
    return searchSuggestions;
  }, [searchSuggestions]);

  return (
    <div className={cn("relative", className)} style={{ maxWidth }}>
      <AutocompleteSearch
        suggestions={enhancedSuggestions}
        onSearch={handleSearch}
        placeholder={placeholder}
        value={searchTerm}
        onChange={setSearchTerm}
        buttonText=""
        dir={dir}
        inputClassName={inputClassName}
        buttonClassName={buttonClassName}
        showButton={false}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute left-1 top-1/2 transform -translate-y-1/2"
        onClick={() => handleSearch(searchTerm)}
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SearchableHeader;
