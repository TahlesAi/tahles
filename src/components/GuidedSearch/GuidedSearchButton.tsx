
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import GuidedSearchModal from "./GuidedSearchModal";

interface GuidedSearchButtonProps {
  className?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const GuidedSearchButton = ({ className, isOpen, onOpenChange }: GuidedSearchButtonProps) => {
  return (
    <>
      <Button 
        onClick={() => onOpenChange(true)} 
        size="lg" 
        className={className}
      >
        <Search className="ml-2 h-4 w-4" />
        מצא לי פתרון תוכן לאירוע מושלם
      </Button>
      
      <GuidedSearchModal 
        isOpen={isOpen} 
        onClose={() => onOpenChange(false)} 
      />
    </>
  );
};

export default GuidedSearchButton;
