
import React, { useState, useRef, useEffect } from 'react';
import { useEventContext } from "@/context/EventContext";
import { useNavigate } from "react-router-dom";
import { SearchSuggestion } from "@/types";
import AutocompleteSearchInput from './AutocompleteSearchInput';
import SearchSuggestionsList from './SearchSuggestionsList';

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
        if (provider.businessName.includes(query) || provider.description?.includes(query)) {
          filteredSuggestions.push({
            type: 'provider',
            id: provider.id,
            name: provider.businessName,
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleFocus = () => {
    if (query.length > 1) {
      setIsOpen(true);
    }
  };

  // If showCommandBar is true, only show suggestions dropdown
  if (showCommandBar) {
    return (
      <div className={`relative ${className}`} dir={dir}>
        <SearchSuggestionsList
          suggestions={suggestions}
          isOpen={isOpen}
          onSuggestionClick={handleSuggestionClick}
        />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} dir={dir}>
      <AutocompleteSearchInput
        ref={inputRef}
        query={query}
        placeholder={placeholder}
        inputClassName={inputClassName}
        buttonClassName={buttonClassName}
        dir={dir}
        onChange={handleInputChange}
        onSearch={handleSearch}
        onClear={clearSearch}
        onFocus={handleFocus}
        onKeyPress={handleKeyPress}
      />

      <SearchSuggestionsList
        suggestions={suggestions}
        isOpen={isOpen}
        onSuggestionClick={handleSuggestionClick}
      />
    </div>
  );
};

export default AutocompleteSearch;
