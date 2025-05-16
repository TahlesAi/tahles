
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
    
    const filtered = suggestions.filter(suggestion => 
      suggestion.value.toLowerCase().includes(value.toLowerCase())
    );
    
    setFilteredSuggestions(filtered);
    setActiveIndex(-1);
  }, [value, suggestions]);

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
        setActiveIndex(prevIndex => 
          prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : 0
        );
        break;
        
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex(prevIndex => 
          prevIndex > 0 ? prevIndex - 1 : filteredSuggestions.length - 1
        );
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
              showButton ? "rounded-l-md rounded-r-none" : "rounded-md",
              inputClassName
            )}
            dir={dir}
          />
          
          {isOpen && showCommandBar && (
            <div 
              ref={commandRef}
              className="absolute top-full left-0 right-0 mt-1 z-50"
            >
              <Command className="border rounded-md shadow-md bg-white">
                <CommandList>
                  {Object.keys(groups).length === 0 ? (
                    <CommandEmpty>לא נמצאו תוצאות</CommandEmpty>
                  ) : (
                    Object.entries(groups).map(([type, items]) => (
                      <CommandGroup key={type} heading={type}>
                        {items.map((suggestion, index) => (
                          <CommandItem
                            key={suggestion.id}
                            onSelect={() => handleSelectSuggestion(suggestion)}
                            className={cn(
                              "flex items-center gap-2 cursor-pointer",
                              activeIndex === filteredSuggestions.indexOf(suggestion) && "bg-accent text-accent-foreground"
                            )}
                            data-active={activeIndex === filteredSuggestions.indexOf(suggestion)}
                            dir={dir}
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
              "rounded-r-md rounded-l-none",
              buttonClassName
            )}
          >
            <Search className="h-4 w-4 ml-2" />
            {buttonText}
          </Button>
        )}
      </form>
    </div>
  );
};

export default AutocompleteSearch;
