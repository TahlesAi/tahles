
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Sparkles, Target } from "lucide-react";
import GuidedSearchModal from "./GuidedSearchModal";

interface GuidedSearchButtonProps {
  className?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline" | "ghost";
}

const GuidedSearchButton = ({ 
  className, 
  isOpen: controlledIsOpen, 
  onOpenChange, 
  size = "lg", 
  variant = "default" 
}: GuidedSearchButtonProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = onOpenChange || setInternalIsOpen;

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)} 
        size={size} 
        variant={variant}
        className={`bg-gradient-to-l from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${className}`}
        dir="rtl"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
            <Target className="h-3 w-3" />
          </div>
          <span>מצא לי פתרון לאירוע מושלם</span>
          <Sparkles className="h-4 w-4 opacity-80" />
        </div>
      </Button>
      
      <GuidedSearchModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  );
};

export default GuidedSearchButton;
