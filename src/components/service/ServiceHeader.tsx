
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star, MapPin, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface ServiceHeaderProps {
  service: any;
  provider: any;
  averageRating: number;
  reviewCount: number;
}

const ServiceHeader = ({ service, provider, averageRating, reviewCount }: ServiceHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      {/* כפתור חזרה */}
      <div className="mb-4">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowRight className="h-4 w-4" />
          חזרה
        </Button>
      </div>

      <h1 className="text-3xl font-bold mb-2">{service.name}</h1>
      
      <div className="flex flex-wrap gap-y-2 items-center text-sm text-gray-600 mb-4">
        {reviewCount > 0 && (
          <div className="flex items-center ml-4">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 ml-1" />
            <span className="font-medium">{averageRating.toFixed(1)}</span>
            <span className="text-gray-500 mr-1">({reviewCount} ביקורות)</span>
          </div>
        )}
        
        {service.location && (
          <div className="flex items-center ml-4">
            <MapPin className="h-4 w-4 ml-1" />
            <span>{service.location}</span>
          </div>
        )}
        
        {service.duration && (
          <div className="flex items-center ml-4">
            <Clock className="h-4 w-4 ml-1" />
            <span>{service.duration}</span>
          </div>
        )}
      </div>
      
      {/* Provider Info */}
      <Link 
        to={`/providers/${provider.id}`}
        className="flex items-center mb-6 hover:bg-gray-50 p-2 rounded-lg transition-colors"
      >
        <Avatar className="h-12 w-12">
          <AvatarImage src={provider.logo_url} alt={provider.name} />
          <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="mr-3">
          <div className="font-medium">{provider.name}</div>
          <div className="text-sm text-gray-500">ספק שירות מאומת</div>
        </div>
      </Link>
      
      {/* Description */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">תיאור השירות</h2>
        <p className="text-gray-700 leading-relaxed">{service.description}</p>
      </div>
      
      {/* Service Features */}
      {service.features && Array.isArray(service.features) && service.features.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">יתרונות השירות</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {service.features.map((feature: string, idx: number) => (
              <div key={idx} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-brand-500 shrink-0 mt-0.5 ml-2" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceHeader;
