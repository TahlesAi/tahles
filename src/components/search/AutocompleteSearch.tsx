
import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEventContext } from "@/context/EventContext";
import { useNavigate } from "react-router-dom";
import { SearchSuggestion } from "@/lib/types";

interface AutocompleteSearchProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
  suggestions?: SearchSuggestion[];
  inputClassName?: string;
  buttonClassName?: string;
  dir?: "rtl" | "ltr";
  showButton?: boolean;
  showCommandBar?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

const AutocompleteSearch = ({ 
  onSearch, 
  placeholder = "חפש שירותים...", 
  className = "",
  suggestions: externalSuggestions,
  inputClassName,
  buttonClassName,
  dir = "rtl",
  showButton = true,
  showCommandBar = false,
  value: externalValue,
  onChange: externalOnChange
}: AutocompleteSearchProps) => {
  const [query, setQuery] = useState(externalValue || '');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  const { categories, providers, services } = useEventContext();

  // Sync with external value
  useEffect(() => {
    if (externalValue !== undefined) {
      setQuery(externalValue);
    }
  }, [externalValue]);

  // Handle external suggestions or generate internal ones
  useEffect(() => {
    if (externalSuggestions) {
      setSuggestions(externalSuggestions.map(s => ({
        type: s.type || 'suggestion',
        id: s.id,
        name: s.value,
        description: s.type
      })));
      setIsOpen(query.length > 1);
      return;
    }

    if (query.length > 1) {
      const filteredSuggestions = [];
      
      // חיפוש בקטגוריות
      categories.forEach(category => {
        if (category.name.includes(query)) {
          filteredSuggestions.push({
            type: 'category',
            id: category.id,
            name: category.name,
            description: category.description
          });
        }
      });
      
      // חיפוש בספקים
      providers.forEach(provider => {
        if (provider.name.includes(query) || provider.description?.includes(query)) {
          filteredSuggestions.push({
            type: 'provider',
            id: provider.id,
            name: provider.name,
            description: provider.description
          });
        }
      });
      
      // חיפוש בשירותים
      services.forEach(service => {
        if (service.name.includes(query) || service.description?.includes(query)) {
          filteredSuggestions.push({
            type: 'service',
            id: service.id,
            name: service.name,
            description: service.description
          });
        }
      });
      
      setSuggestions(filteredSuggestions.slice(0, 6));
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query, categories, providers, services, externalSuggestions]);

  const handleInputChange = (newValue: string) => {
    setQuery(newValue);
    if (externalOnChange) {
      externalOnChange(newValue);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/search?q=${encodeURIComponent(query)}`);
      }
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    const newValue = suggestion.name;
    setQuery(newValue);
    if (externalOnChange) {
      externalOnChange(newValue);
    }
    setIsOpen(false);
    
    switch (suggestion.type) {
      case 'category':
        navigate(`/categories/${suggestion.id}`);
        break;
      case 'provider':
        navigate(`/provider/${suggestion.id}`);
        break;
      case 'service':
        navigate(`/product/${suggestion.id}`);
        break;
    }
  };

  const clearSearch = () => {
    setQuery('');
    if (externalOnChange) {
      externalOnChange('');
    }
    setSuggestions([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  // If showCommandBar is true, only show suggestions dropdown
  if (showCommandBar) {
    return (
      <div className={`relative ${className}`} dir={dir}>
        {isOpen && suggestions.length > 0 && (
          <Card className="absolute top-0 left-0 right-0 z-50 max-h-64 overflow-y-auto border-gray-200">
            <CardContent className="p-0">
              {suggestions.map((suggestion, index) => (
                <div
                  key={`${suggestion.type}-${suggestion.id}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 text-right"
                >
                  <div className="font-medium text-sm text-gray-900">{suggestion.name}</div>
                  {suggestion.description && (
                    <div className="text-xs text-gray-500 mt-1 line-clamp-1">
                      {suggestion.description}
                    </div>
                  )}
                  <div className="text-xs text-blue-600 mt-1">
                    {suggestion.type === 'category' && 'קטגוריה'}
                    {suggestion.type === 'provider' && 'ספק'}
                    {suggestion.type === 'service' && 'מוצר'}
                    {suggestion.type === 'suggestion' && suggestion.description}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} dir={dir}>
      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          onFocus={() => query.length > 1 && setIsOpen(true)}
          className={`pr-10 pl-8 text-right placeholder:text-right h-9 text-sm ${inputClassName || ''}`}
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className={`absolute left-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 ${buttonClassName || ''}`}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* רשימת הצעות - קומפקטית יותר */}
      {isOpen && suggestions.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-64 overflow-y-auto border-gray-200">
          <CardContent className="p-0">
            {suggestions.map((suggestion, index) => (
              <div
                key={`${suggestion.type}-${suggestion.id}`}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 text-right"
              >
                <div className="font-medium text-sm text-gray-900">{suggestion.name}</div>
                {suggestion.description && (
                  <div className="text-xs text-gray-500 mt-1 line-clamp-1">
                    {suggestion.description}
                  </div>
                )}
                <div className="text-xs text-blue-600 mt-1">
                  {suggestion.type === 'category' && 'קטגוריה'}
                  {suggestion.type === 'provider' && 'ספק'}
                  {suggestion.type === 'service' && 'מוצר'}
                  {suggestion.type === 'suggestion' && suggestion.description}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AutocompleteSearch;
