
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Search, Calendar } from "lucide-react";
import AuthModal from "./AuthModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [userType, setUserType] = useState<'client' | 'provider'>('client');
  const navigate = useNavigate();

  const handleProviderRegister = () => {
    navigate('/provider-onboarding');
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* לוגו */}
            <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ת</span>
              </div>
              <span className="text-xl font-bold text-gray-900">תכלס</span>
            </Link>

            {/* ניווט עיקרי - דסקטופ */}
            <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
              <Link to="/categories" className="text-gray-600 hover:text-blue-600 transition-colors">
                קטגוריות
              </Link>
              <Link to="/search" className="text-gray-600 hover:text-blue-600 transition-colors">
                חיפוש מתקדם
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleProviderRegister}
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                הצטרפות כספק
              </Button>
            </nav>

            {/* כפתורי פעולה - דסקטופ */}
            <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setAuthMode('signin');
                  setIsAuthModalOpen(true);
                }}
              >
                <User className="h-4 w-4 ml-2" />
                התחברות
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setAuthMode('signup');
                  setIsAuthModalOpen(true);
                }}
              >
                הרשמה
              </Button>
            </div>

            {/* כפתור תפריט - מובייל */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* תפריט מובייל */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <Link
                  to="/categories"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  קטגוריות
                </Link>
                <Link
                  to="/search"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  חיפוש מתקדם
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    handleProviderRegister();
                    setIsMenuOpen(false);
                  }}
                  className="text-blue-600 border-blue-600 hover:bg-blue-50 w-fit"
                >
                  הצטרפות כספק
                </Button>
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setAuthMode('signin');
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-fit"
                  >
                    <User className="h-4 w-4 ml-2" />
                    התחברות
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setAuthMode('signup');
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-fit"
                  >
                    הרשמה
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        setMode={setAuthMode}
        userType={userType}
        setUserType={setUserType}
      />
    </>
  );
};

export default Header;
