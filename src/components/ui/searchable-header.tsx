
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
  useGuidedSearch?: boolean;  // Controls search behavior
}

const SearchableHeader: React.FC<SearchableHeaderProps> = ({
  className,
  buttonClassName,
  inputClassName,
  placeholder = "חיפוש...",
  dir = "rtl",
  maxWidth = "75%",
  useGuidedSearch = false  // Default to regular search now
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isGuidedSearchOpen, setIsGuidedSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { searchSuggestions, mentalistProviders } = useSearchSuggestions();

  const handleSearch = (term: string) => {
    // If using guided search, open the modal
    if (useGuidedSearch) {
      setIsGuidedSearchOpen(true);
    } else {
      // Regular search - navigate to search page with the term
      if (term && term.trim()) {
        navigate(`/search?q=${encodeURIComponent(term)}`);
      }
    }
  };

  // Enhanced search suggestions
  const enhancedSuggestions = React.useMemo(() => {
    // Make sure all mentalist providers are included in suggestions
    const hasAllMentalists = mentalistProviders.every(mentalist => 
      searchSuggestions.some(s => s.value === mentalist.value)
    );
    
    // If some mentalists are missing, add them
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

  // Now let's update the component to use AutocompleteSearch for regular search
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
          />
        )}
      </div>
      
      {/* Guided search modal */}
      <GuidedSearchModal
        isOpen={isGuidedSearchOpen}
        onClose={() => setIsGuidedSearchOpen(false)}
      />
    </>
  );
};

export default SearchableHeader;
