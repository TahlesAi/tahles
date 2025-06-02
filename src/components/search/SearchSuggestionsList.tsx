
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface SearchSuggestion {
  type: string;
  id: string;
  name: string;
  description?: string;
}

interface SearchSuggestionsListProps {
  suggestions: SearchSuggestion[];
  isOpen: boolean;
  onSuggestionClick: (suggestion: SearchSuggestion) => void;
  className?: string;
}

const SearchSuggestionsList: React.FC<SearchSuggestionsListProps> = ({
  suggestions,
  isOpen,
  onSuggestionClick,
  className = ""
}) => {
  if (!isOpen || suggestions.length === 0) {
    return null;
  }

  const getSuggestionTypeLabel = (type: string) => {
    switch (type) {
      case 'category': return 'קטגוריה';
      case 'provider': return 'ספק';
      case 'service': return 'מוצר';
      default: return type;
    }
  };

  return (
    <Card className={`absolute top-full left-0 right-0 mt-1 z-50 max-h-64 overflow-y-auto border-gray-200 ${className}`}>
      <CardContent className="p-0">
        {suggestions.map((suggestion, index) => (
          <div
            key={`${suggestion.type}-${suggestion.id}`}
            onClick={() => onSuggestionClick(suggestion)}
            className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 text-right"
          >
            <div className="font-medium text-sm text-gray-900">{suggestion.name}</div>
            {suggestion.description && (
              <div className="text-xs text-gray-500 mt-1 line-clamp-1">
                {suggestion.description}
              </div>
            )}
            <div className="text-xs text-blue-600 mt-1">
              {getSuggestionTypeLabel(suggestion.type)}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SearchSuggestionsList;
