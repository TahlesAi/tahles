
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import GuidedSearchModal from "./GuidedSearchModal";

interface GuidedSearchButtonProps {
  className?: string;
}

const GuidedSearchButton = ({ className }: GuidedSearchButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      <Button 
        onClick={() => setIsModalOpen(true)} 
        size="lg" 
        className={className}
      >
        <Search className="ml-2 h-4 w-4" />
        מצא לי פתרון תוכן לאירוע מושלם
      </Button>
      
      <GuidedSearchModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default GuidedSearchButton;
