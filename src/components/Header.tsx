import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Search } from "lucide-react";
import GuidedSearchModal from "./GuidedSearch/GuidedSearchModal";
import SearchableHeader from "@/components/ui/searchable-header";

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [guidedSearchOpen, setGuidedSearchOpen] = useState(false);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <span className="text-xl font-bold">ת</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">תכל'ס</span>
          </Link>

          {/* Search Bar - Center */}
          <div className="flex-1 max-w-2xl mx-4">
            <SearchableHeader 
              onSearch={handleSearch}
              placeholder="חפש שירותים, ספקים או קטגוריות..."
            />
          </div>

          {/* Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-6 flex-shrink-0">
            <Link 
              to="/categories" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              קטגוריות
            </Link>
            <Link 
              to="/how-it-works" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              איך זה עובד
            </Link>
            <Button
              onClick={() => setGuidedSearchOpen(true)}
              variant="outline"
              size="sm"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <Search className="h-4 w-4 ml-2" />
              חיפוש מונחה
            </Button>
            <Button
              onClick={() => navigate('/provider-onboarding')}
              className="bg-green-600 hover:bg-green-700 text-white"
              size="sm"
            >
              הצטרפות ספקים
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <Link
              to="/categories"
              className="block py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              קטגוריות
            </Link>
            <Link
              to="/how-it-works"
              className="block py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              איך זה עובד
            </Link>
            <Button
              onClick={() => setGuidedSearchOpen(true)}
              variant="outline"
              size="sm"
              className="w-full justify-center border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <Search className="h-4 w-4 ml-2" />
              חיפוש מונחה
            </Button>
            <Button
              onClick={() => navigate('/provider-onboarding')}
              className="w-full justify-center bg-green-600 hover:bg-green-700 text-white mt-2"
              size="sm"
            >
              הצטרפות ספקים
            </Button>
          </div>
        )}
      </div>

      <GuidedSearchModal 
        isOpen={guidedSearchOpen} 
        onClose={() => setGuidedSearchOpen(false)} 
      />
    </header>
  );
};

export default Header;
