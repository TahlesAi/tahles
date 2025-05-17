
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// דוגמאות לתוצאות חיפוש זמניות
const MOCK_RESULTS = [
  {
    id: "1",
    name: "קייטרינג טעמים",
    description: "קייטרינג טעמים יספק לכם חוויה קולינרית בלתי נשכחת לאירוע שלכם",
    price: "₪180-220 לאורח",
    kosher: "כשר למהדרין",
    menuType: "meat",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "2",
    name: "דלישס קייטרינג",
    description: "מבחר תפריטים עשירים ומגוונים בהתאמה אישית",
    price: "₪160-200 לאורח",
    kosher: "כשר",
    menuType: "mixed",
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1565538420870-da08ff96a207?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "3",
    name: "טאבולה קייטרינג",
    description: "אוכל חלבי מעולה בסגנון ים תיכוני",
    price: "₪140-180 לאורח",
    kosher: "כשר",
    menuType: "dairy",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  }
];

// אזורים בישראל
const REGIONS = [
  "רמת הגולן",
  "גליל עליון",
  "טבריה והסביבה",
  "חיפה והסביבה",
  "צפון השרון",
  "תל אביב וגוש דן",
  "ירושלים",
  "השפלה",
  "דרום",
  "אילת"
];

interface FilterProps {
  onResultsFound: (results: any[], formData: any) => void;
  onNoResults: (formData: any) => void;
}

const CateringFilterFlow: React.FC<FilterProps> = ({ onResultsFound, onNoResults }) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    kosher: "",
    menuType: "",
    regions: [] as string[],
    guestCount: 100,
    date: null as Date | null,
    budgetPerGuest: [150, 250],
    contactInfo: {
      name: "",
      email: "",
      phone: ""
    }
  });
  
  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };
  
  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const toggleRegion = (region: string) => {
    setFormData(prev => {
      const regions = [...prev.regions];
      
      if (regions.includes(region)) {
        return {
          ...prev,
          regions: regions.filter(r => r !== region)
        };
      } else {
        return {
          ...prev,
          regions: [...regions, region]
        };
      }
    });
  };
  
  const handleSubmit = () => {
    // במקום לשמור ב-Supabase, אנחנו נשתמש בתוצאות קבועות מראש לצורך הדגמה
    let filteredResults = [...MOCK_RESULTS];
    
    // פילטור לפי כשרות
    if (formData.kosher) {
      if (formData.kosher === "yes") {
        filteredResults = filteredResults.filter(result => result.kosher);
      } else {
        filteredResults = filteredResults.filter(result => !result.kosher);
      }
    }
    
    // פילטור לפי סוג תפריט
    if (formData.menuType) {
      filteredResults = filteredResults.filter(result => result.menuType === formData.menuType);
    }
    
    // נודיע אם נמצאו תוצאות או לא
    if (filteredResults.length > 0) {
      toast.success("נמצאו הצעות מתאימות!");
      onResultsFound(filteredResults, formData);
    } else {
      toast.info("לא נמצאו תוצאות מתאימות לחיפוש");
      onNoResults(formData);
    }
  };
  
  // בדיקה אם השלב הנוכחי מוכן להמשך
  const isCurrentStepValid = () => {
    switch (step) {
      case 1:
        return formData.kosher !== "";
      case 2:
        return formData.menuType !== "";
      case 3:
        return formData.regions.length > 0;
      case 4:
        return true; // שלב 4 תמיד תקין להמשך כי יש ערכי ברירת מחדל
      default:
        return false;
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      {/* סרגל התקדמות */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3, 4].map(num => (
            <div 
              key={num}
              className={`h-3 w-3 rounded-full ${
                num === step ? 'bg-brand-600' : 
                num < step ? 'bg-green-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-brand-600 transition-all duration-300" 
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>
      
      {/* שלב 1: כשרות */}
      {step === 1 && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-6 text-center">האם אתם זקוקים לקייטרינג כשר?</h3>
            <RadioGroup
              value={formData.kosher}
              onValueChange={(value) => updateFormData('kosher', value)}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 space-x-reverse">
                <RadioGroupItem value="yes" id="kosher-yes" />
                <Label htmlFor="kosher-yes" className="cursor-pointer">כן, אנחנו צריכים קייטרינג כשר</Label>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <RadioGroupItem value="no" id="kosher-no" />
                <Label htmlFor="kosher-no" className="cursor-pointer">לא, כשרות לא נחוצה</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      )}
      
      {/* שלב 2: סוג התפריט */}
      {step === 2 && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-6 text-center">איזה סוג תפריט אתם מעוניינים?</h3>
            
            <RadioGroup
              value={formData.menuType}
              onValueChange={(value) => updateFormData('menuType', value)}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 space-x-reverse">
                <RadioGroupItem value="meat" id="menu-meat" />
                <Label htmlFor="menu-meat" className="cursor-pointer">בשרי</Label>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <RadioGroupItem value="dairy" id="menu-dairy" />
                <Label htmlFor="menu-dairy" className="cursor-pointer">חלבי</Label>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <RadioGroupItem value="fish" id="menu-fish" />
                <Label htmlFor="menu-fish" className="cursor-pointer">דגים</Label>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <RadioGroupItem value="mixed" id="menu-mixed" />
                <Label htmlFor="menu-mixed" className="cursor-pointer">מעורב</Label>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <RadioGroupItem value="vegan" id="menu-vegan" />
                <Label htmlFor="menu-vegan" className="cursor-pointer">טבעוני/צמחוני</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      )}
      
      {/* שלב 3: אזור גיאוגרפי */}
      {step === 3 && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-6 text-center">באיזה אזור יתקיים האירוע?</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {REGIONS.map((region) => (
                <div 
                  key={region}
                  onClick={() => toggleRegion(region)}
                  className={`border rounded-lg p-3 cursor-pointer transition-all ${
                    formData.regions.includes(region)
                      ? 'border-brand-600 bg-brand-50'
                      : 'border-gray-200 hover:border-brand-300'
                  }`}
                >
                  <div className="flex items-center">
                    {formData.regions.includes(region) && (
                      <Check className="h-4 w-4 text-brand-600 ml-2" />
                    )}
                    <span>{region}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* שלב 4: פרטים נוספים */}
      {step === 4 && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-6 text-center">פרטים נוספים</h3>
            
            <div className="space-y-6">
              {/* כמות אורחים */}
              <div>
                <Label className="block mb-2">כמות אורחים משוערת: {formData.guestCount}</Label>
                <Slider
                  value={[formData.guestCount]}
                  min={20}
                  max={500}
                  step={5}
                  onValueChange={(value) => updateFormData('guestCount', value[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>20</span>
                  <span>500</span>
                </div>
              </div>
              
              {/* תאריך האירוע */}
              <div>
                <Label className="block mb-2">תאריך האירוע</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-right font-normal",
                        !formData.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="ml-2 h-4 w-4" />
                      {formData.date ? format(formData.date, "dd/MM/yyyy") : "בחרו תאריך"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.date || undefined}
                      onSelect={(date) => updateFormData('date', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* תקציב לאורח */}
              <div>
                <Label className="block mb-2">
                  תקציב לאורח: ₪{formData.budgetPerGuest[0]} - ₪{formData.budgetPerGuest[1]}
                </Label>
                <Slider
                  value={formData.budgetPerGuest}
                  min={50}
                  max={500}
                  step={10}
                  onValueChange={(value) => updateFormData('budgetPerGuest', value)}
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>₪50</span>
                  <span>₪500</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* כפתורי ניווט */}
      <div className="flex justify-between mt-6">
        {step > 1 ? (
          <Button 
            variant="outline" 
            onClick={handlePrevStep}
            className="flex items-center"
          >
            <ChevronRight className="ml-1 h-4 w-4" />
            חזרה
          </Button>
        ) : (
          <div></div>
        )}
        
        <Button
          onClick={handleNextStep}
          disabled={!isCurrentStepValid()}
          className="flex items-center"
        >
          {step < 4 ? (
            <>
              המשך
              <ChevronLeft className="mr-1 h-4 w-4" />
            </>
          ) : (
            "חפש קייטרינג"
          )}
        </Button>
      </div>
      
      {/* סיכום פילטרים שנבחרו */}
      {formData.kosher || formData.menuType || formData.regions.length > 0 ? (
        <div className="mt-8">
          <p className="text-sm text-gray-500 mb-2">פילטרים פעילים:</p>
          <div className="flex flex-wrap gap-2">
            {formData.kosher && (
              <Badge variant="outline">
                {formData.kosher === "yes" ? "כשר" : "לא כשר"}
              </Badge>
            )}
            
            {formData.menuType && (
              <Badge variant="outline">
                {formData.menuType === "meat" ? "בשרי" : 
                 formData.menuType === "dairy" ? "חלבי" :
                 formData.menuType === "fish" ? "דגים" :
                 formData.menuType === "mixed" ? "מעורב" : "טבעוני/צמחוני"}
              </Badge>
            )}
            
            {formData.regions.length > 0 && (
              <Badge variant="outline">
                {formData.regions.length === 1 ? formData.regions[0] : `${formData.regions.length} אזורים`}
              </Badge>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CateringFilterFlow;
