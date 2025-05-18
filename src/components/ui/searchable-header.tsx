
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
  const [isGuidedSearchOpen, setIsGuidedSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { searchSuggestions, mentalistProviders } = useSearchSuggestions();

  const handleSearch = (term: string) => {
    // אם יש מונח חיפוש ספציפי, עדיין נאפשר חיפוש רגיל
    if (term.trim()) {
      navigate(`/search?q=${encodeURIComponent(term)}`);
    } else {
      // אם אין מונח חיפוש, נפתח את החיפוש המונחה
      setIsGuidedSearchOpen(true);
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
          onButtonClick={() => setIsGuidedSearchOpen(true)}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute left-1 top-1/2 transform -translate-y-1/2"
          onClick={() => setIsGuidedSearchOpen(true)}
          aria-label="חיפוש מונחה"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      <GuidedSearchModal
        isOpen={isGuidedSearchOpen}
        onClose={() => setIsGuidedSearchOpen(false)}
      />
    </>
  );
};

export default SearchableHeader;
