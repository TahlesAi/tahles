
import React, { forwardRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AutocompleteSearchInputProps {
  query: string;
  placeholder?: string;
  inputClassName?: string;
  buttonClassName?: string;
  dir?: "rtl" | "ltr";
  onChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
  onFocus: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

const AutocompleteSearchInput = forwardRef<HTMLInputElement, AutocompleteSearchInputProps>(
  ({ 
    query, 
    placeholder = "חפש שירותים...", 
    inputClassName, 
    buttonClassName, 
    dir = "rtl",
    onChange,
    onSearch,
    onClear,
    onFocus,
    onKeyPress
  }, ref) => {
    return (
      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          ref={ref}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={onKeyPress}
          onFocus={onFocus}
          className={`pr-10 pl-8 text-right placeholder:text-right h-9 text-sm ${inputClassName || ''}`}
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className={`absolute left-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 ${buttonClassName || ''}`}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    );
  }
);

AutocompleteSearchInput.displayName = "AutocompleteSearchInput";

export default AutocompleteSearchInput;
