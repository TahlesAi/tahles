import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [userType, setUserType] = useState<"client" | "provider">("client");
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

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

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getInitials = (name: string) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
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
          <Link to="/contact" className="text-gray-700 hover:text-brand-600 transition-colors">
            צור קשר
          </Link>
        </nav>
        
        {/* כפתורי התחברות לדסקטופ */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 hover:bg-gray-100">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{profile ? getInitials(profile.display_name) : "?"}</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block">
                    {profile?.display_name || user.email}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link to="/dashboard">
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="ml-2 h-4 w-4" />
                    אזור אישי
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
                  <LogOut className="ml-2 h-4 w-4" />
                  התנתקות
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" onClick={openSignIn}>
                התחברות
              </Button>
              <Button onClick={openSignUp}>
                הצטרפות
              </Button>
            </>
          )}
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
            <Link to="/contact" className="text-gray-700 hover:text-brand-600 transition-colors py-2">
              צור קשר
            </Link>
            <div className="flex flex-col space-y-2 pt-4 border-t">
              {user ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="outline" className="w-full flex justify-start items-center">
                      <User className="ml-2 h-4 w-4" />
                      אזור אישי
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full flex justify-start items-center" onClick={handleSignOut}>
                    <LogOut className="ml-2 h-4 w-4" />
                    התנתקות
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={openSignIn} className="w-full">
                    התחברות
                  </Button>
                  <Button onClick={openSignUp} className="w-full">
                    הצטרפות
                  </Button>
                </>
              )}
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
