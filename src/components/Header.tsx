import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { Moon, Sun } from 'lucide-react';
import { useTheme } from "@/components/theme-provider";

export default function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setTheme } = useTheme();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      toast({
        title: "יצאת בהצלחה",
        description: "התנתקת מהמערכת",
      });
    } catch (error) {
      console.error("Sign out failed:", error);
      toast({
        title: "שגיאה",
        description: "הייתה בעיה בהתנתקות. נסה שוב מאוחר יותר.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8 mr-8">
            <Link to="/" className="text-gray-700 hover:text-brand-600 px-3 py-2 text-sm font-medium">
              דף הבית
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-brand-600 px-3 py-2 text-sm font-medium">
              קטגוריות
            </Link>
            <Link to="/providers" className="text-gray-700 hover:text-brand-600 px-3 py-2 text-sm font-medium">
              ספקים
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-brand-600 px-3 py-2 text-sm font-medium">
              אודות
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-700 hover:text-brand-600">
                  מערכת ניהול
                  <ChevronDown className="h-4 w-4 mr-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/admin">לוח בקרה</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/admin/system-dashboard">מערכת ישנה</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/admin/new-system">המערכת החדשה</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/admin/updated-system">מערכת מעודכנת 2024</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Authentication and Theme Toggle */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setTheme(theme => (theme === "light" ? "dark" : "light"))
              }
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar_url || ""} alt={user.full_name || "User Avatar"} />
                      <AvatarFallback>{user.full_name?.slice(0, 2).toUpperCase() || "UN"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to="/profile">פרופיל</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>התנתקות</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm">
                  התחברות
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="pr-0">
                <SheetHeader>
                  <SheetTitle>תפריט</SheetTitle>
                  <SheetDescription>
                    גלה את כל האפשרויות שלנו
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <Link to="/" className="px-4 py-2 text-sm font-medium">
                    דף הבית
                  </Link>
                  <Link to="/categories" className="px-4 py-2 text-sm font-medium">
                    קטגוריות
                  </Link>
                  <Link to="/providers" className="px-4 py-2 text-sm font-medium">
                    ספקים
                  </Link>
                  <Link to="/about" className="px-4 py-2 text-sm font-medium">
                    אודות
                  </Link>
                  <Link to="/admin" className="px-4 py-2 text-sm font-medium">
                    לוח בקרה
                  </Link>
                  {user ? (
                    <Button variant="destructive" size="sm" onClick={handleSignOut}>
                      התנתקות
                    </Button>
                  ) : (
                    <Link to="/login">
                      <Button variant="outline" size="sm">
                        התחברות
                      </Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
    </header>
  );
}
