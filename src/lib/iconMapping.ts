
import { 
  Music, 
  Utensils, 
  Camera, 
  Car,
  Mic,
  Palette,
  Gift,
  MapPin,
  Volume2,
  Users,
  Sparkles,
  Heart,
  Baby,
  GraduationCap,
  Briefcase,
  Crown,
  PartyPopper,
  Cake,
  Flower
} from 'lucide-react';
import React from 'react';

export const categoryIcons = {
  // קטגוריות ראשיות
  'הזמנת מופעים': Music,
  'שרותי הסעדה': Utensils,
  'צילום ותיעוד': Camera,
  'לוקיישנים': MapPin,
  'שרותי הגברה': Volume2,
  'שרותי הפקה': Users,
  'מתנות ומזכרות': Gift,
  'טיולים וגיבוש': Car,
  
  // תת-קטגוריות מופעים
  'זמרים': Mic,
  'להקות': Music,
  'קוסמים': Sparkles,
  'אומני חושים': Palette,
  'סטנדאפיסטים': Mic,
  'תקליטנים': Music,
  'שחקנים': Palette,
  'מיצגים': Sparkles,
  'קרקס': PartyPopper,
  'תיאטרון': Palette,
  
  // קונספטים
  'בר מצווה': Crown,
  'בת מצווה': Crown,
  'חתונה': Heart,
  'ברית': Baby,
  'אירועי חברה': Briefcase,
  'יום הולדת': Cake,
  'מסיבת רווקות': PartyPopper,
  'מסיבת רווקים': PartyPopper,
  'גיבוש': Users,
  'חנוכת הבית': Flower,
  'סיום': GraduationCap,
  
  // ברירת מחדל
  'default': Sparkles
};

export const getIconForCategory = (categoryName: string) => {
  const normalizedName = categoryName.trim();
  
  // חיפוש ישיר
  if (categoryIcons[normalizedName as keyof typeof categoryIcons]) {
    return categoryIcons[normalizedName as keyof typeof categoryIcons];
  }
  
  // חיפוש חלקי
  for (const [key, icon] of Object.entries(categoryIcons)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return icon;
    }
  }
  
  // ברירת מחדל
  return categoryIcons.default;
};

export const getIconComponent = (categoryName: string, className: string = "h-6 w-6") => {
  const IconComponent = getIconForCategory(categoryName);
  return React.createElement(IconComponent, { className });
};
