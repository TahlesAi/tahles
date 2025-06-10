
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle,
  Eye,
  Calendar,
  Users,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";

interface NetaBreslerCardProps {
  provider: any;
  services: any[];
}

const NetaBreslerCard: React.FC<NetaBreslerCardProps> = ({ provider, services }) => {
  const formatPrice = (price: number, unit?: string) => {
    return `₪${price?.toLocaleString()}${unit ? ` ${unit}` : ''}`;
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 border border-purple-100" dir="rtl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Provider Profile */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <img 
                    src={provider.logo_url} 
                    alt={provider.name}
                    className="w-24 h-24 object-cover rounded-full mx-auto border-4 border-purple-200"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-1">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{provider.name}</h3>
                <p className="text-purple-600 font-medium mb-3">מנטליסט ואמן המחשבות</p>
                
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-bold mr-1">{provider.rating}</span>
                  </div>
                  <span className="text-gray-600">({provider.review_count} ביקורות)</span>
                </div>
                
                <Badge className="bg-purple-100 text-purple-800 mb-4">
                  ספק מוביל
                </Badge>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>איזור המרכז</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span>{services.length} מוצרים זמינים</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>מאומת ומבוטח</span>
                </div>
              </div>
              
              <div className="text-center">
                <Link to={`/enhanced-providers/${provider.id}`}>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Eye className="h-4 w-4 ml-2" />
                    צפה בפרופיל המלא
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services Grid */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h4 className="text-xl font-bold mb-2">המוצרים שלנו</h4>
            <p className="text-gray-600">
              מגוון מופעי מנטליזם המותאמים לכל סוג של אירוע וקהל
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <Card key={service.id || index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="relative mb-3">
                    <img 
                      src={service.image_url} 
                      alt={service.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded px-2 py-1">
                      <span className="font-bold text-purple-600 text-sm">
                        {formatPrice(service.base_price, service.price_unit)}
                      </span>
                    </div>
                  </div>
                  
                  <h5 className="font-semibold mb-2 text-lg">{service.name}</h5>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{service.duration_minutes} דק'</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{service.min_participants}-{service.max_participants}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link to={`/enhanced-services/${service.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="h-3 w-3 ml-1" />
                        פרטים
                      </Button>
                    </Link>
                    <Link to={`/enhanced-services/${service.id}`}>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        הזמן
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Call to Action */}
          <div className="mt-6 bg-white rounded-lg p-4 border border-purple-100">
            <div className="text-center">
              <h5 className="font-semibold mb-2">מעוניינים במופע מותאם אישית?</h5>
              <p className="text-gray-600 text-sm mb-4">
                צרו איתנו קשר לקבלת הצעת מחיר מותאמת לאירוע שלכם
              </p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 ml-2" />
                  התקשרו
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 ml-2" />
                  שלחו מייל
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetaBreslerCard;
