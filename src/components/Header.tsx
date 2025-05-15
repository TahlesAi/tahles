
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import AuthModal from "@/components/AuthModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [userType, setUserType] = useState<"client" | "provider">("client");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openSignIn = () => {
    setAuthMode("signin");
    setIsAuthModalOpen(true);
  };

  const openSignUp = () => {
    setAuthMode("signup");
    setIsAuthModalOpen(true);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center">
          <img src="/lovable-uploads/d5db99a1-ea19-4ff4-ad4d-18ebfe0eaea3.png" alt="ת'כל'ס" className="h-12" />
        </Link>
        
        {/* תפריט ניווט לדסקטופ */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/search" className="text-gray-700 hover:text-brand-600 transition-colors">
            חיפוש שירותים
          </Link>
          <Link to="/categories" className="text-gray-700 hover:text-brand-600 transition-colors">
            קטגוריות
          </Link>
          <Link to="/provider-onboarding" className="text-gray-700 hover:text-brand-600 transition-colors">
            הצטרפות כנותן שירות
          </Link>
          <Link to="/how-it-works" className="text-gray-700 hover:text-brand-600 transition-colors">
            איך זה עובד
          </Link>
        </nav>
        
        {/* כפתורי התחברות לדסקטופ */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" onClick={openSignIn}>
            התחברות
          </Button>
          <Button onClick={openSignUp}>
            הצטרפות
          </Button>
        </div>
        
        {/* כפתור תפריט למובייל */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>
      
      {/* תפריט מובייל */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-white border-t">
          <nav className="flex flex-col space-y-4">
            <Link to="/search" className="text-gray-700 hover:text-brand-600 transition-colors py-2">
              חיפוש שירותים
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-brand-600 transition-colors py-2">
              קטגוריות
            </Link>
            <Link to="/provider-onboarding" className="text-gray-700 hover:text-brand-600 transition-colors py-2">
              הצטרפות כנותן שירות
            </Link>
            <Link to="/how-it-works" className="text-gray-700 hover:text-brand-600 transition-colors py-2">
              איך זה עובד
            </Link>
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <Button variant="outline" onClick={openSignIn} className="w-full">
                התחברות
              </Button>
              <Button onClick={openSignUp} className="w-full">
                הצטרפות
              </Button>
            </div>
          </nav>
        </div>
      )}

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
