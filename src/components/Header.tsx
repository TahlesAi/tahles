
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, HelpCircle } from "lucide-react";
import AuthModal from "./AuthModal";
import SearchableHeader from "@/components/ui/searchable-header";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [userType, setUserType] = useState<'client' | 'provider'>('client');
  const navigate = useNavigate();

  const handleHowItWorks = () => {
    // פונקציה להציג הסבר על המערכת
    console.log("How it works clicked");
    // TODO: הוסף modal או נווט לעמוד הסבר
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

            {/* סרגל חיפוש - דסקטופ */}
            <div className="hidden md:flex flex-1 justify-center max-w-md">
              <SearchableHeader
                placeholder="חיפוש שירותים..."
                className="w-full"
                inputClassName="h-9 text-sm border-gray-300"
                dir="rtl"
                useGuidedSearch={false}
              />
            </div>

            {/* ניווט עיקרי - דסקטופ */}
            <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleHowItWorks}
                className="text-gray-600 hover:text-blue-600 flex items-center"
              >
                <HelpCircle className="h-4 w-4 ml-2" />
                איך זה עובד?
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

          {/* סרגל חיפוש - מובייל */}
          <div className="md:hidden pb-3">
            <SearchableHeader
              placeholder="חיפוש שירותים..."
              className="w-full"
              inputClassName="h-9 text-sm border-gray-300"
              dir="rtl"
              useGuidedSearch={false}
            />
          </div>

          {/* תפריט מובייל */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    handleHowItWorks();
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-600 hover:text-blue-600 w-fit flex items-center"
                >
                  <HelpCircle className="h-4 w-4 ml-2" />
                  איך זה עובד?
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
