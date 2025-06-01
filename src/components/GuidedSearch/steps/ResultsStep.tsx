
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, ChevronLeft, ChevronRight, Star, MapPin, DollarSign } from "lucide-react";
import { GuidedSearchData } from "../GuidedSearchModal";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { getGuidedSearchRecommendations } from "@/lib/unifiedMockData";

interface ResultsStepProps {
  searchData: GuidedSearchData;
  onBack: () => void;
  onSubmit: () => void;
}

const ResultsStep = ({ searchData, onBack, onSubmit }: ResultsStepProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showNoResultsForm, setShowNoResultsForm] = useState(false);
  
  const recommendations = getGuidedSearchRecommendations(searchData);
  
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
  
  const formatPrice = (service: any) => {
    if (service.priceUnit === 'לאדם' && searchData.attendeesCount) {
      const totalPrice = service.price * parseInt(searchData.attendeesCount);
      return `₪${totalPrice.toLocaleString()} (₪${service.price} לאדם)`;
    }
    return `₪${service.price.toLocaleString()}`;
  };
  
  return (
    <div className="space-y-6 text-right" dir="rtl">
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h4 className="font-medium mb-2">פרטי האירוע:</h4>
        <ul className="text-sm space-y-1">
          <li>
            <strong>סוג אירוע:</strong> {' '}
            {searchData.eventType === 'private' ? 'פרטי' : 
             searchData.eventType === 'business' ? 'עסקי' : 
             searchData.eventType === 'mixed' ? 'מעורב' : 
             searchData.eventType === 'children' ? 'ילדים' : 'לא צוין'}
          </li>
          {searchData.eventDate && (
            <li><strong>תאריך:</strong> {format(searchData.eventDate, "dd/MM/yyyy", { locale: he })}</li>
          )}
          {searchData.eventStartTime && (
            <li><strong>שעת התחלה:</strong> {searchData.eventStartTime}</li>
          )}
          {searchData.eventEndTime && (
            <li><strong>שעת סיום:</strong> {searchData.eventEndTime}</li>
          )}
          <li><strong>מספר משתתפים:</strong> {searchData.attendeesCount || 'לא צוין'}</li>
          <li><strong>קונספט:</strong> {searchData.eventConcept || 'לא צוין'}</li>
          {searchData.conceptDetails && <li><strong>פרטים:</strong> {searchData.conceptDetails}</li>}
          {searchData.budget && (searchData.budget.min > 0 || searchData.budget.max > 0) && (
            <li>
              <strong>תקציב:</strong> {' '}
              {searchData.budget.min > 0 && searchData.budget.max > 0 
                ? `₪${searchData.budget.min.toLocaleString()} - ₪${searchData.budget.max.toLocaleString()}`
                : searchData.budget.min > 0 
                ? `מעל ₪${searchData.budget.min.toLocaleString()}`
                : `עד ₪${searchData.budget.max.toLocaleString()}`}
            </li>
          )}
        </ul>
      </div>
      
      <h3 className="text-lg font-medium">המלצות מותאמות עבורך:</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map(rec => (
          <Link 
            key={rec.id} 
            to={`/product/${rec.id}`}
            className="block transition-transform hover:scale-105"
          >
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={rec.imageUrl} 
                  alt={rec.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-brand-600/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {rec.category}
                </div>
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-md flex items-center shadow-sm">
                  <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-sm">{rec.rating}</span>
                  <span className="text-xs text-gray-600 mr-1">({rec.reviewCount})</span>
                </div>
              </div>
              
              <CardContent className="p-4 flex-grow">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-lg mb-1">{rec.name}</h4>
                    <p className="text-gray-500 text-sm mb-1">{rec.provider}</p>
                    <p className="text-gray-700 text-sm leading-relaxed">{rec.description}</p>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 ml-1" />
                    <span>{rec.location}</span>
                  </div>
                  
                  {rec.tags && (
                    <div className="flex flex-wrap gap-1">
                      {rec.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <div className="text-2xl font-bold text-brand-600 flex items-center">
                          <DollarSign className="h-5 w-5 ml-1" />
                          {formatPrice(rec)}
                        </div>
                        <div className="text-sm text-gray-500">{rec.priceUnit}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">משך:</div>
                        <div className="text-sm font-medium">{rec.duration} דקות</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      {/* מציג חלופה אם לא מצאו את מה שחיפשו */}
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
