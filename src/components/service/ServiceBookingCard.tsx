
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark, Share2, User, MapPin, Star } from "lucide-react";
import { toast } from "sonner";
import ServiceBookingTerms from "./ServiceBookingTerms";

interface ServiceBookingCardProps {
  service: any;
  provider: any;
  averageRating: number;
  reviewCount: number;
  isSaved: boolean;
  toggleSave: () => void;
}

const ServiceBookingCard = ({ 
  service, 
  provider, 
  averageRating, 
  reviewCount, 
  isSaved, 
  toggleSave 
}: ServiceBookingCardProps) => {
  const navigate = useNavigate();
  const [showTerms, setShowTerms] = useState(false);

  const handleBookNowClick = () => {
    setShowTerms(true);
  };

  const handleProceedWithBooking = () => {
    navigate(`/booking/${service.id}`);
  };

  return (
    <div className="border rounded-lg bg-white p-6 shadow-sm sticky top-20">
      <div className="flex justify-between items-start mb-4">
        <div className="text-2xl font-bold">{service.price_range}</div>
        <div className="text-gray-500">{service.price_unit || 'לאירוע'}</div>
      </div>
      
      <div className="border-t border-b py-4 my-4">
        {!showTerms ? (
          <Button 
            className="w-full bg-brand-600 hover:bg-brand-700 mb-3"
            onClick={handleBookNowClick}
          >
            הזמן עכשיו
          </Button>
        ) : (
          <ServiceBookingTerms 
            serviceId={service.id}
            onProceed={handleProceedWithBooking}
          />
        )}
        
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={toggleSave}
        >
          {isSaved ? (
            <>
              <Bookmark className="ml-2 h-4 w-4 fill-current" />
              נשמר למועדפים
            </>
          ) : (
            <>
              <Bookmark className="ml-2 h-4 w-4" />
              שמור למועדפים
            </>
          )}
        </Button>
      </div>
      
      <div className="space-y-3 text-sm">
        <div className="flex">
          <div className="w-5 text-gray-500 ml-2">
            <User className="h-4 w-4" />
          </div>
          <div>איש קשר: {provider.contact_person || provider.name}</div>
        </div>
        
        {(provider.address || service.location) && (
          <div className="flex">
            <div className="w-5 text-gray-500 ml-2">
              <MapPin className="h-4 w-4" />
            </div>
            <div>מיקום: {provider.address || service.location}</div>
          </div>
        )}
        
        {reviewCount > 0 && (
          <div className="flex">
            <div className="w-5 text-gray-500 ml-2">
              <Star className="h-4 w-4" />
            </div>
            <div>דירוג: {averageRating.toFixed(1)} ({reviewCount} ביקורות)</div>
          </div>
        )}
      </div>
      
      <Card className="mt-4 border-brand-100 bg-brand-50">
        <CardContent className="p-3 text-sm">
          <p className="font-medium mb-1 text-brand-700">אחריות מלאה</p>
          <p className="text-gray-600">
            אנו מבטיחים חוויית לקוח מושלמת ושירות אמין.
            אחריות על כל השירותים המוצעים באתר.
          </p>
        </CardContent>
      </Card>
      
      <Button 
        variant="ghost" 
        className="w-full mt-4 text-gray-500"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          toast.success("הקישור הועתק", { description: "כעת ניתן לשתף את השירות עם אחרים" });
        }}
      >
        <Share2 className="ml-2 h-4 w-4" />
        שתף
      </Button>
    </div>
  );
};

export default ServiceBookingCard;
