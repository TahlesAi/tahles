
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-sm">
          <div className="text-6xl font-bold text-brand-600 mb-4">404</div>
          <h1 className="text-2xl font-bold mb-2">העמוד לא נמצא</h1>
          <p className="text-gray-600 mb-6">
            מצטערים, העמוד שחיפשת אינו קיים או הועבר למיקום אחר
          </p>
          
          <div className="flex flex-col gap-3">
            <Button 
              onClick={() => navigate(-1)} 
              className="flex items-center gap-2"
            >
              <ArrowRight className="h-4 w-4" />
              חזרה לעמוד הקודם
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate('/')} 
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              חזרה לדף הבית
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
