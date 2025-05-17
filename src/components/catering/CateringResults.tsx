
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { mockCateringCompanies, getFilteredCateringCompanies } from "@/lib/mockCateringData";

interface CateringResultsProps {
  results?: any[];
  filterData?: any;
  onBackToFilters: () => void;
}

const CateringResults = ({ results, filterData, onBackToFilters }: CateringResultsProps) => {
  // Use provided results or get filtered results from mock data
  const displayResults = results?.length ? results : getFilteredCateringCompanies(filterData);
  
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">תוצאות חיפוש קייטרינג</h2>
          <p className="text-gray-600">
            נמצאו {displayResults.length} שירותי קייטרינג העונים לדרישות שלך
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onBackToFilters}
          className="mt-3 md:mt-0"
        >
          ↩️ חזרה לסינון
        </Button>
      </div>
      
      {/* Filter summary */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="text-sm text-gray-600 mb-2">פילטרים פעילים:</div>
        <div className="flex flex-wrap gap-2">
          {filterData?.kosher !== undefined && (
            <Badge variant="outline">{filterData.kosher ? 'כשר' : 'לא כשר'}</Badge>
          )}
          {filterData?.menuType && (
            <Badge variant="outline">סגנון: {filterData.menuType}</Badge>
          )}
          {filterData?.regions?.length > 0 && (
            <Badge variant="outline">אזורים: {filterData.regions.join(', ')}</Badge>
          )}
          {filterData?.guestCount && (
            <Badge variant="outline">{filterData.guestCount} מוזמנים</Badge>
          )}
          {filterData?.budgetPerGuest && (
            <Badge variant="outline">תקציב: {filterData.budgetPerGuest} ₪ למנה</Badge>
          )}
        </div>
      </div>
      
      {/* Results grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {displayResults.map((catering) => (
          <Card key={catering.id} className="overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src={catering.featuredImage} 
                alt={catering.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{catering.name}</CardTitle>
                  <CardDescription>{catering.city}</CardDescription>
                </div>
                <div className="flex items-center bg-brand-50 px-2 py-1 rounded">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                  <span className="font-medium">{catering.rating}</span>
                  <span className="text-xs text-gray-500 mr-1">({catering.reviewCount})</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3 line-clamp-2">{catering.description}</p>
              <div className="flex flex-wrap gap-1 mb-2">
                {catering.kosher && (
                  <Badge variant="outline" className="bg-green-50">
                    כשר {catering.kosherType}
                  </Badge>
                )}
                {catering.menuTypes.slice(0, 2).map((type: string) => (
                  <Badge key={type} variant="outline">
                    {type}
                  </Badge>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                <div>מחיר למנה: {catering.pricePerGuest.min}-{catering.pricePerGuest.max} ₪</div>
                <div>מתאים ל: {catering.minGuests}-{catering.maxGuests} מוזמנים</div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline" size="sm">
                לפרטים נוספים
              </Button>
              <Button size="sm">
                יצירת קשר
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {displayResults.length === 0 && (
        <div className="text-center py-8">
          <h3 className="text-lg font-semibold mb-2">לא נמצאו תוצאות מתאימות</h3>
          <p className="text-gray-600 mb-4">נסו להרחיב את החיפוש או לשנות את הפילטרים</p>
          <Button onClick={onBackToFilters}>חזרה לסינון</Button>
        </div>
      )}
    </div>
  );
};

export default CateringResults;
