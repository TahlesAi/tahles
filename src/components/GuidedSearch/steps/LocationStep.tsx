
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
import { MapPin } from "lucide-react";

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
    <div className="space-y-4 text-right" dir="rtl">
      <div className="text-center">
        <h3 className="text-lg font-bold mb-1">איפה האירוע יתקיים?</h3>
        <p className="text-gray-600 text-sm">המיקום לתיאום השירות</p>
      </div>
      
      <div className="flex flex-col items-center space-y-3">
        {/* City and Address in same row */}
        <div className="w-full max-w-lg">
          <div className="grid grid-cols-2 gap-3">
            {/* City Selection */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-center">
                <MapPin className="inline ml-1 h-3 w-3" />
                עיר *
              </label>
              <Select value={selectedCity} onValueChange={setSelectedCity} dir="rtl">
                <SelectTrigger className="w-full text-center h-9 text-sm">
                  <SelectValue placeholder="בחר עיר" />
                </SelectTrigger>
                <SelectContent className="max-h-32 overflow-y-auto">
                  {israeliCities.map((city) => (
                    <SelectItem key={city} value={city} className="text-center text-sm">
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Specific Address */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-center">כתובת (אופציונלי)</label>
              <Input
                type="text"
                placeholder={selectedCity === "אחר" ? "שם העיר" : "רחוב ומספר"}
                value={specificAddress}
                onChange={(e) => setSpecificAddress(e.target.value)}
                className="text-center h-9 text-sm"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Continue Button */}
      <div className="flex justify-center pt-3">
        <Button 
          onClick={handleNext} 
          className="px-6 py-2 text-base h-10" 
          disabled={!canProceed}
        >
          {!selectedCity ? 'בחר מיקום' : 'המשך לקונספט האירוע'}
        </Button>
      </div>
    </div>
  );
};

export default LocationStep;
