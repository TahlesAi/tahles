
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ChevronLeft, Phone, Calendar, Users } from "lucide-react";

interface CateringService {
  id: string;
  name: string;
  description: string;
  price: string;
  kosher?: string;
  menuType?: string;
  rating: number;
  imageUrl: string;
}

interface CateringResultsProps {
  results: CateringService[];
  filterData: any;
  onBackToFilters: () => void;
}

export default function CateringResults({ 
  results, 
  filterData, 
  onBackToFilters 
}: CateringResultsProps) {
  
  const formatDate = (date: Date) => {
    if (!date) return 'לא צוין תאריך';
    return new Intl.DateTimeFormat('he-IL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(date));
  };
  
  // תרגום סוג התפריט
  const getMenuTypeLabel = (type: string) => {
    const menuTypeMap: Record<string, string> = {
      'meat': 'בשרי',
      'dairy': 'חלבי',
      'fish': 'דגים',
      'mixed': 'מעורב',
      'vegan': 'טבעוני'
    };
    return menuTypeMap[type] || type;
  };
  
  return (
    <div>
      <div className="mb-8">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBackToFilters} 
          className="flex items-center mb-4"
        >
          <ChevronLeft className="ml-1 h-4 w-4" />
          חזרה לסינון
        </Button>
        
        <h2 className="text-2xl font-bold mb-2">תוצאות חיפוש קייטרינג</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {filterData.kosher && (
            <Badge variant="outline">
              {filterData.kosher === "yes" ? "כשר" : "ללא כשרות"}
            </Badge>
          )}
          
          {filterData.menuType && (
            <Badge variant="outline">
              {getMenuTypeLabel(filterData.menuType)}
            </Badge>
          )}
          
          {filterData.guestCount && (
            <Badge variant="outline" className="flex items-center">
              <Users className="h-3 w-3 ml-1" />
              {filterData.guestCount} אורחים
            </Badge>
          )}
          
          {filterData.date && (
            <Badge variant="outline" className="flex items-center">
              <Calendar className="h-3 w-3 ml-1" />
              {formatDate(filterData.date)}
            </Badge>
          )}
          
          {filterData.budgetPerGuest && (
            <Badge variant="outline">
              תקציב: ₪{filterData.budgetPerGuest[0]}-₪{filterData.budgetPerGuest[1]} לאורח
            </Badge>
          )}
        </div>
        
        <p className="text-gray-600">נמצאו {results.length} אפשרויות קייטרינג מתאימות</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map(service => (
          <Card key={service.id} className="overflow-hidden">
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={service.imageUrl}
                alt={service.name}
                className="w-full h-full object-cover"
              />
              {service.kosher && (
                <div className="absolute top-2 right-2">
                  <Badge className={service.kosher.includes("מהדרין") ? "bg-blue-600" : "bg-green-600"}>
                    {service.kosher}
                  </Badge>
                </div>
              )}
            </div>
            
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 ml-1" />
                  <span>{service.rating}</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-3">{service.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {service.menuType && (
                  <Badge variant="outline">
                    {getMenuTypeLabel(service.menuType)}
                  </Badge>
                )}
                <Badge variant="secondary">{service.price}</Badge>
              </div>
            </CardContent>
            
            <CardFooter className="border-t px-4 py-3 flex justify-between">
              <Button variant="outline" className="flex items-center">
                <Phone className="h-4 w-4 ml-2" />
                יצירת קשר
              </Button>
              <Button>הזמנה</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {results.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-3">לא נמצאו תוצאות מתאימות</h3>
          <p className="text-gray-600 mb-6">
            לא מצאנו קייטרינג שתואם את כל הדרישות שלך. אנא נסו להרחיב את החיפוש או השאירו פרטים לסיוע אישי.
          </p>
          <Button onClick={onBackToFilters}>חזרה לסינון</Button>
        </div>
      )}
    </div>
  );
}
