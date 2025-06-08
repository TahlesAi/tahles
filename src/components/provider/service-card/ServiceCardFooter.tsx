
import React from 'react';
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck, ShoppingCart, Calendar, Heart } from "lucide-react";

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
    <div className="bg-gradient-to-l from-gray-50 to-gray-100 p-4 border-t border-gray-200">
      <div className="flex justify-between items-center gap-3">
        {/* Left side - Save and Add to basket */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onSaveForLater}
            className={`border-2 transition-all duration-200 ${
              isSaved 
                ? "text-red-600 border-red-300 bg-red-50 hover:bg-red-100" 
                : "border-gray-300 hover:border-red-400 hover:bg-red-50"
            }`}
          >
            {isSaved ? (
              <Heart className="h-4 w-4 ml-1 fill-current" />
            ) : (
              <Heart className="h-4 w-4 ml-1" />
            )}
            {isSaved ? "שמור" : "לשמור"}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onAddToBasket}
            className="border-2 border-gray-300 hover:border-brand-500 hover:bg-brand-50 transition-all duration-200"
          >
            <ShoppingCart className="h-4 w-4 ml-1" />
            הוסף לסל
          </Button>
        </div>

        {/* Right side - Book now */}
        <Button 
          onClick={onBookService}
          className="bg-gradient-to-l from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-semibold px-6 shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Calendar className="h-4 w-4 ml-2" />
          הזמן עכשיו
        </Button>
      </div>
    </div>
  );
};

export default ServiceCardFooter;
