
import React, { forwardRef } from 'react';
import { Search, X, Sparkles } from 'lucide-react';
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
      <div className="relative group">
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          <Search className="h-4 w-4 text-brand-500 group-focus-within:text-brand-600 transition-colors" />
          <Sparkles className="h-3 w-3 text-brand-400 opacity-60" />
        </div>
        
        <Input
          ref={ref}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={onKeyPress}
          onFocus={onFocus}
          className={`pr-12 pl-8 text-right placeholder:text-right h-10 text-sm border-2 border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-all duration-200 ${inputClassName || ''}`}
        />
        
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className={`absolute left-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-red-100 transition-all duration-200 ${buttonClassName || ''}`}
          >
            <X className="h-3 w-3 text-red-500" />
          </Button>
        )}
      </div>
    );
  }
);

AutocompleteSearchInput.displayName = "AutocompleteSearchInput";

export default AutocompleteSearchInput;
