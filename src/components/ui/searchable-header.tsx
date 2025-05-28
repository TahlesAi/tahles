
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  placeholder = "מצא לי פתרון לאירוע מושלם...",
  dir = "rtl",
  maxWidth = "75%",
  useGuidedSearch = false,
  onSearchComplete
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isGuidedSearchOpen, setIsGuidedSearchOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const { searchSuggestions, mentalistProviders } = useSearchSuggestions();

  const handleSearch = (term: string) => {
    if (term && term.trim()) {
      if (useGuidedSearch) {
        setIsGuidedSearchOpen(true);
      } else {
        navigate(`/search?q=${encodeURIComponent(term)}`);
        if (onSearchComplete) {
          onSearchComplete();
        }
      }
    }
  };

  const enhancedSuggestions = React.useMemo(() => {
    const hasAllMentalists = mentalistProviders.every(mentalist => 
      searchSuggestions.some(s => s.value === mentalist.value)
    );
    
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

  if (useGuidedSearch) {
    return (
      <>
        <div className={cn("relative", className)} style={{ maxWidth }}>
          <Button
            type="button"
            className={cn(
              "w-full flex items-center justify-between py-3 px-6 text-base text-gray-500 bg-white border border-gray-300 rounded-full hover:border-brand-400 transition-colors min-h-[48px]",
              inputClassName
            )}
            onClick={() => setIsGuidedSearchOpen(true)}
            variant="ghost"
          >
            <span className="flex-1 text-right pr-4">{placeholder}</span>
            <Search className="h-5 w-5 text-gray-400 flex-shrink-0" />
          </Button>
        </div>
        
        <GuidedSearchModal
          isOpen={isGuidedSearchOpen}
          onClose={() => setIsGuidedSearchOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <div className={cn("relative", className)} style={{ maxWidth }}>
        <div className="relative flex items-center">
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder={isFocused ? "" : placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(searchTerm);
              }
            }}
            className={cn(
              "w-full pr-14 pl-6 py-3 text-base border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition-all text-right min-h-[48px]",
              inputClassName
            )}
            dir="rtl"
            style={{ 
              textAlign: 'right', 
              paddingRight: '3.5rem',
              paddingLeft: '1.5rem'
            }}
          />
        </div>
        
        {isFocused && searchTerm.trim() && (
          <AutocompleteSearch 
            suggestions={enhancedSuggestions}
            onSearch={handleSearch}
            placeholder=""
            className="absolute top-full mt-1 w-full z-50"
            inputClassName="hidden"
            buttonClassName="hidden"
            dir={dir}
            showButton={false}
            showCommandBar={true}
            value={searchTerm}
            onChange={setSearchTerm}
          />
        )}
      </div>
      
      <GuidedSearchModal
        isOpen={isGuidedSearchOpen}
        onClose={() => setIsGuidedSearchOpen(false)}
      />
    </>
  );
};

export default SearchableHeader;
