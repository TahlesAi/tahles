import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, User, Heart, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import GuidedSearchButton from "./GuidedSearch/GuidedSearchButton";
import AuthModal from "./AuthModal";
import AdminShortcutButton from "./AdminShortcutButton";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm border-b" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-reverse space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">ת</span>
            </div>
            <span className="text-xl font-bold">תכלס</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-reverse space-x-8">
            <Link to="/search" className="text-gray-600 hover:text-primary transition-colors">
              חיפוש שירותים
            </Link>
            <Link to="/categories" className="text-gray-600 hover:text-primary transition-colors">
              קטגוריות
            </Link>
            <Link to="/providers" className="text-gray-600 hover:text-primary transition-colors">
              עבור ספקים
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">
              אודותינו
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-reverse space-x-4">
            <AdminShortcutButton />
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/wishlist')}
              className="hidden md:flex"
            >
              <Heart className="h-4 w-4 ml-1" />
              רשימת מועדפים
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/comparison')}
              className="hidden md:flex"
            >
              <Scale className="h-4 w-4 ml-1" />
              השוואה
            </Button>

            <GuidedSearchButton />
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsAuthModalOpen(true)}
            >
              <User className="h-4 w-4" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <nav className="py-4">
              <Link to="/search" className="block py-2 text-gray-600 hover:text-primary transition-colors">
                חיפוש שירותים
              </Link>
              <Link to="/categories" className="block py-2 text-gray-600 hover:text-primary transition-colors">
                קטגוריות
              </Link>
              <Link to="/providers" className="block py-2 text-gray-600 hover:text-primary transition-colors">
                עבור ספקים
              </Link>
              <Link to="/about" className="block py-2 text-gray-600 hover:text-primary transition-colors">
                אודותינו
              </Link>
              <Button variant="ghost" size="sm" onClick={() => navigate('/wishlist')}>
                <Heart className="h-4 w-4 ml-1" />
                רשימת מועדפים
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/comparison')}>
                <Scale className="h-4 w-4 ml-1" />
                השוואה
              </Button>
            </nav>
          </div>
        )}
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
};

export default Header;
