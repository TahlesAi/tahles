
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchableHeaderProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchableHeader = ({ 
  onSearch, 
  placeholder = "חפש שירותים, ספקים או קטגוריות...", 
  className = "" 
}: SearchableHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`}>
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
        <Input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full pr-12 pl-4 py-3 text-right border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
          dir="rtl"
        />
      </form>
    </div>
  );
};

export default SearchableHeader;
