
import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Handshake, Monitor, Combine, Palette } from "lucide-react";

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

interface PreferencesSectionProps {
  data: PersonalizationData;
  onUpdate: (updates: Partial<PersonalizationData>) => void;
}

const PreferencesSection: React.FC<PreferencesSectionProps> = ({ data, onUpdate }) => {
  return (
    <div className="space-y-6">
      {/* סוג מופע */}
      <div>
        <Label className="text-base font-medium mb-4 block">סוג המופע המבוקש</Label>
        <div className="space-y-3">
          <Card className={`p-4 cursor-pointer transition-all ${data.isReception ? 'border-brand-500 bg-brand-50' : 'border-gray-200'}`}>
            <div 
              className="flex items-center space-x-3"
              onClick={() => onUpdate({ isReception: !data.isReception })}
            >
              <Checkbox
                id="reception"
                checked={data.isReception}
                onCheckedChange={(checked) => onUpdate({ isReception: !!checked })}
              />
              <div className="flex items-center flex-1">
                <Handshake className="h-5 w-5 ml-2 text-brand-600" />
                <div>
                  <Label htmlFor="reception" className="font-medium cursor-pointer">
                    מופע קבלת פנים
                  </Label>
                  <p className="text-sm text-gray-500">מופע לקבלת האורחים בכניסה לאירוע</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className={`p-4 cursor-pointer transition-all ${data.isMainShow ? 'border-brand-500 bg-brand-50' : 'border-gray-200'}`}>
            <div 
              className="flex items-center space-x-3"
              onClick={() => onUpdate({ isMainShow: !data.isMainShow })}
            >
              <Checkbox
                id="main-show"
                checked={data.isMainShow}
                onCheckedChange={(checked) => onUpdate({ isMainShow: !!checked })}
              />
              <div className="flex items-center flex-1">
                <Monitor className="h-5 w-5 ml-2 text-brand-600" />
                <div>
                  <Label htmlFor="main-show" className="font-medium cursor-pointer">
                    מופע מרכזי
                  </Label>
                  <p className="text-sm text-gray-500">המופע הראשי של האירוע</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className={`p-4 cursor-pointer transition-all ${data.isCombined ? 'border-brand-500 bg-brand-50' : 'border-gray-200'}`}>
            <div 
              className="flex items-center space-x-3"
              onClick={() => onUpdate({ isCombined: !data.isCombined })}
            >
              <Checkbox
                id="combined"
                checked={data.isCombined}
                onCheckedChange={(checked) => onUpdate({ isCombined: !!checked })}
              />
              <div className="flex items-center flex-1">
                <Combine className="h-5 w-5 ml-2 text-brand-600" />
                <div>
                  <Label htmlFor="combined" className="font-medium cursor-pointer">
                    מופע משולב
                  </Label>
                  <p className="text-sm text-gray-500">משולב גם בקבלת פנים וגם כמופע מרכזי</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* התאמה אישית */}
      <div>
        <Card className={`p-4 cursor-pointer transition-all ${data.needsCustomization ? 'border-brand-500 bg-brand-50' : 'border-gray-200'}`}>
          <div 
            className="flex items-center space-x-3"
            onClick={() => onUpdate({ needsCustomization: !data.needsCustomization })}
          >
            <Checkbox
              id="customization"
              checked={data.needsCustomization}
              onCheckedChange={(checked) => onUpdate({ needsCustomization: !!checked })}
            />
            <div className="flex items-center flex-1">
              <Palette className="h-5 w-5 ml-2 text-brand-600" />
              <div>
                <Label htmlFor="customization" className="font-medium cursor-pointer">
                  נדרש קטע בהתאמה אישית
                </Label>
                <p className="text-sm text-gray-500">התאמת תוכן המופע לצרכים הספציפיים שלך</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {data.needsCustomization && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>שים לב:</strong> התאמה אישית עשויה להשפיע על המחיר הסופי ולדרוש תיאום מוקדם עם הספק.
          </p>
        </div>
      )}
    </div>
  );
};

export default PreferencesSection;
