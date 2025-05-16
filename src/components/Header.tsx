
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { Menu, User, LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import AuthModal from "./AuthModal";
import ServiceBasket from "./provider/ServiceBasket";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [userType, setUserType] = useState<"client" | "provider">("client");
  const { user, signOut } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const handleOpenLogin = () => {
    setAuthMode("signin");
    setShowAuthModal(true);
  };
  
  const handleOpenSignup = () => {
    setAuthMode("signup");
    setShowAuthModal(true);
  };

  return (
    <header
      className={`sticky top-0 z-30 w-full transition-colors duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        {/* לוגו */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center">
            <span className="font-bold text-xl text-brand-500">ת'כל'ס</span>
          </Link>
        </div>

        {/* תפריט ראשי - מוצג רק בדסקטופ */}
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-6" dir="rtl">
            <Link 
              to="/categories" 
              className="text-base font-medium hover:text-brand-500 transition-colors"
            >
              קטגוריות
            </Link>
            <Link 
              to="/search" 
              className="text-base font-medium hover:text-brand-500 transition-colors"
            >
              חיפוש ספקים
            </Link>
            <Link 
              to="/how-it-works" 
              className="text-base font-medium hover:text-brand-500 transition-colors"
            >
              איך זה עובד
            </Link>
            <Link 
              to="/contact" 
              className="text-base font-medium hover:text-brand-500 transition-colors"
            >
              יצירת קשר
            </Link>
          </nav>
        )}

        {/* כפתורי פעולה */}
        <div className="flex items-center gap-2">
          {/* סל שירותים */}
          <ServiceBasket />
          
          {user ? (
            // משתמש מחובר
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div dir="rtl">
                  <DropdownMenuLabel>החשבון שלי</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    לוח בקרה
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/provider-onboarding")}>
                    הצטרפות כספק
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={signOut}
                    className="text-red-600 focus:text-red-600"
                  >
                    <LogOut className="ml-2 h-4 w-4" />
                    התנתקות
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // משתמש לא מחובר
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={handleOpenLogin}>
                כניסה
              </Button>
              <Button variant="default" onClick={() => navigate("/provider-onboarding")}>
                הצטרפות כספק
              </Button>
            </div>
          )}
          
          {/* תפריט המבורגר למובייל */}
          {isMobile && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div dir="rtl">
                  <DropdownMenuItem onClick={() => navigate("/categories")}>
                    קטגוריות
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/search")}>
                    חיפוש ספקים
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/how-it-works")}>
                    איך זה עובד
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/contact")}>
                    יצירת קשר
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {user ? (
                    <>
                      <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                        לוח בקרה
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate("/provider-onboarding")}>
                        הצטרפות כספק
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={signOut}
                        className="text-red-600 focus:text-red-600"
                      >
                        <LogOut className="ml-2 h-4 w-4" />
                        התנתקות
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem onClick={handleOpenLogin}>
                        כניסה
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleOpenSignup}>
                        הרשמה
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate("/provider-onboarding")}>
                        הצטרפות כספק
                      </DropdownMenuItem>
                    </>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        setMode={setAuthMode}
        userType={userType}
        setUserType={setUserType}
      />
    </header>
  );
};

export default Header;
