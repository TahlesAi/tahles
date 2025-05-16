
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
import { Menu } from "lucide-react";
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
  const userName = userMeta.name || user?.email?.split('@')[0] || 'User';
  const userAvatar = userMeta.avatar_url || '';

  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-brand-600">תכלס</span>
          </Link>
          
          {/* Search Bar - only on desktop */}
          <div className="hidden md:block flex-1 mx-8 max-w-md">
            <SearchableHeader 
              placeholder="חיפוש שירותים, נותני שירות..." 
              dir="rtl"
              inputClassName="rounded-full h-9"
              maxWidth="75%" // Reduced width
            />
          </div>
          
          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/how-it-works" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">איך זה עובד</Link>
            <Link to="/categories" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">קטגוריות</Link>
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
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-1/2 bg-white">
                <SheetHeader>
                  <SheetTitle>תפריט</SheetTitle>
                  <SheetDescription>
                    גלו את כל האפשרויות שלנו.
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-4">
                  <Link to="/how-it-works" className="text-gray-600 hover:text-gray-800">איך זה עובד</Link>
                  <Link to="/categories" className="text-gray-600 hover:text-gray-800">קטגוריות</Link>
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
          )}
        </div>
      </div>
      
      {/* Mobile Search - only visible on mobile */}
      {isMobile && (
        <div className="border-t p-2">
          <SearchableHeader 
            placeholder="חיפוש שירותים, נותני שירות..." 
            dir="rtl"
            inputClassName="rounded-full h-9"
          />
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
