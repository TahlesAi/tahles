
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
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
        className={className}
        dir="rtl"
      >
        <Search className="ml-2 h-4 w-4" />
        מצא לי פתרון לאירוע מושלם
      </Button>
      
      <GuidedSearchModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  );
};

export default GuidedSearchButton;
