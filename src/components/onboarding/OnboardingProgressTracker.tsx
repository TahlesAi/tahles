
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, AlertCircle, Mail, Phone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface OnboardingProgressTrackerProps {
  currentStep: number;
  formData: any;
  totalSteps: number;
}

interface ProgressStage {
  id: string;
  title: string;
  status: 'completed' | 'current' | 'pending' | 'warning';
  description: string;
  completionTime?: string;
  warnings?: string[];
}

const OnboardingProgressTracker: React.FC<OnboardingProgressTrackerProps> = ({
  currentStep,
  formData,
  totalSteps
}) => {
  const { toast } = useToast();
  const [stages, setStages] = useState<ProgressStage[]>([]);
  const [showNotifications, setShowNotifications] = useState(true);

  // חישוב אחוז השלמה
  const completionPercentage = (currentStep / totalSteps) * 100;

  // בדיקה אם שדות חובה מולאו
  const checkRequiredFields = (step: number, data: any): string[] => {
    const warnings: string[] = [];
    
    switch (step) {
      case 1:
        if (!data.businessName) warnings.push("שם העסק נדרש");
        if (!data.fullName) warnings.push("שם מלא נדרש");
        if (!data.email) warnings.push("כתובת מייל נדרשת");
        if (!data.phone) warnings.push("מספר טלפון נדרש");
        break;
      case 2:
        if (!data.idImage) warnings.push("תמונת תעודת זהות נדרשת");
        break;
      case 3:
        if (!data.businessDescription) warnings.push("תיאור העסק נדרש");
        if (!data.experience) warnings.push("תיאור הניסיון נדרש");
        break;
      case 4:
        if (!data.category) warnings.push("בחירת קטגוריה נדרשת");
        if (!data.subcategory) warnings.push("בחירת תת-קטגוריה נדרשת");
        break;
      case 5:
        if (!data.services || data.services.length === 0) warnings.push("יש להוסיף לפחות שירות אחד");
        break;
      case 6:
        if (!data.coverImage) warnings.push("תמונת כיסוי נדרשת");
        if (!data.logo) warnings.push("לוגו נדרש");
        break;
      case 7:
        if (!data.termsAccepted) warnings.push("יש לאשר את התנאים");
        break;
    }
    
    return warnings;
  };

  // עדכון שלבי ההתקדמות
  useEffect(() => {
    const newStages: ProgressStage[] = [
      {
        id: "personal-info",
        title: "פרטים אישיים",
        status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'current' : 'pending',
        description: "מילוי פרטי יסוד",
        completionTime: currentStep > 1 ? "הושלם" : undefined,
        warnings: currentStep === 1 ? checkRequiredFields(1, formData) : []
      },
      {
        id: "documents",
        title: "מסמכים",
        status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'current' : 'pending',
        description: "העלאת מסמכים נדרשים",
        completionTime: currentStep > 2 ? "הושלם" : undefined,
        warnings: currentStep === 2 ? checkRequiredFields(2, formData) : []
      },
      {
        id: "business-profile",
        title: "פרופיל עסקי",
        status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'current' : 'pending',
        description: "בניית פרופיל מקצועי",
        completionTime: currentStep > 3 ? "הושלם" : undefined,
        warnings: currentStep === 3 ? checkRequiredFields(3, formData) : []
      },
      {
        id: "categories",
        title: "קטגוריות",
        status: currentStep > 4 ? 'completed' : currentStep === 4 ? 'current' : 'pending',
        description: "בחירת תחומי עיסוק",
        completionTime: currentStep > 4 ? "הושלם" : undefined,
        warnings: currentStep === 4 ? checkRequiredFields(4, formData) : []
      },
      {
        id: "services",
        title: "שירותים",
        status: currentStep > 5 ? 'completed' : currentStep === 5 ? 'current' : 'pending',
        description: "הגדרת מוצרים ושירותים",
        completionTime: currentStep > 5 ? "הושלם" : undefined,
        warnings: currentStep === 5 ? checkRequiredFields(5, formData) : []
      },
      {
        id: "provider-profile",
        title: "דף ספק",
        status: currentStep > 6 ? 'completed' : currentStep === 6 ? 'current' : 'pending',
        description: "עיצוב דף הספק",
        completionTime: currentStep > 6 ? "הושלם" : undefined,
        warnings: currentStep === 6 ? checkRequiredFields(6, formData) : []
      },
      {
        id: "review",
        title: "סקירה",
        status: currentStep > 7 ? 'completed' : currentStep === 7 ? 'current' : 'pending',
        description: "בדיקה אחרונה",
        completionTime: currentStep > 7 ? "הושלם" : undefined,
        warnings: currentStep === 7 ? checkRequiredFields(7, formData) : []
      },
      {
        id: "signature",
        title: "חתימה",
        status: currentStep > 8 ? 'completed' : currentStep === 8 ? 'current' : 'pending',
        description: "חתימה דיגיטלית",
        completionTime: currentStep > 8 ? "הושלם" : undefined
      },
      {
        id: "complete",
        title: "השלמה",
        status: currentStep >= 9 ? 'completed' : 'pending',
        description: "תהליך ההרשמה הושלם",
        completionTime: currentStep >= 9 ? "הושלם" : undefined
      }
    ];

    // עדכון סטטוס אזהרות
    newStages.forEach(stage => {
      if (stage.warnings && stage.warnings.length > 0) {
        stage.status = 'warning';
      }
    });

    setStages(newStages);
  }, [currentStep, formData]);

  // התראות אוטומטיות
  useEffect(() => {
    if (!showNotifications) return;

    const currentStage = stages.find(s => s.status === 'current');
    if (currentStage && currentStage.warnings && currentStage.warnings.length > 0) {
      toast({
        title: "שדות חסרים",
        description: `יש ${currentStage.warnings.length} שדות שטרם מולאו בשלב הנוכחי`,
        variant: "default"
      });
    }

    // התראה על התקדמות מהירה
    if (completionPercentage > 50 && currentStep > 5) {
      setTimeout(() => {
        toast({
          title: "יפה! אתם מתקדמים מצוין",
          description: "אתם כבר באמצע הדרך. עוד מעט נסיים!",
          variant: "default"
        });
      }, 2000);
    }
  }, [stages, showNotifications, currentStep, completionPercentage]);

  // זמן משוער להשלמה
  const getEstimatedTime = () => {
    const stepsLeft = totalSteps - currentStep;
    const avgTimePerStep = 3; // דקות ממוצעות לשלב
    return stepsLeft * avgTimePerStep;
  };

  const getStatusIcon = (status: ProgressStage['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'current':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <div className="h-4 w-4 rounded-full border-2 border-gray-300"></div>;
    }
  };

  const getStatusColor = (status: ProgressStage['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'current':
        return 'bg-blue-100 text-blue-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">התקדמות ההרשמה</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {Math.round(completionPercentage)}% הושלם
            </Badge>
            <Badge variant="secondary">
              זמן משוער: {getEstimatedTime()} דק'
            </Badge>
          </div>
        </div>
        <Progress value={completionPercentage} className="w-full" />
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {stages.map((stage, index) => (
            <div
              key={stage.id}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                stage.status === 'current' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
              }`}
            >
              <div className="flex-shrink-0">
                {getStatusIcon(stage.status)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm">{stage.title}</h4>
                  <Badge className={`text-xs ${getStatusColor(stage.status)}`}>
                    {stage.status === 'completed' ? 'הושלם' :
                     stage.status === 'current' ? 'בתהליך' :
                     stage.status === 'warning' ? 'דורש תשומת לב' : 'ממתין'}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600">{stage.description}</p>
                
                {stage.warnings && stage.warnings.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-yellow-700 font-medium">שדות חסרים:</p>
                    <ul className="text-xs text-yellow-600 list-disc list-inside">
                      {stage.warnings.map((warning, idx) => (
                        <li key={idx}>{warning}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {stage.completionTime && (
                <div className="text-xs text-gray-500">
                  {stage.completionTime}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* קישורי עזרה */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-sm mb-2">צריך עזרה?</h4>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              <Mail className="h-3 w-3 mr-1" />
              שלח מייל לתמיכה
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <Phone className="h-3 w-3 mr-1" />
              התקשר לתמיכה
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OnboardingProgressTracker;
