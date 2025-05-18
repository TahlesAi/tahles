import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEventContext } from "@/context/EventContext";
import { Category } from "@/lib/types/hierarchy";
import { Skeleton } from "@/components/ui/skeleton";
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

interface OnboardingStep1Props {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
}

const OnboardingStep1 = ({ data, onUpdate, onNext }: OnboardingStep1Props) => {
  const { categories, isLoading } = useEventContext();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(data.category || null);
  
  useEffect(() => {
    if (selectedCategory) {
      onUpdate({ category: selectedCategory });
    }
  }, [selectedCategory, onUpdate]);

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleNext = () => {
    if (selectedCategory) {
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {Array(6).fill(null).map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto" dir="rtl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-2">איזו קטגוריה הכי מתאימה לשירות שלכם?</h2>
        <p className="text-gray-600">בחרו את הקטגוריה הראשית שמתאימה לשירות שלכם</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {categories.map((category: Category) => (
          <Card 
            key={category.id}
            className={`cursor-pointer transition-all ${
              selectedCategory === category.id 
                ? 'border-primary border-2 shadow-md' 
                : 'hover:shadow-md'
            }`}
            onClick={() => handleSelectCategory(category.id)}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                selectedCategory === category.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {category.icon && typeof category.icon === 'string' && iconMap[category.icon] ? (
                  iconMap[category.icon]
                ) : (
                  <div className="text-xl font-bold">{category.name.substring(0, 1)}</div>
                )}
              </div>
              <h3 className="font-semibold mb-1">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.description}</p>
            </CardContent>
          </Card>
        ))}
        
        <Card 
          className={`cursor-pointer transition-all ${
            selectedCategory === 'other' 
              ? 'border-primary border-2 shadow-md' 
              : 'hover:shadow-md'
          }`}
          onClick={() => handleSelectCategory('other')}
        >
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
              selectedCategory === 'other' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
            }`}>
              <div className="text-xl">🔍</div>
            </div>
            <h3 className="font-semibold mb-1">אחר</h3>
            <p className="text-sm text-gray-500">השירות שלי לא מתאים לקטגוריות הקיימות</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-between">
        <Button variant="ghost" disabled>
          אחורה
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={!selectedCategory}
        >
          המשך לשלב הבא
        </Button>
      </div>
    </div>
  );
};

// מיפוי אייקונים
const iconMap: Record<string, React.ReactNode> = {
  "Music": <Music className="h-8 w-8" />,
  "Camera": <Camera className="h-8 w-8" />,
  "Utensils": <Utensils className="h-8 w-8" />,
  "MapPin": <MapPin className="h-8 w-8" />,
  "Mic": <Mic2 className="h-8 w-8" />,
  "Mic2": <Mic2 className="h-8 w-8" />,
  "Monitor": <Monitor className="h-8 w-8" />,
  "Gift": <Gift className="h-8 w-8" />,
  "Sparkles": <Sparkles className="h-8 w-8" />,
  "Calendar": <Calendar className="h-8 w-8" />,
  "Wand2": <Wand2 className="h-8 w-8" />,
  "PartyPopper": <PartyPopper className="h-8 w-8" />,
  "TentTree": <TentTree className="h-8 w-8" />,
  "User": <User className="h-8 w-8" />,
  "PlusCircle": <PlusCircle className="h-8 w-8" />,
  "Users": <Users className="h-8 w-8" />,
  "Headphones": <Headphones className="h-8 w-8" />
};

export default OnboardingStep1;
