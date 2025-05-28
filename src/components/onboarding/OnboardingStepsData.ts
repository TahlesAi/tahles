
import { 
  CheckCircle, 
  ClipboardList, 
  User, 
  Layers,
  Layers3,
  FileCheck,
  PenTool,
  Building,
  Star
} from "lucide-react";

export const steps = [
  {
    id: 1,
    title: "פרטים אישיים",
    description: "פרטי ספק וזהות",
    icon: User,
  },
  {
    id: 2,
    title: "מסמכים",
    description: "העלאת מסמכים נדרשים",
    icon: FileCheck,
  },
  {
    id: 3,
    title: "פרופיל עסקי",
    description: "תיאור העסק ותחומי התמחות",
    icon: Building,
  },
  {
    id: 4,
    title: "קטגוריה",
    description: "בחירת קטגוריה ראשית",
    icon: Layers,
  },
  {
    id: 5,
    title: "תת-קטגוריה",
    description: "בחירת תת-קטגוריה",
    icon: Layers3,
  },
  {
    id: 6,
    title: "פרופיל תדמיתי",
    description: "תמונות, סרטונים והמלצות",
    icon: Star,
  },
  {
    id: 7,
    title: "פרטי שירותים",
    description: "הוספת שירותים ומוצרים",
    icon: ClipboardList,
  },
  {
    id: 8,
    title: "חתימה דיגיטלית",
    description: "חתימה על הסכם ספק",
    icon: PenTool,
  },
  {
    id: 9,
    title: "סיום",
    description: "אישור ופרסום",
    icon: CheckCircle,
  },
];
