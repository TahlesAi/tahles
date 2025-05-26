
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  MapPin, 
  Award, 
  Users, 
  Globe,
  Upload,
  X,
  Plus,
  Newspaper,
  ThumbsUp
} from "lucide-react";

interface OnboardingBusinessProfileProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onBack?: () => void;
  adminMode?: boolean;
}

const OnboardingBusinessProfile: React.FC<OnboardingBusinessProfileProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
  adminMode = false
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const serviceAreaOptions = [
    'צפון', 'חיפה והקריות', 'מרכז', 'תל אביב והמרכז', 
    'ירושלים והסביבה', 'דרום', 'כל הארץ'
  ];

  const specialtyOptions = [
    'מקצועיות גבוהה', 'שירות אישי', 'אמינות', 'זמינות גבוהה',
    'מחירים תחרותיים', 'ניסיון רב', 'יצירתיות', 'גמישות'
  ];

  const targetAudienceOptions = [
    'ילדים', 'נוער', 'משפחות', 'עובדים', 'מבוגרים', 'קהל מעורב'
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!adminMode) {
      if (!data.businessDescription?.trim()) {
        newErrors.businessDescription = "תיאור העסק הוא שדה חובה";
      }
      if (!data.experience?.trim()) {
        newErrors.experience = "תיאור הניסיון הוא שדה חובה";
      }
      if (!data.serviceAreas?.length) {
        newErrors.serviceAreas = "יש לבחור לפחות אזור שירות אחד";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleServiceAreaToggle = (area: string) => {
    const current = data.serviceAreas || [];
    const updated = current.includes(area)
      ? current.filter((a: string) => a !== area)
      : [...current, area];
    onUpdate({ serviceAreas: updated });
  };

  const handleSpecialtyToggle = (specialty: string) => {
    const current = data.specialties || [];
    const updated = current.includes(specialty)
      ? current.filter((s: string) => s !== specialty)
      : [...current, specialty];
    onUpdate({ specialties: updated });
  };

  const handleTargetAudienceToggle = (audience: string) => {
    const current = data.targetAudience || [];
    const updated = current.includes(audience)
      ? current.filter((a: string) => a !== audience)
      : [...current, audience];
    onUpdate({ targetAudience: updated });
  };

  const addMediaLink = () => {
    const mediaLinks = data.mediaLinks || [];
    onUpdate({
      mediaLinks: [...mediaLinks, {
        id: Date.now().toString(),
        title: '',
        url: '',
        source: '',
        date: ''
      }]
    });
  };

  const updateMediaLink = (index: number, field: string, value: string) => {
    const mediaLinks = [...(data.mediaLinks || [])];
    mediaLinks[index] = { ...mediaLinks[index], [field]: value };
    onUpdate({ mediaLinks });
  };

  const removeMediaLink = (index: number) => {
    const mediaLinks = data.mediaLinks || [];
    onUpdate({
      mediaLinks: mediaLinks.filter((_: any, i: number) => i !== index)
    });
  };

  const addClientRecommendation = () => {
    const recommendations = data.clientRecommendations || [];
    onUpdate({
      clientRecommendations: [...recommendations, {
        id: Date.now().toString(),
        clientName: '',
        company: '',
        position: '',
        logoUrl: '',
        recommendation: ''
      }]
    });
  };

  const updateClientRecommendation = (index: number, field: string, value: string) => {
    const recommendations = [...(data.clientRecommendations || [])];
    recommendations[index] = { ...recommendations[index], [field]: value };
    onUpdate({ clientRecommendations: recommendations });
  };

  const removeClientRecommendation = (index: number) => {
    const recommendations = data.clientRecommendations || [];
    onUpdate({
      clientRecommendations: recommendations.filter((_: any, i: number) => i !== index)
    });
  };

  const handleSubmit = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="text-center mb-6">
        <Building className="h-12 w-12 text-brand-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold">פרופיל עסקי</h2>
        <p className="text-gray-600">
          מלא את הפרטים העסקיים שלך כדי ליצור פרופיל מקצועי
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Description */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              תיאור העסק
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="businessDescription">
              תאר את העסק שלך, השירותים שאתה מציע והניסיון שלך
            </Label>
            <Textarea
              id="businessDescription"
              value={data.businessDescription || ""}
              onChange={(e) => onUpdate({ businessDescription: e.target.value })}
              placeholder="אנחנו עסק מוביל בתחום... עם ניסיון של... מתמחים ב..."
              className="mt-2 min-h-[120px]"
            />
            {errors.businessDescription && (
              <p className="text-red-500 text-sm mt-1">{errors.businessDescription}</p>
            )}
          </CardContent>
        </Card>

        {/* Experience */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              ניסיון והישגים
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="experience">תאר את הניסיון והישגים שלך</Label>
            <Textarea
              id="experience"
              value={data.experience || ""}
              onChange={(e) => onUpdate({ experience: e.target.value })}
              placeholder="מעל 10 שנות ניסיון בתחום, ביצעתי מעל 500 אירועים..."
              className="mt-2"
            />
            {errors.experience && (
              <p className="text-red-500 text-sm mt-1">{errors.experience}</p>
            )}
          </CardContent>
        </Card>

        {/* Service Areas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              אזורי שירות
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label>באילו אזורים אתה מעניק שירות?</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {serviceAreaOptions.map((area) => (
                <div key={area} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id={`area-${area}`}
                    checked={data.serviceAreas?.includes(area) || false}
                    onCheckedChange={() => handleServiceAreaToggle(area)}
                  />
                  <Label htmlFor={`area-${area}`} className="text-sm">
                    {area}
                  </Label>
                </div>
              ))}
            </div>
            {errors.serviceAreas && (
              <p className="text-red-500 text-sm mt-1">{errors.serviceAreas}</p>
            )}
          </CardContent>
        </Card>

        {/* Specialties */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              התמחויות ויתרונות
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label>מה מייחד את השירות שלך?</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {specialtyOptions.map((specialty) => (
                <div key={specialty} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id={`specialty-${specialty}`}
                    checked={data.specialties?.includes(specialty) || false}
                    onCheckedChange={() => handleSpecialtyToggle(specialty)}
                  />
                  <Label htmlFor={`specialty-${specialty}`} className="text-sm">
                    {specialty}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Target Audience */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              קהל יעד
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label>לאיזה קהל אתה מתאים?</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {targetAudienceOptions.map((audience) => (
                <div key={audience} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id={`audience-${audience}`}
                    checked={data.targetAudience?.includes(audience) || false}
                    onCheckedChange={() => handleTargetAudienceToggle(audience)}
                  />
                  <Label htmlFor={`audience-${audience}`} className="text-sm">
                    {audience}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Media Links */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Newspaper className="h-5 w-5" />
              כתבות ותקשורת
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(data.mediaLinks || []).map((link: any, index: number) => (
              <div key={link.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">כתבה #{index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMediaLink(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>כותרת הכתבה</Label>
                    <Input
                      value={link.title}
                      onChange={(e) => updateMediaLink(index, 'title', e.target.value)}
                      placeholder="כותרת הכתבה"
                    />
                  </div>
                  <div>
                    <Label>מקור הפרסום</Label>
                    <Input
                      value={link.source}
                      onChange={(e) => updateMediaLink(index, 'source', e.target.value)}
                      placeholder="שם העיתון/אתר"
                    />
                  </div>
                  <div>
                    <Label>קישור</Label>
                    <Input
                      type="url"
                      value={link.url}
                      onChange={(e) => updateMediaLink(index, 'url', e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <Label>תאריך פרסום</Label>
                    <Input
                      value={link.date}
                      onChange={(e) => updateMediaLink(index, 'date', e.target.value)}
                      placeholder="ינואר 2024"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={addMediaLink}
              className="w-full"
            >
              <Plus className="h-4 w-4 ml-2" />
              הוסף כתבה
            </Button>
          </CardContent>
        </Card>

        {/* Client Recommendations */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ThumbsUp className="h-5 w-5" />
              ממליצים
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(data.clientRecommendations || []).map((rec: any, index: number) => (
              <div key={rec.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">ממליץ #{index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeClientRecommendation(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>שם איש הקשר</Label>
                    <Input
                      value={rec.clientName}
                      onChange={(e) => updateClientRecommendation(index, 'clientName', e.target.value)}
                      placeholder="שם מלא"
                    />
                  </div>
                  <div>
                    <Label>שם החברה</Label>
                    <Input
                      value={rec.company}
                      onChange={(e) => updateClientRecommendation(index, 'company', e.target.value)}
                      placeholder="שם החברה"
                    />
                  </div>
                  <div>
                    <Label>תפקיד</Label>
                    <Input
                      value={rec.position}
                      onChange={(e) => updateClientRecommendation(index, 'position', e.target.value)}
                      placeholder="מנהל/ת כללי/ת"
                    />
                  </div>
                  <div>
                    <Label>לוגו החברה (קישור)</Label>
                    <Input
                      type="url"
                      value={rec.logoUrl}
                      onChange={(e) => updateClientRecommendation(index, 'logoUrl', e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>המלצה</Label>
                    <Textarea
                      value={rec.recommendation}
                      onChange={(e) => updateClientRecommendation(index, 'recommendation', e.target.value)}
                      placeholder="טקסט ההמלצה..."
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={addClientRecommendation}
              className="w-full"
            >
              <Plus className="h-4 w-4 ml-2" />
              הוסף ממליץ
            </Button>
          </CardContent>
        </Card>

        {/* External Links */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              קישורים חיצוניים
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="website">אתר אינטרנט</Label>
              <Input
                id="website"
                type="url"
                value={data.website || ""}
                onChange={(e) => onUpdate({ website: e.target.value })}
                placeholder="https://www.example.com"
                className="mt-1"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="facebook">פייסבוק</Label>
                <Input
                  id="facebook"
                  type="url"
                  value={data.socialLinks?.facebook || ""}
                  onChange={(e) => onUpdate({ 
                    socialLinks: { 
                      ...data.socialLinks, 
                      facebook: e.target.value 
                    }
                  })}
                  placeholder="https://facebook.com/..."
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="instagram">אינסטגרם</Label>
                <Input
                  id="instagram"
                  type="url"
                  value={data.socialLinks?.instagram || ""}
                  onChange={(e) => onUpdate({ 
                    socialLinks: { 
                      ...data.socialLinks, 
                      instagram: e.target.value 
                    }
                  })}
                  placeholder="https://instagram.com/..."
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="linkedin">לינקדאין</Label>
                <Input
                  id="linkedin"
                  type="url"
                  value={data.socialLinks?.linkedin || ""}
                  onChange={(e) => onUpdate({ 
                    socialLinks: { 
                      ...data.socialLinks, 
                      linkedin: e.target.value 
                    }
                  })}
                  placeholder="https://linkedin.com/..."
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            חזור
          </Button>
        )}
        <Button onClick={handleSubmit} className="mr-auto">
          המשך
        </Button>
      </div>
    </div>
  );
};

export default OnboardingBusinessProfile;
