
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { GuidedSearchData } from "../GuidedSearchModal";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { he } from "date-fns/locale";

interface ResultsStepProps {
  searchData: GuidedSearchData;
  onBack: () => void;
  onSubmit: () => void;
}

// מידע מוק לדוגמה - בהמשך זה יגיע מהשרת
const mockRecommendations = [
  {
    id: "1",
    name: "נטע ברסלר - אמן החושים",
    image: "https://i.ibb.co/WxDqgWM/mentalist.jpg",
    category: "אמני חושים",
    description: "חוויה בלתי נשכחת של מנטליזם וקסמים"
  },
  {
    id: "2",
    name: "להקת אנרג'י",
    image: "https://i.ibb.co/wQDXD7y/band.jpg", 
    category: "מופעים מוזיקליים",
    description: "להקה מקצועית לכל סוגי האירועים"
  },
  {
    id: "3",
    name: "קייטרינג גורמה",
    image: "https://i.ibb.co/mH4n6Yn/catering.jpg",
    category: "קייטרינג",
    description: "אוכל איכותי ושירות מעולה לאירועים"
  }
];

const ResultsStep = ({ searchData, onBack, onSubmit }: ResultsStepProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      onSubmit();
    }, 1500);
  };
  
  const isFormValid = name && phone && email && agreeToTerms;
  
  return (
    <div className="space-y-6 text-right" dir="rtl">
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h4 className="font-medium mb-2">פרטי האירוע:</h4>
        <ul className="text-sm space-y-1">
          {searchData.eventDate && (
            <li><strong>תאריך:</strong> {format(searchData.eventDate, "dd/MM/yyyy", { locale: he })}</li>
          )}
          <li>
            <strong>סוג אירוע:</strong> {' '}
            {searchData.eventType === 'private' ? 'פרטי' : 
             searchData.eventType === 'business' ? 'עסקי' : 
             searchData.eventType === 'mixed' ? 'מעורב' : 
             searchData.eventType === 'children' ? 'ילדים' : 'לא צוין'}
          </li>
          <li><strong>מספר משתתפים:</strong> {searchData.attendeesCount || 'לא צוין'}</li>
          <li><strong>קונספט:</strong> {searchData.eventConcept || 'לא צוין'}</li>
          {searchData.conceptDetails && <li><strong>גיל:</strong> {searchData.conceptDetails}</li>}
          {searchData.conceptAudience && (
            <li>
              <strong>קהל יעד:</strong> {' '}
              {searchData.conceptAudience === 'family' ? 'משפחה' : 
               searchData.conceptAudience === 'friends' ? 'חברים' : 'משולב'}
            </li>
          )}
        </ul>
      </div>
      
      <h3 className="text-lg font-medium">המלצות עבורך:</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockRecommendations.map(rec => (
          <div key={rec.id} className="border rounded-lg overflow-hidden">
            <img 
              src={rec.image} 
              alt={rec.name} 
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                {rec.category}
              </span>
              <h4 className="font-medium mt-2">{rec.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pt-4">
        <h3 className="text-lg font-medium mb-3">השאר פרטים ונחזור אליך בהקדם:</h3>
        
        <div className="space-y-3">
          <div>
            <Label htmlFor="name">שם מלא:</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="הכנס את שמך"
              className="text-right" 
            />
          </div>
          
          <div>
            <Label htmlFor="phone">טלפון:</Label>
            <Input 
              id="phone" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)}
              placeholder="הכנס מספר טלפון"
              className="text-right" 
            />
          </div>
          
          <div>
            <Label htmlFor="email">דוא״ל:</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="הכנס כתובת דוא״ל"
              className="text-right" 
            />
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox 
              id="terms" 
              checked={agreeToTerms}
              onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
            />
            <Label htmlFor="terms" className="text-sm">
              אני מאשר/ת קבלת הצעות ועדכונים מתכלס למייל
            </Label>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button onClick={onBack} variant="outline" className="flex items-center">
          <ChevronRight className="ml-1 h-4 w-4" />
          חזרה
        </Button>
        
        <Button 
          onClick={handleSubmit} 
          disabled={!isFormValid || isLoading}
          className="flex items-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              שולח...
            </>
          ) : (
            <>
              שלח פרטים
              <ChevronLeft className="mr-1 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ResultsStep;
