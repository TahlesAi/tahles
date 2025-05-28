
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { GuidedSearchData } from "../GuidedSearchModal";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

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
    description: "חוויה בלתי נשכחת של מנטליזם וקסמים",
    price: "₪2,500",
    provider: "נטע ברסלר"
  },
  {
    id: "2", 
    name: "להקת אנרג'י",
    image: "https://i.ibb.co/wQDXD7y/band.jpg",
    category: "מופעים מוזיקליים",
    description: "להקה מקצועית לכל סוגי האירועים",
    price: "₪4,000",
    provider: "אנרג'י מיוזיק"
  },
  {
    id: "3",
    name: "קייטרינג גורמה",
    image: "https://i.ibb.co/mH4n6Yn/catering.jpg", 
    category: "קייטרינג",
    description: "אוכל איכותי ושירות מעולה לאירועים",
    price: "₪150 למנה",
    provider: "גורמה קייטרינג"
  }
];

const ResultsStep = ({ searchData, onBack, onSubmit }: ResultsStepProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showNoResultsForm, setShowNoResultsForm] = useState(false);
  
  const handleSubmit = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      onSubmit();
    }, 1500);
  };
  
  const handleNoResultsSubmit = () => {
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
          {searchData.eventStartTime && (
            <li><strong>שעת התחלה:</strong> {searchData.eventStartTime}</li>
          )}
          {searchData.eventEndTime && (
            <li><strong>שעת סיום:</strong> {searchData.eventEndTime}</li>
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
          {searchData.conceptDetails && <li><strong>פרטים:</strong> {searchData.conceptDetails}</li>}
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
          <Card key={rec.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={rec.image} 
                alt={rec.name} 
                className="w-full h-40 object-cover"
              />
              <div className="absolute top-2 right-2 bg-primary/90 text-white px-2 py-1 rounded text-xs">
                {rec.category}
              </div>
            </div>
            <CardContent className="p-3">
              <h4 className="font-medium mb-1">{rec.name}</h4>
              <p className="text-xs text-gray-500 mb-1">{rec.provider}</p>
              <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-brand-600">{rec.price}</span>
                <Link to={`/enhanced-services/${rec.id}`}>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="h-3 w-3 ml-1" />
                    צפה
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* מציע חלופה אם לא מצאו את מה שחיפשו */}
      <div className="border-t pt-6">
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <h4 className="font-medium mb-2 text-orange-800">לא מצאתם את השירות המבוקש?</h4>
            <p className="text-sm text-orange-700 mb-3">
              השאירו לנו פרטים ונדאג לחזור אליכם עם מענה מותאם אישית תוך 24 שעות
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowNoResultsForm(!showNoResultsForm)}
              className="border-orange-300 text-orange-700 hover:bg-orange-100"
            >
              השאר פרטים לחיפוש נוסף
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {showNoResultsForm && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h4 className="font-medium mb-3 text-blue-800">פרטים לחיפוש נוסף</h4>
            <div className="space-y-3">
              <div>
                <Label htmlFor="name-alt">שם מלא:</Label>
                <Input 
                  id="name-alt" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="הכנס את שמך"
                  className="text-right" 
                />
              </div>
              
              <div>
                <Label htmlFor="phone-alt">טלפון:</Label>
                <Input 
                  id="phone-alt" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="הכנס מספר טלפון"
                  className="text-right" 
                />
              </div>
              
              <div>
                <Label htmlFor="email-alt">דוא״ל:</Label>
                <Input 
                  id="email-alt" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="הכנס כתובת דוא״ל"
                  className="text-right" 
                />
              </div>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox 
                  id="terms-alt" 
                  checked={agreeToTerms}
                  onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                />
                <Label htmlFor="terms-alt" className="text-sm">
                  אני מאשר/ת קבלת הצעות ועדכונים מתכלס למייל
                </Label>
              </div>
              
              <Button 
                onClick={handleNoResultsSubmit} 
                disabled={!isFormValid || isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    שולח בקשה...
                  </>
                ) : (
                  'שלח בקשה לחיפוש נוסף'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="pt-4">
        <h3 className="text-lg font-medium mb-3">מעוניינים בהמלצות אלו? השאירו פרטים:</h3>
        
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
