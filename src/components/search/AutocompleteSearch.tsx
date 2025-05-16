
import React, { useState, useEffect, useRef } from "react";
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
  const commandRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Control the value based on external or internal state
  const value = externalValue !== undefined ? externalValue : internalValue;
  
  // Filter suggestions based on input value
  useEffect(() => {
    if (value.trim() === "") {
      setFilteredSuggestions([]);
      return;
    }
    
    const filtered = suggestions.filter(suggestion => 
      suggestion.value.toLowerCase().includes(value.toLowerCase())
    );
    
    setFilteredSuggestions(filtered);
  }, [value, suggestions]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    if (externalOnChange) {
      externalOnChange(newValue);
    } else {
      setInternalValue(newValue);
    }
    
    if (newValue.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
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
            className={cn(
              "w-full",
              showButton ? "rounded-l-md rounded-r-none" : "rounded-md",
              inputClassName
            )}
            onFocus={() => value !== "" && setIsOpen(true)}
            dir={dir}
          />
          
          {isOpen && filteredSuggestions.length > 0 && showCommandBar && (
            <div 
              ref={commandRef}
              className="absolute top-full left-0 right-0 mt-1 z-50"
            >
              <Command className="border rounded-md shadow-md bg-white">
                <CommandList>
                  <CommandEmpty>לא נמצאו תוצאות</CommandEmpty>
                  <CommandGroup>
                    {filteredSuggestions.map((suggestion) => (
                      <CommandItem
                        key={suggestion.id}
                        onSelect={() => handleSelectSuggestion(suggestion)}
                        className="flex items-center gap-2 cursor-pointer"
                        dir={dir}
                      >
                        {suggestion.icon}
                        <span>{suggestion.value}</span>
                        {suggestion.type && (
                          <span className="text-xs text-gray-500 mr-auto">{suggestion.type}</span>
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
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
