
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Volume2, Globe, Palette } from "lucide-react";

interface PersonalizationData {
  eventType: 'business' | 'private';
  audienceType: 'secular' | 'religious' | 'ultra_orthodox' | 'arab';
  language: 'hebrew' | 'arabic' | 'english' | 'russian' | 'french';
  ageGroup: 'children' | 'youth' | 'adults' | 'seniors';
  isReception: boolean;
  isMainShow: boolean;
  isCombined: boolean;
  needsCustomization: boolean;
  attendeesCount: number;
  needsAmplification: boolean;
  eventDate: string;
  eventTime: string;
  location: string;
  budgetLimit?: number;
}

interface CustomizationPreviewProps {
  data: PersonalizationData;
  category: string;
  subcategory: string;
}

const CustomizationPreview: React.FC<CustomizationPreviewProps> = ({ data, category, subcategory }) => {
  const getAudienceLabel = (type: string) => {
    const labels = {
      secular: 'חילוני',
      religious: 'דתי',
      ultra_orthodox: 'חרדי',
      arab: 'ערבי'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getLanguageLabel = (lang: string) => {
    const labels = {
      hebrew: 'עברית',
      arabic: 'ערבית',
      english: 'אנגלית',
      russian: 'רוסית',
      french: 'צרפתית'
    };
    return labels[lang as keyof typeof labels] || lang;
  };

  const getAgeGroupLabel = (age: string) => {
    const labels = {
      children: 'ילדים (0-12)',
      youth: 'נוער (13-18)',
      adults: 'בוגרים (19-65)',
      seniors: 'מבוגרים (65+)'
    };
    return labels[age as keyof typeof labels] || age;
  };

  const isFormComplete = data.eventDate && data.eventTime && data.location;
  const showTypes = [data.isReception, data.isMainShow, data.isCombined].some(Boolean);

  return (
    <div className="space-y-4 sticky top-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">סיכום התאמה אישית</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* קטגוריה */}
          <div>
            <h4 className="font-medium mb-2">קטגוריה נבחרת</h4>
            <Badge variant="secondary" className="bg-brand-100 text-brand-800">
              {category} → {subcategory}
            </Badge>
          </div>

          {/* פרטי אירוע בסיסיים */}
          <div className="space-y-3">
            <h4 className="font-medium">פרטי האירוע</h4>
            
            <div className="flex items-center text-sm">
              <Badge variant="outline" className={data.eventType === 'business' ? 'bg-blue-50' : 'bg-purple-50'}>
                {data.eventType === 'business' ? 'עסקי' : 'פרטי'}
              </Badge>
            </div>

            {data.eventDate && (
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 ml-2 text-gray-500" />
                <span>{new Date(data.eventDate).toLocaleDateString('he-IL')}</span>
              </div>
            )}

            {data.eventTime && (
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 ml-2 text-gray-500" />
                <span>{data.eventTime}</span>
              </div>
            )}

            {data.location && (
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 ml-2 text-gray-500" />
                <span className="truncate">{data.location}</span>
              </div>
            )}

            <div className="flex items-center text-sm">
              <Users className="h-4 w-4 ml-2 text-gray-500" />
              <span>{data.attendeesCount} משתתפים</span>
            </div>
          </div>

          {/* קהל יעד */}
          <div className="space-y-2">
            <h4 className="font-medium">קהל היעד</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{getAudienceLabel(data.audienceType)}</Badge>
              <Badge variant="outline" className="flex items-center">
                <Globe className="h-3 w-3 ml-1" />
                {getLanguageLabel(data.language)}
              </Badge>
              <Badge variant="outline">{getAgeGroupLabel(data.ageGroup)}</Badge>
            </div>
          </div>

          {/* סוג מופע */}
          {showTypes && (
            <div className="space-y-2">
              <h4 className="font-medium">סוג המופע</h4>
              <div className="flex flex-wrap gap-2">
                {data.isReception && <Badge className="bg-green-100 text-green-800">קבלת פנים</Badge>}
                {data.isMainShow && <Badge className="bg-blue-100 text-blue-800">מופע מרכזי</Badge>}
                {data.isCombined && <Badge className="bg-purple-100 text-purple-800">משולב</Badge>}
              </div>
            </div>
          )}

          {/* אפשרויות נוספות */}
          <div className="space-y-2">
            <h4 className="font-medium">אפשרויות נוספות</h4>
            <div className="space-y-1">
              {data.needsAmplification && (
                <div className="flex items-center text-sm text-blue-600">
                  <Volume2 className="h-4 w-4 ml-2" />
                  <span>כולל הגברה</span>
                </div>
              )}
              {data.needsCustomization && (
                <div className="flex items-center text-sm text-purple-600">
                  <Palette className="h-4 w-4 ml-2" />
                  <span>התאמה אישית</span>
                </div>
              )}
              {data.budgetLimit && (
                <div className="text-sm text-gray-600">
                  <span>תקציב מקסימלי: ₪{data.budgetLimit.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>

          {/* סטטוס השלמה */}
          <div className="pt-4 border-t">
            <div className={`text-center p-3 rounded-lg ${
              isFormComplete 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-yellow-50 text-yellow-800 border border-yellow-200'
            }`}>
              {isFormComplete ? (
                <span className="text-sm font-medium">✓ מוכן לחיפוש</span>
              ) : (
                <span className="text-sm">השלם פרטים לחיפוש</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomizationPreview;
