import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEventContext } from "@/context/EventContext";
import { Label } from "@/components/ui/label";
import { ServiceType } from "@/lib/types/hierarchy";
import { 
  Music, 
  Camera, 
  Utensils, 
  MapPin, 
  Mic2, 
  Monitor, 
  Gift, 
  Sparkles, 
  Calendar, 
  Wand2, 
  PartyPopper, 
  TentTree, 
  User, 
  PlusCircle, 
  Users, 
  Headphones 
} from "lucide-react";

interface OnboardingServiceTypeProps {
  subcategoryId: string;
  selectedServiceType: string | null;
  onSelectServiceType: (serviceTypeId: string) => void;
  onBack: () => void;
  onNext: () => void;
}

const OnboardingServiceType = ({
  subcategoryId,
  selectedServiceType,
  onSelectServiceType,
  onBack,
  onNext
}: OnboardingServiceTypeProps) => {
  const { subcategories, getServiceTypesBySubcategory, isLoading } = useEventContext();
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [subcategory, setSubcategory] = useState<any>(null);

  useEffect(() => {
    if (!isLoading && subcategoryId) {
      const foundSubcategory = subcategories.find(s => s.id === subcategoryId);
      setSubcategory(foundSubcategory);

      if (foundSubcategory) {
        const types = getServiceTypesBySubcategory(subcategoryId);
        setServiceTypes(types);
      }
    }
  }, [subcategoryId, subcategories, getServiceTypesBySubcategory, isLoading]);

  const handleNext = () => {
    if (selectedServiceType) {
      onNext();
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <Skeleton className="h-8 w-3/4 mx-auto mb-2" />
          <Skeleton className="h-4 w-1/2 mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {Array(4).fill(null).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto" dir="rtl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-2">
          {subcategory ? `בחירת סוג שירות ב${subcategory.name}` : 'בחירת סוג שירות'}
        </h2>
        <p className="text-gray-600">
          בחרו את סוג השירות שמתאים לפעילות שלכם
        </p>
      </div>
      
      {serviceTypes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {serviceTypes.map((serviceType) => (
            <Card
              key={serviceType.id}
              className={`cursor-pointer transition-all ${
                selectedServiceType === serviceType.id
                  ? 'border-primary border-2 shadow-md'
                  : 'hover:shadow-md'
              }`}
              onClick={() => onSelectServiceType(serviceType.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="ml-3 p-2 bg-gray-100 rounded-md">
                    {serviceType.icon && typeof serviceType.icon === 'string' && iconMap[serviceType.icon] ? (
                      <div className="text-gray-600">
                        {iconMap[serviceType.icon]}
                      </div>
                    ) : (
                      <div className="h-5 w-5 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs">
                        {serviceType.name.substring(0, 1)}
                      </div>
                    )}
                  </div>
                  <div>
                    <Label className="font-medium">{serviceType.name}</Label>
                    <p className="text-sm text-gray-500 mt-1">{serviceType.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Card
            className={`cursor-pointer transition-all ${
              selectedServiceType === 'other'
                ? 'border-primary border-2 shadow-md'
                : 'hover:shadow-md'
            }`}
            onClick={() => onSelectServiceType('other')}
          >
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="ml-3 p-2 bg-gray-100 rounded-md">
                  <div className="text-gray-600 h-5 w-5 flex items-center justify-center">
                    🔍
                  </div>
                </div>
                <div>
                  <Label className="font-medium">אחר</Label>
                  <p className="text-sm text-gray-500 mt-1">השירות שלי מסוג אחר שלא מופיע ברשימה</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg mb-8">
          <p className="text-gray-500">לא נמצאו סוגי שירות בתת-קטגוריה זו</p>
          <Button variant="link" className="mt-2" onClick={onBack}>
            בחירת תת-קטגוריה אחרת
          </Button>
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="ghost" onClick={onBack}>
          חזרה
        </Button>
        <Button onClick={handleNext} disabled={!selectedServiceType}>
          המשך
        </Button>
      </div>
    </div>
  );
};

// מיפוי אייקונים
const iconMap: Record<string, React.ReactNode> = {
  "Music": <Music className="h-5 w-5" />,
  "Camera": <Camera className="h-5 w-5" />,
  "Utensils": <Utensils className="h-5 w-5" />,
  "MapPin": <MapPin className="h-5 w-5" />,
  "Mic": <Mic2 className="h-5 w-5" />,
  "Mic2": <Mic2 className="h-5 w-5" />,
  "Monitor": <Monitor className="h-5 w-5" />,
  "Gift": <Gift className="h-5 w-5" />,
  "Sparkles": <Sparkles className="h-5 w-5" />,
  "Calendar": <Calendar className="h-5 w-5" />,
  "Wand2": <Wand2 className="h-5 w-5" />,
  "PartyPopper": <PartyPopper className="h-5 w-5" />,
  "TentTree": <TentTree className="h-5 w-5" />,
  "User": <User className="h-5 w-5" />,
  "PlusCircle": <PlusCircle className="h-5 w-5" />,
  "Users": <Users className="h-5 w-5" />,
  "Headphones": <Headphones className="h-5 w-5" />
};

export default OnboardingServiceType;
