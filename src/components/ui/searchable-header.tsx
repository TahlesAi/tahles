
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import AutocompleteSearch from "@/components/search/AutocompleteSearch";
import { cn } from "@/lib/utils";
import { useSearchSuggestions } from "@/lib/searchSuggestions";
import GuidedSearchModal from "../GuidedSearch/GuidedSearchModal";

interface SearchableHeaderProps {
  className?: string;
  buttonClassName?: string;
  inputClassName?: string;
  placeholder?: string;
  dir?: "rtl" | "ltr";
  maxWidth?: string;
  useGuidedSearch?: boolean;  // New prop to control search behavior
}

const SearchableHeader: React.FC<SearchableHeaderProps> = ({
  className,
  buttonClassName,
  inputClassName,
  placeholder = "חיפוש...",
  dir = "rtl",
  maxWidth = "75%",
  useGuidedSearch = true  // Default to guided search for backward compatibility
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isGuidedSearchOpen, setIsGuidedSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { searchSuggestions, mentalistProviders } = useSearchSuggestions();

  const handleSearch = (term: string) => {
    // אם השתמשנו בחיפוש מונחה, נפתח את המודל
    if (useGuidedSearch) {
      setIsGuidedSearchOpen(true);
    } else {
      // חיפוש רגיל - ניווט לדף חיפוש עם המונח שהוקלד
      if (term.trim()) {
        navigate(`/search?q=${encodeURIComponent(term)}`);
      }
    }
  };

  // הרחבת ההצעות בחיפוש
  const enhancedSuggestions = React.useMemo(() => {
    // וידוא שיש אמני חושים בהצעות
    const hasAllMentalists = mentalistProviders.every(mentalist => 
      searchSuggestions.some(s => s.value === mentalist.value)
    );
    
    // אם חסרים אמני חושים, הוסף אותם
    if (!hasAllMentalists) {
      return [
        ...searchSuggestions,
        { id: 'mental-artists-category', value: 'אמני חושים', type: 'תת-קטגוריה' },
        ...mentalistProviders.filter(mentalist => 
          !searchSuggestions.some(s => s.value === mentalist.value)
        )
      ];
    }
    
    return searchSuggestions;
  }, [searchSuggestions, mentalistProviders]);

  return (
    <>
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
          autoFocus={false}
          onButtonClick={() => useGuidedSearch ? setIsGuidedSearchOpen(true) : handleSearch(searchTerm)}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute left-1 top-1/2 transform -translate-y-1/2"
          onClick={() => useGuidedSearch ? setIsGuidedSearchOpen(true) : handleSearch(searchTerm)}
          aria-label="חיפוש"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      {/* מודל החיפוש המונחה מופיע רק אם useGuidedSearch=true */}
      {useGuidedSearch && (
        <GuidedSearchModal
          isOpen={isGuidedSearchOpen}
          onClose={() => setIsGuidedSearchOpen(false)}
        />
      )}
    </>
  );
};

export default SearchableHeader;
