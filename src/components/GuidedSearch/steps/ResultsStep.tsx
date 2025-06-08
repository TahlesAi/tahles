
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGuidedSearchStorage } from '@/hooks/useGuidedSearchStorage';
import { Star, MapPin, Users, Clock, Eye, Heart, BookOpen } from 'lucide-react';

interface ResultsStepProps {
  searchData?: ReturnType<typeof useGuidedSearchStorage>['data'];
  onNext: () => void;
  onBack: () => void;
  onSubmit?: () => void;
}

const ResultsStep: React.FC<ResultsStepProps> = ({ searchData, onNext, onBack, onSubmit }) => {
  // Mock data for demonstration
  const mockResults = [
    {
      id: 1,
      name: "נטע ברסלר - אומן החושים",
      provider: "אומני חושים מקצועיים",
      description: "מופע אומן חושים מרתק ומותאם אישית לכל סוג אירוע",
      price: 2500,
      rating: 4.8,
      reviewCount: 127,
      location: "תל אביב והמרכז",
      duration: "45 דקות",
      audienceSize: "עד 200 אנשים",
      imageUrl: "/api/placeholder/300/200",
      specialties: ["קריאת מחשבות", "קסמים", "אינטראקציה"]
    },
    {
      id: 2,
      name: "דני המנטליסט",
      provider: "הפקות אירועים פרימיום",
      description: "מופע מנטליזם ברמה גבוהה עם אלמנטים של קומדיה",
      price: 3200,
      rating: 4.9,
      reviewCount: 89,
      location: "כל הארץ",
      duration: "60 דקות",
      audienceSize: "עד 300 אנשים",
      imageUrl: "/api/placeholder/300/200",
      specialties: ["מנטליזם", "קומדיה", "קהל מבוגרים"]
    }
  ];

  return (
    <div className="space-y-6" dir="rtl">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <Star className="h-6 w-6 text-white" fill="currentColor" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">התוצאות המושלמות עבורך!</h2>
            <p className="text-gray-600 mt-1">
              מצאנו {mockResults.length} שירותים מומלצים על פי הקריטריונים שלך
            </p>
          </div>
        </div>
      </div>

      {/* Search Summary */}
      <Card className="bg-gradient-to-l from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <BookOpen className="h-5 w-5 ml-2 text-blue-600" />
            סיכום החיפוש שלך:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {searchData?.eventDate && (
              <div className="flex items-center text-gray-700">
                <Clock className="h-4 w-4 ml-1 text-blue-500" />
                <span>{new Date(searchData.eventDate).toLocaleDateString('he-IL')}</span>
              </div>
            )}
            {searchData?.eventLocation && (
              <div className="flex items-center text-gray-700">
                <MapPin className="h-4 w-4 ml-1 text-green-500" />
                <span>{typeof searchData.eventLocation === 'string' ? searchData.eventLocation : searchData.eventLocation.city}</span>
              </div>
            )}
            {searchData?.attendeesCount && (
              <div className="flex items-center text-gray-700">
                <Users className="h-4 w-4 ml-1 text-purple-500" />
                <span>{searchData.attendeesCount} משתתפים</span>
              </div>
            )}
            {searchData?.budget && (
              <div className="flex items-center text-gray-700">
                <span className="ml-1">💰</span>
                <span>₪{searchData.budget.min}-{searchData.budget.max}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid gap-6">
        {mockResults.map((result, index) => (
          <Card key={result.id} className="overflow-hidden border-2 border-gray-100 hover:border-brand-300 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-0">
              <div className="flex">
                {/* Ranking Badge */}
                <div className="flex-shrink-0 w-16 bg-gradient-to-b from-brand-500 to-brand-600 flex items-center justify-center">
                  <div className="text-white font-bold text-xl">#{index + 1}</div>
                </div>

                {/* Image */}
                <div className="flex-shrink-0 w-48 h-32 bg-gray-100 relative overflow-hidden">
                  <img
                    src={result.imageUrl}
                    alt={result.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-yellow-500 text-white shadow-md">
                    מומלץ
                  </Badge>
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {result.name}
                      </h3>
                      <p className="text-brand-600 font-medium mb-2">
                        {result.provider}
                      </p>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {result.description}
                      </p>
                      
                      {/* Specialties */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {result.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="text-left mr-4">
                      <div className="text-2xl font-bold text-gray-900">
                        ₪{result.price.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">לאירוע</div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 ml-1" />
                        <span>{result.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 ml-1" />
                        <span>{result.audienceSize}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 ml-1" />
                        <span>{result.location}</span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                      <Star className="h-4 w-4 text-yellow-500 ml-1" fill="currentColor" />
                      <span className="font-semibold text-yellow-700">{result.rating}</span>
                      <span className="text-xs text-yellow-600 mr-1">({result.reviewCount})</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 shadow-md hover:shadow-lg transition-all duration-200">
                      <span className="text-lg ml-2">📅</span>
                      BOOK NOW - הזמן עכשיו
                    </Button>
                    
                    <Button variant="outline" className="px-6 border-2 border-gray-300 hover:border-brand-500 hover:bg-brand-50 transition-all duration-200">
                      <Eye className="h-4 w-4 ml-2" />
                      צפה בפרטים
                    </Button>
                    
                    <Button variant="outline" size="icon" className="border-2 border-gray-300 hover:border-red-400 hover:bg-red-50 transition-all duration-200">
                      <Heart className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="px-8 py-3 border-2 border-gray-300 hover:border-brand-500 hover:bg-brand-50 font-medium transition-all duration-200"
        >
          <span className="ml-2">⬅️</span>
          חזור לשינוי הגדרות
        </Button>
        
        <div className="flex gap-3">
          <Button 
            variant="outline"
            className="px-6 py-3 border-2 border-blue-300 text-blue-700 hover:bg-blue-50 font-medium transition-all duration-200"
          >
            <span className="ml-2">📧</span>
            שלח לי במייל
          </Button>
          
          <Button 
            onClick={onSubmit || onNext}
            className="px-8 py-3 bg-gradient-to-l from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <span className="ml-2">✨</span>
            {onSubmit ? 'שלח פנייה לייעוץ' : 'סיום החיפוש'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsStep;
