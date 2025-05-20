
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
  useGuidedSearch?: boolean;
  onSearchComplete?: () => void;
}

const SearchableHeader: React.FC<SearchableHeaderProps> = ({
  className,
  buttonClassName,
  inputClassName,
  placeholder = "חיפוש שירותים, ספקים, קטגוריות...",
  dir = "rtl",
  maxWidth = "75%",
  useGuidedSearch = false,
  onSearchComplete
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isGuidedSearchOpen, setIsGuidedSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { searchSuggestions, mentalistProviders } = useSearchSuggestions();

  const handleSearch = (term: string) => {
    // אם יש מונח חיפוש
    if (term && term.trim()) {
      // אם זה חיפוש מונחה, פתח את המודאל
      if (useGuidedSearch) {
        setIsGuidedSearchOpen(true);
      } else {
        // חיפוש רגיל - ניווט לדף החיפוש עם המונח
        navigate(`/search?q=${encodeURIComponent(term)}`);
        if (onSearchComplete) {
          onSearchComplete();
        }
      }
    }
  };

  // הצעות חיפוש משופרות
  const enhancedSuggestions = React.useMemo(() => {
    // מוודא שכל ספקי המנטליזם נכללים בהצעות
    const hasAllMentalists = mentalistProviders.every(mentalist => 
      searchSuggestions.some(s => s.value === mentalist.value)
    );
    
    // אם חסרים מנטליסטים, מוסיף אותם
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
        {useGuidedSearch ? (
          <Button
            type="button"
            className={cn("w-full flex items-center justify-end py-2 px-4 text-base text-gray-700 focus:outline-none border border-gray-300 rounded-full", inputClassName)}
            onClick={() => setIsGuidedSearchOpen(true)}
            variant="ghost"
          >
            <Search className="h-4 w-4 text-gray-500" />
          </Button>
        ) : (
          <AutocompleteSearch 
            suggestions={enhancedSuggestions}
            onSearch={handleSearch}
            placeholder={placeholder}
            className={className}
            inputClassName={inputClassName}
            buttonClassName={buttonClassName}
            dir={dir}
            showButton={true}
            showCommandBar={true}
          />
        )}
      </div>
      
      {/* מודאל חיפוש מונחה */}
      <GuidedSearchModal
        isOpen={isGuidedSearchOpen}
        onClose={() => setIsGuidedSearchOpen(false)}
      />
    </>
  );
};

export default SearchableHeader;
