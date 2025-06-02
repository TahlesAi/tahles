
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, User, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthModal from "./AuthModal";
import FavoritesDashboard from "./favorites/FavoritesDashboard";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [userType, setUserType] = useState<'client' | 'provider'>('client');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* לוגו */}
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">ת</span>
            </div>
            <span className="font-bold text-xl text-gray-900">תכל'ס</span>
          </Link>

          {/* חיפוש מרכזי - דסקטופ */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Input
                type="text"
                placeholder="חפש שירותים או ספקים..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
          </div>

          {/* כפתורי ניווט - דסקטופ */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <FavoritesDashboard />
            
            <Button 
              variant="outline"
              onClick={() => setIsAuthModalOpen(true)}
            >
              <User className="h-4 w-4 ml-1" />
              התחברות
            </Button>
            
            <Link to="/provider-onboarding">
              <Button>
                <Building2 className="h-4 w-4 ml-1" />
                הצטרפות ספקים
              </Button>
            </Link>
          </div>

          {/* כפתור תפריט - מובייל */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* תפריט מובייל */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {/* חיפוש במובייל */}
            <form onSubmit={handleSearch} className="relative mb-4">
              <Input
                type="text"
                placeholder="חפש שירותים או ספקים..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>

            {/* כפתורי ניווט במובייל */}
            <div className="space-y-2">
              <FavoritesDashboard />
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                <User className="h-4 w-4 ml-1" />
                התחברות
              </Button>
              
              <Link to="/provider-onboarding">
                <Button className="w-full justify-start" onClick={() => setIsMenuOpen(false)}>
                  <Building2 className="h-4 w-4 ml-1" />
                  הצטרפות ספקים
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        setMode={setAuthMode}
        userType={userType}
        setUserType={setUserType}
      />
    </header>
  );
};

export default Header;
