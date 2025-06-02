
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Settings } from "lucide-react";

interface SearchCriteria {
  category: string;
  subcategory: string;
  eventType: string;
  audienceType: string;
  language: string;
  ageGroup: string;
  attendeesCount: number;
  eventDate: string;
  eventTime: string;
  location: string;
  isReception: boolean;
  isMainShow: boolean;
  isCombined: boolean;
  needsCustomization: boolean;
  needsAmplification: boolean;
  budgetLimit?: number;
}

interface SearchCriteriaSummaryProps {
  criteria: SearchCriteria;
}

const SearchCriteriaSummary: React.FC<SearchCriteriaSummaryProps> = ({ criteria }) => {
  const getAudienceLabel = (type: string) => {
    const labels = { secular: 'חילוני', religious: 'דתי', ultra_orthodox: 'חרדי', arab: 'ערבי' };
    return labels[type as keyof typeof labels] || type;
  };

  const getLanguageLabel = (lang: string) => {
    const labels = { hebrew: 'עברית', arabic: 'ערבית', english: 'אנגלית', russian: 'רוסית', french: 'צרפתית' };
    return labels[lang as keyof typeof labels] || lang;
  };

  const getAgeGroupLabel = (age: string) => {
    const labels = { children: 'ילדים', youth: 'נוער', adults: 'בוגרים', seniors: 'מבוגרים' };
    return labels[age as keyof typeof labels] || age;
  };

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-4">
        <div className="flex items-center mb-3">
          <Settings className="h-5 w-5 ml-2 text-blue-600" />
          <h3 className="font-semibold text-blue-900">קריטריוני החיפוש שלך</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          {/* פרטי אירוע בסיסיים */}
          <div className="space-y-2">
            <div className="font-medium text-gray-700">פרטי אירוע</div>
            <div className="space-y-1">
              <Badge variant="secondary">{criteria.category} → {criteria.subcategory}</Badge>
              <div className="flex items-center text-gray-600">
                <span>סוג: {criteria.eventType === 'business' ? 'עסקי' : 'פרטי'}</span>
              </div>
              {criteria.eventDate && (
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-3 w-3 ml-1" />
                  <span>{new Date(criteria.eventDate).toLocaleDateString('he-IL')}</span>
                </div>
              )}
              {criteria.eventTime && (
                <div className="flex items-center text-gray-600">
                  <Clock className="h-3 w-3 ml-1" />
                  <span>{criteria.eventTime}</span>
                </div>
              )}
            </div>
          </div>

          {/* קהל יעד */}
          <div className="space-y-2">
            <div className="font-medium text-gray-700">קהל יעד</div>
            <div className="space-y-1">
              <Badge variant="outline">{getAudienceLabel(criteria.audienceType)}</Badge>
              <Badge variant="outline">{getLanguageLabel(criteria.language)}</Badge>
              <Badge variant="outline">{getAgeGroupLabel(criteria.ageGroup)}</Badge>
              <div className="flex items-center text-gray-600">
                <Users className="h-3 w-3 ml-1" />
                <span>{criteria.attendeesCount} משתתפים</span>
              </div>
            </div>
          </div>

          {/* מיקום ותקציב */}
          <div className="space-y-2">
            <div className="font-medium text-gray-700">מיקום ותקציב</div>
            <div className="space-y-1">
              {criteria.location && (
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-3 w-3 ml-1" />
                  <span className="truncate">{criteria.location}</span>
                </div>
              )}
              {criteria.budgetLimit && (
                <div className="text-gray-600">
                  תקציב: עד ₪{criteria.budgetLimit.toLocaleString()}
                </div>
              )}
            </div>
          </div>

          {/* העדפות מיוחדות */}
          <div className="space-y-2">
            <div className="font-medium text-gray-700">העדפות</div>
            <div className="space-y-1">
              {criteria.isReception && <Badge className="bg-green-100 text-green-800">קבלת פנים</Badge>}
              {criteria.isMainShow && <Badge className="bg-blue-100 text-blue-800">מופע מרכזי</Badge>}
              {criteria.isCombined && <Badge className="bg-purple-100 text-purple-800">משולב</Badge>}
              {criteria.needsCustomization && <Badge className="bg-orange-100 text-orange-800">התאמה אישית</Badge>}
              {criteria.needsAmplification && <Badge className="bg-indigo-100 text-indigo-800">הגברה</Badge>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchCriteriaSummary;
