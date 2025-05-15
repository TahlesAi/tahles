
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
        <Link to="/" className="text-2xl font-bold text-brand-600">
          EventConnect
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/search" className="text-gray-700 hover:text-brand-600 transition-colors">
            Find Services
          </Link>
          <Link to="/categories" className="text-gray-700 hover:text-brand-600 transition-colors">
            Categories
          </Link>
          <Link to="/how-it-works" className="text-gray-700 hover:text-brand-600 transition-colors">
            How It Works
          </Link>
        </nav>
        
        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" onClick={openSignIn}>
            Sign In
          </Button>
          <Button onClick={openSignUp}>
            Join Now
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-white border-t">
          <nav className="flex flex-col space-y-4">
            <Link to="/search" className="text-gray-700 hover:text-brand-600 transition-colors py-2">
              Find Services
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-brand-600 transition-colors py-2">
              Categories
            </Link>
            <Link to="/how-it-works" className="text-gray-700 hover:text-brand-600 transition-colors py-2">
              How It Works
            </Link>
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <Button variant="outline" onClick={openSignIn} className="w-full">
                Sign In
              </Button>
              <Button onClick={openSignUp} className="w-full">
                Join Now
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
