
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  User, 
  Building, 
  Tag, 
  Calendar, 
  Camera, 
  Check,
  ArrowRight,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExtendedProviderProfile } from '@/types/extendedSchema';
import { generateDefaultCalendar, generateDefaultWorkingHours } from '@/utils/defaultCalendarGenerator';

interface RegistrationData {
  // שלב 1: פרטים בסיסיים
  name: string;
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  
  // שלב 2: קטגוריות ותיוג
  primaryCategoryId: string;
  secondaryCategoryIds: string[];
  subcategoryIds: string[];
  
  // שלב 3: תיאור ושירותים
  description: string;
  conceptTags: string[];
  
  // שלב 4: הגדרות יומן
  calendarSettings: any;
  workingHours: any;
  
  // שלב 5: מדיה וגימור
  logo: string;
  gallery: string[];
  
  // מטא-דאטה
  isMock: boolean;
  simulationType: 'demo' | 'completion' | 'testing';
}

const availableCategories = [
  { id: 'cat-001', name: 'זמרים, נגנים ולהקות' },
  { id: 'cat-002', name: 'שחקנים ומיצגים' },
  { id: 'cat-003', name: 'קוסמים וקרקס' },
  { id: 'cat-008', name: 'אומני חושים' },
  { id: 'cat-009', name: 'סטנדאפיסטים' },
];

const availableConceptTags = [
  'יום הולדת', 'בר מצווה', 'בת מצווה', 'חתונה', 'אירועי חברה',
  'מסיבת רווקים', 'מסיבת רווקות', 'ערב גיבוש', 'מסיבת סיום'
];

const ProgressiveProviderRegistration: React.FC<{
  onComplete: (providerData: ExtendedProviderProfile) => void;
  onCancel: () => void;
}> = ({ onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    name: '',
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    city: '',
    primaryCategoryId: '',
    secondaryCategoryIds: [],
    subcategoryIds: [],
    description: '',
    conceptTags: [],
    calendarSettings: null,
    workingHours: null,
    logo: '',
    gallery: [],
    isMock: true,
    simulationType: 'demo'
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const updateData = (updates: Partial<RegistrationData>) => {
    setRegistrationData(prev => ({ ...prev, ...updates }));
    // נקה שגיאות validation לשדות שעודכנו
    const updatedFields = Object.keys(updates);
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      updatedFields.forEach(field => delete newErrors[field]);
      return newErrors;
    });
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!registrationData.name) errors.name = 'שם נדרש';
        if (!registrationData.email) errors.email = 'אימייל נדרש';
        if (!registrationData.phone) errors.phone = 'טלפון נדרש';
        if (!registrationData.city) errors.city = 'עיר נדרשת';
        break;
        
      case 2:
        if (!registrationData.primaryCategoryId) errors.primaryCategoryId = 'קטגוריה ראשית נדרשת';
        break;
        
      case 3:
        if (!registrationData.description) errors.description = 'תיאור נדרש';
        if (registrationData.conceptTags.length === 0) errors.conceptTags = 'בחר לפחות קונספט אחד';
        break;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        handleComplete();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // יצירת פרופיל ספק מלא
    const newProvider: ExtendedProviderProfile = {
      id: `provider-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      
      name: registrationData.name,
      businessName: registrationData.businessName || registrationData.name,
      description: registrationData.description,
      contactPerson: registrationData.contactPerson,
      email: registrationData.email,
      phone: registrationData.phone,
      city: registrationData.city,
      
      primaryCategoryId: registrationData.primaryCategoryId,
      secondaryCategoryIds: registrationData.secondaryCategoryIds,
      subcategoryIds: registrationData.subcategoryIds,
      
      rating: 0,
      reviewCount: 0,
      verified: false,
      featured: false,
      
      isMock: registrationData.isMock,
      simulationType: registrationData.simulationType,
      
      calendarActive: true,
      hasAvailableCalendar: true,
      defaultCalendar: generateDefaultCalendar(`provider-${Date.now()}`),
      workingHours: generateDefaultWorkingHours(),
      
      services: [],
      gallery: registrationData.gallery,
      logo: registrationData.logo,
      testimonials: [],
      
      dataIntegrity: {
        lastCheck: new Date().toISOString(),
        hasErrors: false,
        errors: [],
        warnings: [],
        score: 85 // ציון התחלתי
      }
    };

    onComplete(newProvider);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5" />
              <h3 className="text-lg font-semibold">פרטים בסיסיים</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">שם הספק *</Label>
                <Input
                  id="name"
                  value={registrationData.name}
                  onChange={(e) => updateData({ name: e.target.value })}
                  className={validationErrors.name ? 'border-red-500' : ''}
                />
                {validationErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="businessName">שם עסק</Label>
                <Input
                  id="businessName"
                  value={registrationData.businessName}
                  onChange={(e) => updateData({ businessName: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="contactPerson">איש קשר</Label>
                <Input
                  id="contactPerson"
                  value={registrationData.contactPerson}
                  onChange={(e) => updateData({ contactPerson: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="email">אימייל *</Label>
                <Input
                  id="email"
                  type="email"
                  value={registrationData.email}
                  onChange={(e) => updateData({ email: e.target.value })}
                  className={validationErrors.email ? 'border-red-500' : ''}
                />
                {validationErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="phone">טלפון *</Label>
                <Input
                  id="phone"
                  value={registrationData.phone}
                  onChange={(e) => updateData({ phone: e.target.value })}
                  className={validationErrors.phone ? 'border-red-500' : ''}
                />
                {validationErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="city">עיר *</Label>
                <Input
                  id="city"
                  value={registrationData.city}
                  onChange={(e) => updateData({ city: e.target.value })}
                  className={validationErrors.city ? 'border-red-500' : ''}
                />
                {validationErrors.city && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.city}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="h-5 w-5" />
              <h3 className="text-lg font-semibold">קטגוריות ותיוג</h3>
            </div>
            
            <div>
              <Label>קטגוריה ראשית *</Label>
              <Select 
                value={registrationData.primaryCategoryId} 
                onValueChange={(value) => updateData({ primaryCategoryId: value })}
              >
                <SelectTrigger className={validationErrors.primaryCategoryId ? 'border-red-500' : ''}>
                  <SelectValue placeholder="בחר קטגוריה" />
                </SelectTrigger>
                <SelectContent>
                  {availableCategories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {validationErrors.primaryCategoryId && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.primaryCategoryId}</p>
              )}
            </div>

            <div>
              <Label>קטגוריות משניות</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {availableCategories
                  .filter(cat => cat.id !== registrationData.primaryCategoryId)
                  .map(cat => (
                    <div key={cat.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`secondary-${cat.id}`}
                        checked={registrationData.secondaryCategoryIds.includes(cat.id)}
                        onCheckedChange={(checked) => {
                          const newIds = checked
                            ? [...registrationData.secondaryCategoryIds, cat.id]
                            : registrationData.secondaryCategoryIds.filter(id => id !== cat.id);
                          updateData({ secondaryCategoryIds: newIds });
                        }}
                      />
                      <Label htmlFor={`secondary-${cat.id}`} className="text-sm">
                        {cat.name}
                      </Label>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Building className="h-5 w-5" />
              <h3 className="text-lg font-semibold">תיאור ושירותים</h3>
            </div>
            
            <div>
              <Label htmlFor="description">תיאור הספק *</Label>
              <Textarea
                id="description"
                value={registrationData.description}
                onChange={(e) => updateData({ description: e.target.value })}
                placeholder="תאר את השירותים והיכולות שלך..."
                className={validationErrors.description ? 'border-red-500' : ''}
              />
              {validationErrors.description && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.description}</p>
              )}
            </div>

            <div>
              <Label>קונספטים רלוונטיים *</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {availableConceptTags.map(tag => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={`concept-${tag}`}
                      checked={registrationData.conceptTags.includes(tag)}
                      onCheckedChange={(checked) => {
                        const newTags = checked
                          ? [...registrationData.conceptTags, tag]
                          : registrationData.conceptTags.filter(t => t !== tag);
                        updateData({ conceptTags: newTags });
                      }}
                    />
                    <Label htmlFor={`concept-${tag}`} className="text-sm">
                      {tag}
                    </Label>
                  </div>
                ))}
              </div>
              {validationErrors.conceptTags && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.conceptTags}</p>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5" />
              <h3 className="text-lg font-semibold">הגדרות יומן</h3>
            </div>
            
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                יומן דיפולט יוגדר עבורך עם שעות עבודה סטנדרטיות. תוכל לערוך אותו מאוחר יותר.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <p className="font-medium">הגדרות יומן אוטומטיות:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                <li>ימי עבודה: ראשון עד חמישי</li>
                <li>שעות עבודה: 09:00-22:00</li>
                <li>הפסקת צהריים: 13:00-14:00</li>
                <li>שמירת שבת וחגים</li>
                <li>זמינות מלאה לחודש קדימה</li>
              </ul>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Camera className="h-5 w-5" />
              <h3 className="text-lg font-semibold">גימור והשלמה</h3>
            </div>
            
            <Alert>
              <Check className="h-4 w-4" />
              <AlertDescription>
                הפרופיל שלך כמעט מוכן! תוכל להוסיף תמונות ופרטים נוספים אחרי ההרשמה.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="mockProvider"
                  checked={registrationData.isMock}
                  onCheckedChange={(checked) => updateData({ isMock: !!checked })}
                />
                <Label htmlFor="mockProvider" className="text-sm">
                  זהו פרופיל הדגמה (לא אמיתי)
                </Label>
              </div>

              {registrationData.isMock && (
                <div>
                  <Label>סוג הדגמה</Label>
                  <Select 
                    value={registrationData.simulationType} 
                    onValueChange={(value: any) => updateData({ simulationType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="demo">הדגמה</SelectItem>
                      <SelectItem value="completion">השלמה</SelectItem>
                      <SelectItem value="testing">בדיקות</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="border rounded p-4 bg-gray-50">
              <h4 className="font-medium mb-2">סיכום רישום:</h4>
              <div className="space-y-1 text-sm">
                <p><strong>שם:</strong> {registrationData.name}</p>
                <p><strong>אימייל:</strong> {registrationData.email}</p>
                <p><strong>עיר:</strong> {registrationData.city}</p>
                <p><strong>קטגוריה:</strong> {availableCategories.find(c => c.id === registrationData.primaryCategoryId)?.name}</p>
                <p><strong>קונספטים:</strong> {registrationData.conceptTags.join(', ')}</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>רישום ספק חדש</span>
          <Badge variant="outline">שלב {currentStep} מתוך {totalSteps}</Badge>
        </CardTitle>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {renderStepContent()}
          
          <div className="flex justify-between pt-6 border-t">
            <div className="flex gap-2">
              {currentStep > 1 && (
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="h-4 w-4 ml-1" />
                  חזור
                </Button>
              )}
              <Button variant="outline" onClick={onCancel}>
                ביטול
              </Button>
            </div>
            
            <Button onClick={handleNext}>
              {currentStep === totalSteps ? (
                <>
                  <Check className="h-4 w-4 ml-1" />
                  השלם רישום
                </>
              ) : (
                <>
                  המשך
                  <ArrowRight className="h-4 w-4 mr-1" />
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressiveProviderRegistration;
