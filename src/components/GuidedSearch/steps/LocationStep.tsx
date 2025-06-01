
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { MapPin, Navigation } from "lucide-react";

interface LocationStepProps {
  location: { city: string; address?: string } | undefined;
  onUpdate: (location: { city: string; address?: string }) => void;
}

const LocationStep = ({ location, onUpdate }: LocationStepProps) => {
  const [selectedCity, setSelectedCity] = useState(location?.city || "");
  const [specificAddress, setSpecificAddress] = useState(location?.address || "");
  
  // רשימת ערים מרכזיות בישראל מחולקת לאזורים
  const israeliCities = [
    // מרכז
    "תל אביב", "רמת גן", "גבעתיים", "הרצליה", "רעננה", "כפר סבא", 
    "הוד השרון", "פתח תקווה", "ראשון לציון", "רחובות", "נס ציונה",
    
    // ירושלים ויהודה ושומרון
    "ירושלים", "בית שמש", "מעלה אדומים", "מודיעין", "אריאל",
    
    // חיפה והצפון
    "חיפה", "נהריה", "עכו", "טבריה", "עפולה", "צפת", "כרמיאל", "מעלות",
    
    // דרום
    "באר שבע", "אשקלון", "אשדוד", "קריית גת", "נתיבות", "דימונה", "אילת",
    
    // שרון ושפלה
    "נתניה", "חדרה", "יקנעם", "חולון", "בת ים", "בני ברק",
    
    "אחר - אציין בכתובת"
  ];

  const handleNext = () => {
    if (selectedCity) {
      onUpdate({
        city: selectedCity === "אחר - אציין בכתובת" ? (specificAddress || "לא צוין") : selectedCity,
        address: selectedCity === "אחר - אציין בכתובת" ? specificAddress : specificAddress || undefined
      });
    }
  };

  const canProceed = selectedCity.trim() !== "" && 
    (selectedCity !== "אחר - אציין בכתובת" || specificAddress.trim() !== "");

  return (
    <div className="space-y-6 text-right max-h-[500px] overflow-y-auto" dir="rtl">
      <div className="text-center sticky top-0 bg-white z-10 pb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Navigation className="h-6 w-6 text-blue-600" />
          <h3 className="text-xl font-bold">איפה האירוע יתקיים?</h3>
        </div>
        <p className="text-gray-600 text-sm">זה יעזור לנו להמליץ על ספקים באזור שלכם</p>
      </div>
      
      <div className="space-y-4 px-2">
        {/* City Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-right">
            <MapPin className="inline ml-2 h-4 w-4 text-blue-600" />
            עיר או אזור *
          </label>
          <Select value={selectedCity} onValueChange={setSelectedCity} dir="rtl">
            <SelectTrigger className="w-full text-right h-12 text-base border-2 focus:border-blue-500">
              <SelectValue placeholder="בחרו עיר או אזור" />
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-y-auto z-50 bg-white border-2">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 border-b">מרכז</div>
              {israeliCities.slice(0, 11).map((city) => (
                <SelectItem key={city} value={city} className="text-right text-base py-3">
                  {city}
                </SelectItem>
              ))}
              
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 border-b border-t">ירושלים ויו"ש</div>
              {israeliCities.slice(11, 16).map((city) => (
                <SelectItem key={city} value={city} className="text-right text-base py-3">
                  {city}
                </SelectItem>
              ))}
              
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 border-b border-t">חיפה והצפון</div>
              {israeliCities.slice(16, 24).map((city) => (
                <SelectItem key={city} value={city} className="text-right text-base py-3">
                  {city}
                </SelectItem>
              ))}
              
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 border-b border-t">דרום</div>
              {israeliCities.slice(24, 31).map((city) => (
                <SelectItem key={city} value={city} className="text-right text-base py-3">
                  {city}
                </SelectItem>
              ))}
              
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 border-b border-t">שרון ושפלה</div>
              {israeliCities.slice(31, 37).map((city) => (
                <SelectItem key={city} value={city} className="text-right text-base py-3">
                  {city}
                </SelectItem>
              ))}
              
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 border-b border-t">אחר</div>
              <SelectItem value="אחר - אציין בכתובת" className="text-right text-base py-3">
                אחר - אציין בכתובת
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Specific Address */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-right">
            {selectedCity === "אחר - אציין בכתובת" ? "שם העיר והכתובת *" : "כתובת מדויקת (אופציונלי)"}
          </label>
          <Input
            type="text"
            placeholder={selectedCity === "אחר - אציין בכתובת" ? "למשל: קריית שמונה, רחוב הגפן 15" : "למשל: רחוב הרצל 25, אולם אירועים"}
            value={specificAddress}
            onChange={(e) => setSpecificAddress(e.target.value)}
            className="text-right h-12 text-base border-2 focus:border-blue-500"
            required={selectedCity === "אחר - אציין בכתובת"}
          />
          {selectedCity && selectedCity !== "אחר - אציין בכתובת" && (
            <p className="text-xs text-gray-500 text-right">
              הכתובת המדויקת תעזור לספקים להתכונן טוב יותר
            </p>
          )}
        </div>
      </div>
      
      {/* Continue Button */}
      <div className="flex justify-center pt-4 sticky bottom-0 bg-white">
        <Button 
          onClick={handleNext} 
          className="px-8 py-3 text-lg h-12 bg-blue-600 hover:bg-blue-700" 
          disabled={!canProceed}
        >
          {!selectedCity ? 'בחרו מיקום' : 
           selectedCity === "אחר - אציין בכתובת" && !specificAddress ? 'הכניסו כתובת' :
           'המשך ←'}
        </Button>
      </div>
      
      {/* Selected Summary */}
      {selectedCity && canProceed && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
          <p className="text-sm text-green-800">
            ✅ מיקום נבחר: {selectedCity === "אחר - אציין בכתובת" ? specificAddress : selectedCity}
            {specificAddress && selectedCity !== "אחר - אציין בכתובת" && `, ${specificAddress}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationStep;
