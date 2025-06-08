
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, Settings, LayoutDashboard } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSystemNavigation = () => {
    navigate('/admin/new-system');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b" dir="rtl">
      <div className="container px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 space-x-reverse">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">ת</span>
            </div>
            <span className="text-xl font-bold text-gray-900">תכלס הפקות</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
            <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
              בית
            </Link>
            <Link to="/categories" className="text-gray-600 hover:text-primary transition-colors">
              קטגוריות
            </Link>
            <Link to="/providers" className="text-gray-600 hover:text-primary transition-colors">
              ספקים
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">
              אודות
            </Link>
            <Button variant="outline" onClick={handleSystemNavigation}>
              <LayoutDashboard className="h-4 w-4 ml-2" />
              המערכת החדשה
            </Button>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            <Link to="/admin">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 ml-2" />
                ניהול
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 ml-2" />
              כניסה
            </Button>
            <Button size="sm">הרשמה</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={toggleMenu}
            aria-label="תפריט"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                בית
              </Link>
              <Link to="/categories" className="text-gray-600 hover:text-primary transition-colors">
                קטגוריות
              </Link>
              <Link to="/providers" className="text-gray-600 hover:text-primary transition-colors">
                ספקים
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">
                אודות
              </Link>
              <Button variant="outline" onClick={handleSystemNavigation} className="w-full justify-start">
                <LayoutDashboard className="h-4 w-4 ml-2" />
                המערכת החדשה
              </Button>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Link to="/admin">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Settings className="h-4 w-4 ml-2" />
                    ניהול
                  </Button>
                </Link>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <User className="h-4 w-4 ml-2" />
                  כניסה
                </Button>
                <Button size="sm" className="w-full">הרשמה</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
