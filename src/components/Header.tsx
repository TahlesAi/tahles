
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, UserPlus, Search } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import SearchableHeader from "@/components/ui/searchable-header";

const Header = () => {
  const { user, signOut } = useAuth();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [userType, setUserType] = useState<"client" | "provider">("client");
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Extract user metadata safely
  const userMeta = user?.user_metadata || {};
  const userName = userMeta.name || user?.email?.split('@')[0] || 'משתמש';
  const userAvatar = userMeta.avatar_url || '';

  const handleSearchClick = () => {
    // Open guided search modal
    const searchModal = document.querySelector('div[role="dialog"]');
    if (searchModal) {
      searchModal.dispatchEvent(new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      }));
    }
  };

  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo - moved to the right side */}
          <div className="order-2 md:order-1">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-brand-600 ml-6">תכלס</span>
            </Link>
          </div>
          
          {/* Button for Provider Onboarding - shorter text */}
          <div className="order-3 md:order-2 mx-6">
            <Link 
              to="/provider-onboarding" 
              className="hidden md:flex px-6 py-2 rounded-full text-white font-medium bg-accent1-500 hover:bg-accent1-600 transition-colors"
            >
              <UserPlus className="h-4 w-4 ml-2" />
              ספק חדש
            </Link>
          </div>
          
          {/* Search Bar - simplified with only icon */}
          <div className="hidden md:block flex-1 mx-8 max-w-2xl order-4 md:order-3">
            <div className="relative">
              <input
                type="text"
                placeholder=""
                className="w-full py-2 px-10 text-base text-gray-700 focus:outline-none border border-gray-300 rounded-full"
                onClick={handleSearchClick}
                readOnly
              />
              <button 
                onClick={handleSearchClick}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-gray-500 hover:text-gray-700"
                aria-label="חיפוש"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Navigation Menu - REMOVED CATEGORIES LINK */}
          <nav className="hidden md:flex items-center space-x-8 order-5 md:order-4">
            <Link to="/how-it-works" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">איך זה עובד</Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">צור קשר</Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userAvatar} alt={userName} />
                      <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{userName}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => window.location.href = '/dashboard'}>
                    לוח ניהול
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    התנתקות
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={() => setOpenAuthModal(true)}
                className="bg-brand-600 hover:bg-brand-700 text-white"
              >
                התחברות | הרשמה
              </Button>
            )}
          </nav>
          
          {/* Mobile Menu */}
          {isMobile && (
            <div className="flex items-center order-1 md:order-5">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-1/2 bg-white" dir="rtl">
                  <SheetHeader>
                    <SheetTitle>תפריט</SheetTitle>
                    <SheetDescription>
                      גלו את כל האפשרויות שלנו.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="flex flex-col space-y-4 mt-4">
                    {/* Provider Onboarding Button in Mobile Menu - shorter text */}
                    <Link 
                      to="/provider-onboarding" 
                      className="py-3 px-4 rounded-md text-white font-medium bg-accent1-500 hover:bg-accent1-600 transition-colors text-center"
                    >
                      <UserPlus className="h-4 w-4 ml-2 inline-block" />
                      ספק חדש
                    </Link>
                    {/* REMOVED CATEGORIES LINK FROM MOBILE MENU AS WELL */}
                    <Link to="/how-it-works" className="text-gray-600 hover:text-gray-800">איך זה עובד</Link>
                    <Link to="/contact" className="text-gray-600 hover:text-gray-800">צור קשר</Link>
                    {user ? (
                      <>
                        <Link to="/dashboard" className="text-gray-600 hover:text-gray-800">לוח ניהול</Link>
                        <Button variant="ghost" className="justify-start" onClick={() => signOut()}>התנתקות</Button>
                      </>
                    ) : (
                      <Button variant="ghost" className="justify-start" onClick={() => setOpenAuthModal(true)}>התחברות | הרשמה</Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Search - only visible on mobile */}
      {isMobile && (
        <div className="border-t p-2">
          <div className="relative">
            <input
              type="text"
              placeholder=""
              className="w-full py-2 px-10 text-base text-gray-700 focus:outline-none border border-gray-300 rounded-full"
              onClick={handleSearchClick}
              readOnly
            />
            <button 
              onClick={handleSearchClick}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-gray-500 hover:text-gray-700"
              aria-label="חיפוש"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
      
      {/* Authentication Modal */}
      <AuthModal 
        isOpen={openAuthModal} 
        onClose={() => setOpenAuthModal(false)} 
        mode={authMode}
        setMode={setAuthMode}
        userType={userType}
        setUserType={setUserType}
      />
    </header>
  );
};

export default Header;
