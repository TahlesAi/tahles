import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, MapPin, Users, DollarSign, Tag, Search } from "lucide-react";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

interface SearchCriteria {
  date?: Date;
  startTime?: string;
  endTime?: string;
  location?: string;
  concept?: string;
  participants?: string;
  category?: string;
  subcategory?: string;
  budget?: string;
}

const concepts = [
  'אירוע חברה',
  'אירוע משפחתי', 
  'מפגש חברתי',
  'ילדים ונוער'
];

const participantRanges = [
  '1-50',
  '51-100', 
  '101-200',
  '201-500',
  '501+'
];

const budgetRanges = [
  '1-1000',
  '1001-3000',
  '3001-6000', 
  '6001-10000',
  '10001+'
];

const categories = [
  { id: 'locations', name: 'לוקיישנים' },
  { id: 'food-drinks', name: 'מזון ומשקאות' },
  { id: 'performances-stage', name: 'מופעים ובמה' },
  { id: 'production-services', name: 'שירותי הפקה' },
  { id: 'lectures-training', name: 'הרצאות והכשרות' },
  { id: 'attractions', name: 'אטרקציות' }
];

const subcategoriesByCategory: Record<string, string[]> = {
  'locations': ['אולמות', 'גנים', 'חופים', 'בתי מלון', 'חללי עבודה'],
  'food-drinks': ['קייטרינג', 'שף פרטי', 'בר שירותים', 'משאיות מזון'],
  'performances-stage': ['אמני חושים', 'זמרים ונגנים', 'סטנדאפיסטים', 'קוסמים', 'רקדנים'],
  'production-services': ['הפקה', 'הגברה', 'צילום', 'אבטחה', 'קישוט'],
  'lectures-training': ['העשרה', 'פיתוח אישי', 'גיבוש צוות', 'הכשרות מקצועיות'],
  'attractions': ['כרטיסים לאירועים', 'מתנות', 'טיולים', 'אטרקציות']
};

export const GuidedSearchForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [criteria, setCriteria] = useState<SearchCriteria>({});
  const [calendarOpen, setCalendarOpen] = useState(false);
  const navigate = useNavigate();

  const totalSteps = 7;

  const updateCriteria = (key: keyof SearchCriteria, value: string | Date) => {
    setCriteria(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to results with search criteria - even if empty for testing
      const searchParams = new URLSearchParams();
      Object.entries(criteria).forEach(([key, value]) => {
        if (value) {
          searchParams.set(key, value.toString());
        }
      });
      // הוספת פרמטר מצב בדיקה
      searchParams.set('testMode', 'true');
      navigate(`/search-results?${searchParams.toString()}`);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // הסרת תנאי חובה לבדיקה
  const canProceed = () => {
    return true; // תמיד מאפשר מעבר למצב בדיקה
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CalendarIcon className="mx-auto h-12 w-12 text-blue-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">מתי האירוע שלכם?</h2>
              <p className="text-gray-600">בחרו תאריר ושעות התחלה וסיום (לא חובה)</p>
            </div>
            
            <div className="space-y-4">
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-right">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {criteria.date ? format(criteria.date, "PPP", { locale: he }) : "בחר תאריך (לא חובה)"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={criteria.date}
                    onSelect={(date) => {
                      updateCriteria('date', date || new Date());
                      setCalendarOpen(false);
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime">שעת התחלה (לא חובה)</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={criteria.startTime || ''}
                    onChange={(e) => updateCriteria('startTime', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">שעת סיום (לא חובה)</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={criteria.endTime || ''}
                    onChange={(e) => updateCriteria('endTime', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <MapPin className="mx-auto h-12 w-12 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">איפה האירוע?</h2>
              <p className="text-gray-600">הזינו את מיקום האירוע (לא חובה)</p>
            </div>
            
            <div>
              <Label htmlFor="location">מיקום בארץ (לא חובה)</Label>
              <Input
                id="location"
                placeholder="למשל: תל אביב, ירושלים, חיפה..."
                value={criteria.location || ''}
                onChange={(e) => updateCriteria('location', e.target.value)}
                className="text-right"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Tag className="mx-auto h-12 w-12 text-purple-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">איזה סוג אירוע?</h2>
              <p className="text-gray-600">בחרו את הקונספט המתאים (לא חובה)</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {concepts.map((concept) => (
                <Button
                  key={concept}
                  variant={criteria.concept === concept ? "default" : "outline"}
                  className="h-16 text-lg"
                  onClick={() => updateCriteria('concept', concept)}
                >
                  {concept}
                </Button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Users className="mx-auto h-12 w-12 text-orange-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">כמה משתתפים?</h2>
              <p className="text-gray-600">בחרו את מספר המשתתפים הצפוי (לא חובה)</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {participantRanges.map((range) => (
                <Button
                  key={range}
                  variant={criteria.participants === range ? "default" : "outline"}
                  className="h-12 text-lg"
                  onClick={() => updateCriteria('participants', range)}
                >
                  {range} משתתפים
                </Button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Tag className="mx-auto h-12 w-12 text-red-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">איזה סוג שירות?</h2>
              <p className="text-gray-600">בחרו את הקטגוריה הראשית (לא חובה)</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={criteria.category === category.id ? "default" : "outline"}
                  className="h-16 text-lg"
                  onClick={() => {
                    updateCriteria('category', category.id);
                    updateCriteria('subcategory', ''); // Reset subcategory
                  }}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Tag className="mx-auto h-12 w-12 text-indigo-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">איזה שירות ספציפי?</h2>
              <p className="text-gray-600">בחרו את תת הקטגוריה (לא חובה)</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {criteria.category && subcategoriesByCategory[criteria.category]?.map((subcategory) => (
                <Button
                  key={subcategory}
                  variant={criteria.subcategory === subcategory ? "default" : "outline"}
                  className="h-12 text-sm"
                  onClick={() => updateCriteria('subcategory', subcategory)}
                >
                  {subcategory}
                </Button>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <DollarSign className="mx-auto h-12 w-12 text-green-600 mb-4" />
              <h2 className="text-2xl font-bold mb-2">מה התקציב?</h2>
              <p className="text-gray-600">בחרו את מסגרת התקציב בש"ח (לא חובה)</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {budgetRanges.map((budget) => (
                <Button
                  key={budget}
                  variant={criteria.budget === budget ? "default" : "outline"}
                  className="h-12 text-lg"
                  onClick={() => updateCriteria('budget', budget)}
                >
                  ₪{budget}
                </Button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
              בואו נמצא לכם את הפתרון המושלם
            </CardTitle>
            <div className="flex justify-center space-x-2 mb-4">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i + 1 <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600">שלב {currentStep} מתוך {totalSteps}</p>
            
            {/* הודעת מצב בדיקה */}
            <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mt-2">
              <p className="text-xs text-yellow-800">
                🧪 מצב בדיקה: כל השדות לא חובה - ניתן לדלג ולעבור בחופשיות
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            {renderStep()}
            
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                חזור
              </Button>
              
              <Button
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {currentStep === totalSteps ? (
                  <><Search className="w-4 h-4 mr-2" /> חפש פתרונות</>
                ) : (
                  'המשך'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
