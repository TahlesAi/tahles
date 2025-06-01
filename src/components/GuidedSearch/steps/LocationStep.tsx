
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
  
  // רשימת ערים מרכזיות בישראל
  const israeliCities = [
    "תל אביב", "ירושלים", "חיפה", "ראשון לציון", "פתח תקווה", "אשדוד", "נתניה", 
    "באר שבע", "בני ברק", "חולון", "רמת גן", "אשקלון", "רחובות", "בת ים", 
    "כפר סבא", "הרצליה", "חדרה", "מודיעין", "רעננה", "הוד השרון", "גבעתיים",
    "קריית גת", "נהריה", "טבריה", "עפולה", "עכו", "מעלות", "צפת", "בית שמש",
    "מעלה אדומים", "אריאל", "כרמיאל", "יקנעם", "אחר"
  ];

  const handleNext = () => {
    if (selectedCity) {
      onUpdate({
        city: selectedCity,
        address: specificAddress || undefined
      });
    }
  };

  const canProceed = selectedCity.trim() !== "";

  return (
    <div className="space-y-8 text-right" dir="rtl">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">איפה האירוע יתקיים?</h3>
        <p className="text-gray-600">המיקום חיוני לחישוב עלויות נסיעה וזמני הגעה של נותני השירות</p>
      </div>
      
      <div className="flex flex-col items-center space-y-6">
        {/* City Selection */}
        <div className="w-full max-w-sm space-y-3">
          <label className="block text-sm font-medium text-center">
            <MapPin className="inline ml-2 h-4 w-4" />
            עיר או יישוב *
          </label>
          <Select value={selectedCity} onValueChange={setSelectedCity} dir="rtl">
            <SelectTrigger className="w-full text-center h-12">
              <SelectValue placeholder="בחר עיר או יישוב" />
            </SelectTrigger>
            <SelectContent className="max-h-48 overflow-y-auto">
              {israeliCities.map((city) => (
                <SelectItem key={city} value={city} className="text-center">
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Specific Address (Optional) */}
        {selectedCity && selectedCity !== "אחר" && (
          <div className="w-full max-w-sm space-y-3">
            <label className="block text-sm font-medium text-center">
              <Navigation className="inline ml-2 h-4 w-4" />
              כתובת ספציפית (אופציונלי)
            </label>
            <Input
              type="text"
              placeholder="רחוב ומספר בית"
              value={specificAddress}
              onChange={(e) => setSpecificAddress(e.target.value)}
              className="text-center h-12"
            />
            <p className="text-xs text-gray-500 text-center">
              כתובת ספציפית תסייע לחישוב מדויק יותר של עלויות נסיעה
            </p>
          </div>
        )}

        {/* Custom City Input */}
        {selectedCity === "אחר" && (
          <div className="w-full max-w-sm space-y-3">
            <label className="block text-sm font-medium text-center">
              שם העיר או היישוב
            </label>
            <Input
              type="text"
              placeholder="הזן שם העיר או היישוב"
              value={specificAddress}
              onChange={(e) => setSpecificAddress(e.target.value)}
              className="text-center h-12"
            />
          </div>
        )}
      </div>

      {/* Travel Cost Info */}
      <div className="text-center text-sm text-blue-600 bg-blue-50 p-4 rounded-lg">
        <p><strong>מידע על עלויות נסיעה:</strong></p>
        <div className="mt-2 space-y-1 text-xs">
          <p>• עד 20 ק"מ ממיקום נותן השירות - ללא תוספת</p>
          <p>• 21-50 ק"מ - תוספת של 100-200 ₪</p>
          <p>• מעל 50 ק"מ - תוספת של 300-500 ₪ + אפשרות ללינה</p>
        </div>
      </div>
      
      {/* Continue Button */}
      <div className="flex flex-col items-center gap-3 pt-4">
        <Button 
          onClick={handleNext} 
          className="px-8 py-3 text-lg h-12" 
          disabled={!canProceed}
          size="lg"
        >
          {!selectedCity ? 'יש לבחור מיקום' : 'המשך לקביעת תקציב'}
        </Button>
      </div>
    </div>
  );
};

export default LocationStep;
