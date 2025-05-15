
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, MapPin, MessageSquare, Calendar, Phone, Star } from "lucide-react";

interface ProfileSidebarProps {
  provider: {
    name: string;
    description?: string;
    logo_url?: string;
    address?: string;
    email?: string;
    phone?: string;
    website?: string;
  };
}

const ProfileSidebar = ({ provider }: ProfileSidebarProps) => {
  return (
    <div className="lg:col-span-1 space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
              <img 
                src={provider.logo_url || "/placeholder.svg"} 
                alt={provider.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold flex items-center gap-2" dir="rtl">
              {provider.name}
            </h1>
            <p className="text-gray-600 mb-4" dir="rtl">
              {provider.description && provider.description.substring(0, 80)}...
            </p>
            <div className="flex items-center mb-4">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <span className="ml-1 font-medium">4.9</span>
              <span className="text-gray-500 ml-1">(87 חוות דעת)</span>
            </div>
            
            {provider.address && (
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 ml-2" />
                <span dir="rtl">{provider.address}</span>
              </div>
            )}
            
            <div className="border-t w-full my-4"></div>
            
            <div className="space-y-4 w-full">
              <Button className="w-full" dir="rtl">
                <MessageSquare className="h-4 w-4 ml-2" />
                צור קשר
              </Button>
              <Button variant="outline" className="w-full" dir="rtl">
                <Calendar className="h-4 w-4 ml-2" />
                בדוק זמינות
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-3 text-right">מידע נוסף</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="text-right">
                <p className="text-sm font-medium">דוא"ל</p>
                <p className="text-sm text-gray-600" dir="ltr">{provider.email || 'לא צוין'}</p>
              </div>
              <Globe className="h-5 w-5 text-gray-500 mr-auto ml-3 mt-0.5" />
            </div>
            
            {provider.phone && (
              <div className="flex items-start">
                <div className="text-right">
                  <p className="text-sm font-medium">טלפון</p>
                  <p className="text-sm text-gray-600" dir="ltr">{provider.phone}</p>
                </div>
                <Phone className="h-5 w-5 text-gray-500 mr-auto ml-3 mt-0.5" />
              </div>
            )}
            
            {provider.website && (
              <div className="flex items-start">
                <div className="text-right">
                  <p className="text-sm font-medium">אתר</p>
                  <a href={provider.website.startsWith('http') ? provider.website : `https://${provider.website}`} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-sm text-blue-600 hover:underline" dir="ltr">
                    {provider.website}
                  </a>
                </div>
                <Globe className="h-5 w-5 text-gray-500 mr-auto ml-3 mt-0.5" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSidebar;
