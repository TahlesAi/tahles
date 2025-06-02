
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { toast } from "sonner";

interface LocationStepProps {
  location: { city: string; address?: string } | undefined;
  onUpdate: (location: { city: string; address?: string }) => void;
}

const LocationStep = ({ location, onUpdate }: LocationStepProps) => {
  const [selectedCity, setSelectedCity] = useState(location?.city || "");
  const [inputValue, setInputValue] = useState(location?.city || "");
  
  // רשימת ערים מרכזיות בישראל עם השלמה אוטומטית
  const israeliCities = [
    "תל אביב", "ירושלים", "חיפה", "באר שבע", 
    "ראשון לציון", "פתח תקווה", "אשדוד", "נתניה",
    "בני ברק", "חולון", "רמת גן", "אשקלון",
    "רחובות", "בת ים", "כפר סבא", "הרצליה",
    "חדרה", "מודיעין", "נהריה", "לוד",
    "רעננה", "טבריה", "הוד השרון", "גבעתיים",
    "קריית גת", "עפולה", "נס ציונה", "אילת",
    "צפת", "אריאל", "כרמיאל", "עכו",
    "רמלה", "קריית מוצקין", "קריית ביאליק", "קריית ים",
    "דימונה", "מעלה אדומים", "קריית אתא", "בית שמש"
  ];

  // סינון ערים לפי הטקסט שהוזן
  const filteredCities = israeliCities.filter(city => 
    city.includes(inputValue) || inputValue === ""
  ).slice(0, 8); // מגביל ל-8 תוצאות

  const handleInputChange = (value: string) => {
    setInputValue(value);
    // אם יש התאמה מדויקת, נבחר אותה אוטומטית
    const exactMatch = israeliCities.find(city => city === value);
    if (exactMatch) {
      setSelectedCity(value);
      onUpdate({ city: value });
    }
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setInputValue(city);
    onUpdate({ city });
    toast.success(`נבחר אזור: ${city}`);
  };

  const handleNext = () => {
    if (inputValue.trim()) {
      // אם הוזן טקסט, נשתמש בו כעיר
      const finalCity = selectedCity || inputValue.trim();
      onUpdate({ city: finalCity });
      toast.success(`נבחר אזור: ${finalCity}`);
    }
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MapPin className="h-6 w-6 text-blue-600" />
          <h3 className="text-xl font-bold">איפה יתקיים האירוע?</h3>
        </div>
        <p className="text-gray-600 text-sm">הזינו ישוב או עיר בישראל</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-right">
            ישוב / עיר *
          </label>
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="התחילו להקליד שם העיר..."
            className="w-full text-right h-12 text-base border-2 focus:border-blue-500"
            dir="rtl"
          />
        </div>

        {/* רשימת הצעות */}
        {inputValue && filteredCities.length > 0 && (
          <div className="border border-gray-200 rounded-lg max-h-48 overflow-y-auto bg-white shadow-lg">
            {filteredCities.map((city) => (
              <button
                key={city}
                onClick={() => handleCitySelect(city)}
                className={`w-full text-right px-4 py-3 hover:bg-blue-50 border-b last:border-b-0 transition-colors ${
                  selectedCity === city ? 'bg-blue-100 font-medium' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{city}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      
      {selectedCity && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
          <p className="text-sm text-green-800">
            ✅ אזור נבחר: {selectedCity}
          </p>
        </div>
      )}

      {/* כפתור המשך - תמיד זמין */}
      <div className="pt-4">
        <Button 
          onClick={handleNext}
          className="w-full h-12 text-base"
          disabled={!inputValue.trim()}
        >
          המשך
        </Button>
        {!inputValue.trim() && (
          <p className="text-xs text-gray-500 text-center mt-2">
            יש להזין שם עיר כדי להמשיך
          </p>
        )}
      </div>
    </div>
  );
};

export default LocationStep;
