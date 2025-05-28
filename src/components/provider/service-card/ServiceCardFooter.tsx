
import React from 'react';
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";

interface ServiceCardFooterProps {
  service: any;
  isSaved: boolean;
  onSaveForLater: () => void;
  onAddToBasket: () => void;
  onBookService: () => void;
}

const ServiceCardFooter: React.FC<ServiceCardFooterProps> = ({
  service,
  isSaved,
  onSaveForLater,
  onAddToBasket,
  onBookService
}) => {
  return (
    <div className="bg-gray-50 p-4 flex justify-between items-center">
      <div className="space-x-2 rtl:space-x-reverse">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onSaveForLater}
          className={isSaved ? "text-brand-600 border-brand-500" : ""}
        >
          {isSaved ? (
            <BookmarkCheck className="h-4 w-4 ml-1" />
          ) : (
            <Bookmark className="h-4 w-4 ml-1" />
          )}
          {isSaved ? "שמור" : "שמור לאחר כך"}
        </Button>
        <Button variant="outline" size="sm" onClick={onAddToBasket}>
          הוסף לסל
        </Button>
      </div>
      <Button onClick={onBookService}>
        הזמן עכשיו
      </Button>
    </div>
  );
};

export default ServiceCardFooter;
