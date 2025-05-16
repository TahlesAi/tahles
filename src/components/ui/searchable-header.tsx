
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import AutocompleteSearch from "@/components/search/AutocompleteSearch";
import { cn } from "@/lib/utils";

interface SearchableHeaderProps {
  className?: string;
  buttonClassName?: string;
  inputClassName?: string;
  placeholder?: string;
  dir?: "rtl" | "ltr";
}

const SearchableHeader: React.FC<SearchableHeaderProps> = ({
  className,
  buttonClassName,
  inputClassName,
  placeholder = "חיפוש...",
  dir = "rtl"
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (term: string) => {
    if (term.trim()) {
      navigate(`/search?q=${encodeURIComponent(term)}`);
    }
  };

  // Common search suggestions
  const searchSuggestions = [
    { id: "1", value: "מופעי מוזיקה", type: "קטגוריה" },
    { id: "2", value: "להקות", type: "שירות" },
    { id: "3", value: "צלם אירועים", type: "שירות" },
    { id: "4", value: "קייטרינג", type: "שירות" },
    { id: "5", value: "אולמות אירועים", type: "מיקום" },
    { id: "6", value: "אמני חושים", type: "שירות" },
    { id: "7", value: "נטע ברסלר", type: "ספק" }
  ];

  return (
    <div className={cn("relative", className)}>
      <AutocompleteSearch
        suggestions={searchSuggestions}
        onSearch={handleSearch}
        placeholder={placeholder}
        value={searchTerm}
        onChange={setSearchTerm}
        buttonText=""
        dir={dir}
        inputClassName={inputClassName}
        buttonClassName={buttonClassName}
        showButton={false}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute left-1 top-1/2 transform -translate-y-1/2"
        onClick={() => handleSearch(searchTerm)}
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SearchableHeader;
