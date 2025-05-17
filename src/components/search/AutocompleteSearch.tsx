
import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { 
  Command, 
  CommandInput, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem, 
  CommandList 
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

// Define the suggestion type
interface Suggestion {
  id: string;
  value: string;
  type?: string;
  icon?: React.ReactNode;
}

interface AutocompleteSearchProps {
  suggestions: Suggestion[];
  onSearch: (term: string) => void;
  placeholder?: string;
  className?: string;
  buttonText?: string;
  buttonClassName?: string;
  inputClassName?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSuggestionSelect?: (suggestion: Suggestion) => void;
  showButton?: boolean;
  showCommandBar?: boolean;
  autoFocus?: boolean;
  dir?: "rtl" | "ltr";
}

const AutocompleteSearch = ({
  suggestions,
  onSearch,
  placeholder = "חיפוש...",
  className,
  buttonText = "חיפוש",
  buttonClassName,
  inputClassName,
  value: externalValue,
  onChange: externalOnChange,
  onSuggestionSelect,
  showButton = true,
  showCommandBar = true,
  autoFocus = false,
  dir = "rtl"
}: AutocompleteSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const commandRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemsRefs = useRef<Record<string, HTMLElement>>({});

  // Control the value based on external or internal state
  const value = externalValue !== undefined ? externalValue : internalValue;
  
  // Filter suggestions based on input value
  useEffect(() => {
    // מציג הצעות אפילו אם השדה ריק
    if (value.trim() === "") {
      // מציג את הקטגוריות הראשיות כשהשדה ריק
      const categories = suggestions.filter(s => s.type === "קטגוריה").slice(0, 8);
      setFilteredSuggestions(categories);
      setActiveIndex(-1);
      return;
    }
    
    // שיפור הפילטור כדי לאפשר חיפוש חלקי וחיפוש משופר בעברית
    const searchTerm = value.toLowerCase().trim();
    
    // רשימת מילות מפתח לאמני חושים להגדיל את הדיוק בחיפוש
    const mentalismKeywords = [
      'אמני חושים', 
      'אמן חושים', 
      'קריאת מחשבות', 
      'קורא מחשבות',
      'מנטליסט',
      'מנטליזם',
      'טלפתיה',
      'נטע ברסלר',
      'קליספרו'
    ];
    
    // בודק אם החיפוש קשור לאמני חושים
    const isMentalismSearch = mentalismKeywords.some(keyword => 
      keyword.includes(searchTerm) || searchTerm.includes(keyword)
    );
    
    const filtered = suggestions.filter(suggestion => {
      const suggestionValue = suggestion.value.toLowerCase();
      
      // תגבור תוצאות לאמני חושים אם החיפוש קשור לתחום זה
      if (isMentalismSearch && (
          suggestion.value.includes('אמני חושים') || 
          suggestion.value.includes('נטע ברסלר') ||
          suggestion.value.includes('קליספרו'))
      ) {
        return true;
      }
      
      return suggestionValue.includes(searchTerm);
    });
    
    // מיון התוצאות - קודם קטגוריות ראשיות, אח"כ תת קטגוריות, אח"כ ספקים
    const sortedResults = [...filtered].sort((a, b) => {
      // נותן עדיפות לתוצאות שמתחילות עם מונח החיפוש
      const aStartsWith = a.value.toLowerCase().startsWith(searchTerm);
      const bStartsWith = b.value.toLowerCase().startsWith(searchTerm);
      
      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;
      
      // אם יש חיפוש של אמני חושים, הקפץ למעלה תוצאות רלוונטיות
      if (isMentalismSearch) {
        const aIsMentalism = a.value.includes('אמני חושים') || a.value.includes('נטע ברסלר') || a.value.includes('קליספרו');
        const bIsMentalism = b.value.includes('אמני חושים') || b.value.includes('נטע ברסלר') || b.value.includes('קליספרו');
        
        if (aIsMentalism && !bIsMentalism) return -1;
        if (!aIsMentalism && bIsMentalism) return 1;
      }
      
      // מיון לפי סוג
      if (a.type !== b.type) {
        // סדר העדיפויות: קטגוריה, תת-קטגוריה, קונספט, ספק
        const typeOrder: Record<string, number> = {
          "קטגוריה": 0,
          "תת-קטגוריה": 1,
          "קונספט": 2,
          "ספק": 3
        };
        
        return (typeOrder[a.type || ""] || 9) - (typeOrder[b.type || ""] || 9);
      }
      
      // אם הסוג זהה, מיון לפי אלף-בית
      return a.value.localeCompare(b.value, "he");
    });
    
    setFilteredSuggestions(sortedResults);
    setActiveIndex(-1);
  }, [value, suggestions]);

  // Scroll to active item when using keyboard navigation
  useEffect(() => {
    if (activeIndex >= 0 && activeIndex < filteredSuggestions.length && listRef.current) {
      const activeItemId = filteredSuggestions[activeIndex].id;
      const activeElement = itemsRefs.current[activeItemId];
      
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [activeIndex, filteredSuggestions]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    if (externalOnChange) {
      externalOnChange(newValue);
    } else {
      setInternalValue(newValue);
    }
    
    // תמיד פותח את תיבת ההצעות, גם אם הקלט ריק
    setIsOpen(true);
  };

  // Handle input focus - מציג את תיבת ההצעות גם בעת קבלת פוקוס
  const handleFocus = () => {
    setIsOpen(true);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // No suggestions or dropdown not open, use default behavior
    if (!isOpen || filteredSuggestions.length === 0) return;
    
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex(prevIndex => {
          const newIndex = prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : 0;
          return newIndex;
        });
        break;
        
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex(prevIndex => {
          const newIndex = prevIndex > 0 ? prevIndex - 1 : filteredSuggestions.length - 1;
          return newIndex;
        });
        break;
        
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < filteredSuggestions.length) {
          handleSelectSuggestion(filteredSuggestions[activeIndex]);
        } else {
          handleSubmit(e);
        }
        break;
        
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
        
      default:
        break;
    }
  };

  // Handle outside click to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (commandRef.current && !commandRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Store refs to suggestion items
  const setItemRef = (id: string, element: HTMLElement | null) => {
    if (element) {
      itemsRefs.current[id] = element;
    }
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion: Suggestion) => {
    if (externalOnChange) {
      externalOnChange(suggestion.value);
    } else {
      setInternalValue(suggestion.value);
    }
    
    if (onSuggestionSelect) {
      onSuggestionSelect(suggestion);
    } else {
      onSearch(suggestion.value);
    }
    
    setIsOpen(false);
    inputRef.current?.focus();
  };

  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
    setIsOpen(false);
  };

  // Focus input on load if autoFocus is true
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // קבוצות של סוגי הצעות
  const groupedSuggestions = () => {
    if (filteredSuggestions.length === 0) return {};
    
    return filteredSuggestions.reduce<Record<string, Suggestion[]>>((groups, item) => {
      const type = item.type || "אחר";
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(item);
      return groups;
    }, {});
  };

  const groups = groupedSuggestions();

  // מגדיר שמות מותאמים לקבוצות בעברית
  const getGroupHeading = (type: string): string => {
    const headings: Record<string, string> = {
      "קטגוריה": "קטגוריות ראשיות",
      "תת-קטגוריה": "תתי קטגוריות",
      "קונספט": "סוגי אירועים",
      "ספק": "ספקים פופולריים",
      "מיקום": "מיקומים",
      "שירות": "שירותים"
    };
    
    return headings[type] || type;
  };

  return (
    <div className={cn("relative w-full", className)}>
      <form onSubmit={handleSubmit} className="flex w-full">
        <div className="relative flex-grow">
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            className={cn(
              "w-full",
              showButton ? "rounded-r-none" : "",
              dir === "rtl" ? "rounded-r-full" : "rounded-l-full",
              inputClassName
            )}
            dir={dir}
            role="combobox"
            aria-expanded={isOpen}
            aria-controls="search-suggestions"
            aria-activedescendant={activeIndex >= 0 ? `suggestion-${filteredSuggestions[activeIndex].id}` : undefined}
          />
          
          {isOpen && showCommandBar && filteredSuggestions.length > 0 && (
            <div 
              ref={commandRef}
              className="absolute top-full left-0 right-0 mt-1 z-50"
              id="search-suggestions"
              role="listbox"
            >
              <Command className="border rounded-md shadow-md bg-white">
                <CommandList ref={listRef}>
                  {Object.keys(groups).length === 0 ? (
                    <CommandEmpty>לא נמצאו תוצאות</CommandEmpty>
                  ) : (
                    Object.entries(groups).map(([type, items]) => (
                      <CommandGroup key={type} heading={getGroupHeading(type)}>
                        {items.map((suggestion, idx) => (
                          <CommandItem
                            key={suggestion.id}
                            ref={(el) => setItemRef(suggestion.id, el)}
                            onSelect={() => handleSelectSuggestion(suggestion)}
                            className={cn(
                              "flex items-center gap-2 cursor-pointer",
                              items.findIndex(item => item.id === suggestion.id) === activeIndex ? "bg-accent text-accent-foreground" : ""
                            )}
                            value={suggestion.value}
                            dir={dir}
                            id={`suggestion-${suggestion.id}`}
                            role="option"
                            aria-selected={items.findIndex(item => item.id === suggestion.id) === activeIndex}
                          >
                            {suggestion.icon}
                            <span>{suggestion.value}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    ))
                  )}
                </CommandList>
              </Command>
            </div>
          )}
        </div>

        {showButton && (
          <Button 
            type="submit" 
            className={cn(
              dir === "rtl" ? "rounded-l-full" : "rounded-r-full",
              buttonClassName
            )}
          >
            {dir === "rtl" && <Search className="h-4 w-4 ml-2" />}
            {buttonText}
            {dir !== "rtl" && <Search className="h-4 w-4 mr-2" />}
          </Button>
        )}
      </form>
    </div>
  );
};

export default AutocompleteSearch;
