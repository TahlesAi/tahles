
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  
  // רשימת ערים מרכזיות בישראל
  const israeliCities = [
    "תל אביב", "ירושלים", "חיפה", "באר שבע", 
    "ראשון לציון", "פתח תקווה", "אשדוד", "נתניה",
    "בני ברק", "חולון", "רמת גן", "אשקלון",
    "רחובות", "בת ים", "כפר סבא", "הרצליה",
    "חדרה", "מודיעין", "נהריה", "לוד",
    "רעננה", "טבריה", "הוד השרון", "גבעתיים",
    "קריית גת", "עפולה", "נס ציונה", "אילת",
    "צפת", "אריאל", "כרמיאל", "עכו"
  ];

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    onUpdate({ city });
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MapPin className="h-6 w-6 text-blue-600" />
          <h3 className="text-xl font-bold">באיזה אזור האירוע?</h3>
        </div>
        <p className="text-gray-600 text-sm">בחרו עיר או אזור כללי</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-right">
            עיר או אזור *
          </label>
          <Select value={selectedCity} onValueChange={handleCitySelect} dir="rtl">
            <SelectTrigger className="w-full text-right h-12 text-base border-2 focus:border-blue-500">
              <SelectValue placeholder="בחרו עיר או אזור" />
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-y-auto z-50 bg-white border-2">
              {israeliCities.map((city) => (
                <SelectItem key={city} value={city} className="text-right text-base py-3">
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {selectedCity && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
          <p className="text-sm text-green-800">
            ✅ אזור נבחר: {selectedCity}
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationStep;
