import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEventContext } from "@/context/EventContext";
import { Label } from "@/components/ui/label";
import { Subcategory } from "@/lib/types/hierarchy";
import { designSystem } from "@/lib/designSystem";
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

interface OnboardingSubcategoryProps {
  categoryId: string;
  selectedSubcategory: string | null;
  onSelectSubcategory: (subcategoryId: string) => void;
  onBack: () => void;
  onNext: () => void;
}

const OnboardingSubcategory = ({
  categoryId,
  selectedSubcategory,
  onSelectSubcategory,
  onBack,
  onNext
}: OnboardingSubcategoryProps) => {
  const { categories, getSubcategoriesByCategory, isLoading } = useEventContext();
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [category, setCategory] = useState<any>(null);

  useEffect(() => {
    if (!isLoading && categoryId) {
      const foundCategory = categories.find(c => c.id === categoryId);
      setCategory(foundCategory);

      if (foundCategory) {
        const subcats = getSubcategoriesByCategory(categoryId);
        setSubcategories(subcats);
      }
    }
  }, [categoryId, categories, getSubcategoriesByCategory, isLoading]);

  const handleNext = () => {
    if (selectedSubcategory) {
      onNext();
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 text-center">
          <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
          <Skeleton className="h-4 w-1/2 mx-auto" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 mb-6">
          {Array(10).fill(null).map((_, i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto" dir="rtl">
      <div className="mb-6 text-center">
        <h2 className={`${designSystem.typography.title} mb-2`}>
          {category ? `בחירת תת-קטגוריה ב${category.name}` : 'בחירת תת-קטגוריה'}
        </h2>
        <p className="text-sm text-gray-600">
          בחרו את תת-הקטגוריה שמתאימה לשירות שלכם
        </p>
      </div>
      
      {subcategories.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 mb-6">
          {subcategories.map((subcategory) => (
            <Card
              key={subcategory.id}
              className={`cursor-pointer transition-all ${
                selectedSubcategory === subcategory.id
                  ? 'border-primary border-2 shadow-md'
                  : 'hover:shadow-md'
              }`}
              onClick={() => onSelectSubcategory(subcategory.id)}
            >
              <CardContent className="p-2.5 text-center">
                <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center mb-2 mx-auto">
                  {subcategory.icon && typeof subcategory.icon === 'string' && iconMap[subcategory.icon] ? (
                    <div className="text-gray-600 scale-75">
                      {iconMap[subcategory.icon]}
                    </div>
                  ) : (
                    <div className="h-4 w-4 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs">
                      {subcategory.name.substring(0, 1)}
                    </div>
                  )}
                </div>
                <Label className="text-xs font-medium line-clamp-2 leading-tight">{subcategory.name}</Label>
              </CardContent>
            </Card>
          ))}
          
          <Card
            className={`cursor-pointer transition-all ${
              selectedSubcategory === 'other'
                ? 'border-primary border-2 shadow-md'
                : 'hover:shadow-md'
            }`}
            onClick={() => onSelectSubcategory('other')}
          >
            <CardContent className="p-2.5 text-center">
              <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center mb-2 mx-auto">
                <div className="text-gray-600 text-sm">
                  🔍
                </div>
              </div>
              <Label className="text-xs font-medium">אחר</Label>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center py-6 bg-gray-50 rounded-lg mb-6">
          <p className="text-sm text-gray-500 mb-2">לא נמצאו תת-קטגוריות</p>
          <Button variant="link" size="sm" onClick={onBack}>
            בחירת קטגוריה אחרת
          </Button>
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}>
          חזרה
        </Button>
        <Button size="sm" onClick={handleNext} disabled={!selectedSubcategory}>
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

export default OnboardingSubcategory;
