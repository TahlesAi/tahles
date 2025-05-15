
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  Mic2, 
  Image as ImageIcon, 
  Music2, 
  Utensils, 
  TentTree, 
  Users, 
  Truck, 
  Wand2, 
  Ticket, 
  Camera
} from "lucide-react";

interface OnboardingStep1Props {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
}

const serviceCategories = [
  {
    id: "performers",
    name: "אמנים",
    icon: <Wand2 className="h-8 w-8" />,
    description: "קוסמים, מנחים, אמני במה וכדומה"
  },
  {
    id: "production",
    name: "שירותי הפקה",
    icon: <Image className="h-8 w-8" />,
    description: "ציוד, לוגיסטיקה וארגון אירועים"
  },
  {
    id: "music",
    name: "מוזיון ומשקאות",
    icon: <Music2 className="h-8 w-8" />,
    description: "תקליטנים, להקות, ברים ניידים"
  },
  {
    id: "sound",
    name: "שירותי סאונד",
    icon: <Mic2 className="h-8 w-8" />,
    description: "הגברה, ציוד סאונד, פתרונות אקוסטיקה"
  },
  {
    id: "venues",
    name: "הזמנת מופעים",
    icon: <Calendar className="h-8 w-8" />,
    description: "אולמות, גנים, מרחבי אירוח"
  },
  {
    id: "lectures",
    name: "הרצאות",
    icon: <Users className="h-8 w-8" />,
    description: "מרצים, סדנאות, הדרכות"
  },
  {
    id: "attractions",
    name: "טיולים וימי גיבוש",
    icon: <TentTree className="h-8 w-8" />,
    description: "פעילויות אתגר, סיורים מאורגנים"
  },
  {
    id: "tickets",
    name: "כרטיסים לאטרקציות",
    icon: <Ticket className="h-8 w-8" />,
    description: "כרטיסים לאירועים ואטרקציות"
  },
  {
    id: "studios",
    name: "סדנאות",
    icon: <Camera className="h-8 w-8" />,
    description: "סדנאות יצירה, אמנות ובישול"
  }
];

const OnboardingStep1 = ({ data, onUpdate, onNext }: OnboardingStep1Props) => {
  const [selectedCategory, setSelectedCategory] = useState(data.category || "");
  
  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onUpdate({ category: categoryId });
  };

  const handleNext = () => {
    if (selectedCategory) {
      onNext();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-2">איזה מהתיאורים הבאים הכי מתאים לשירות שלכם?</h2>
        <p className="text-gray-600">בחרו את הקטגוריה הכי מתאימה לשירות שלכם</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {serviceCategories.map((category) => (
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
                {category.icon}
              </div>
              <h3 className="font-semibold mb-1">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.description}</p>
            </CardContent>
          </Card>
        ))}
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

export default OnboardingStep1;
