
import { useState, useEffect } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import { useEventContext } from "@/context/EventContext";
import { useGuidedSearchStorage } from "@/hooks/useGuidedSearchStorage";
import BudgetStep from "./steps/BudgetStep";
import AttendeesStep from "./steps/AttendeesStep";
import LocationStep from "./steps/LocationStep";
import EventDateStep from "./steps/EventDateStep";
import ResultsStep from "./steps/ResultsStep";
import { toast } from "sonner";

interface CategoryGuidedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryId: string | null;
}

const STEPS = {
  CATEGORY: 0,
  SUBCATEGORY: 1,
  DATE: 2,
  LOCATION: 3,
  ATTENDEES: 4,
  BUDGET: 5,
  RESULTS: 6
};

const STEP_NAMES = {
  [STEPS.CATEGORY]: 'קטגוריה',
  [STEPS.SUBCATEGORY]: 'תת-קטגוריה',
  [STEPS.DATE]: 'תאריך ושעה',
  [STEPS.LOCATION]: 'מיקום',
  [STEPS.ATTENDEES]: 'מספר משתתפים',
  [STEPS.BUDGET]: 'תקציב',
  [STEPS.RESULTS]: 'תוצאות'
};

const CategoryGuidedSearchModal = ({ isOpen, onClose, categoryId }: CategoryGuidedSearchModalProps) => {
  const [currentStep, setCurrentStep] = useState(STEPS.CATEGORY);
  const { hebrewCategories } = useEventContext();
  const { data: searchData, updateData, clearData } = useGuidedSearchStorage();
  
  const selectedCategory = hebrewCategories.find(cat => cat.id === categoryId);
  const hasSubcategories = selectedCategory?.subcategories && selectedCategory.subcategories.length > 0;

  // איפוס למצב ראשוני כאשר נפתח המודל
  useEffect(() => {
    if (isOpen && categoryId) {
      setCurrentStep(STEPS.CATEGORY);
      updateData({ selectedCategory: categoryId });
    }
  }, [isOpen, categoryId]);

  const handleNext = () => {
    if (currentStep === STEPS.CATEGORY) {
      if (hasSubcategories) {
        setCurrentStep(STEPS.SUBCATEGORY);
      } else {
        setCurrentStep(STEPS.DATE);
      }
    } else if (currentStep < STEPS.RESULTS) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const handleBack = () => {
    if (currentStep > STEPS.CATEGORY) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubcategorySelect = (subcategoryId: string) => {
    updateData({ selectedSubcategory: subcategoryId });
    setCurrentStep(STEPS.DATE);
  };

  const handleSubmitLead = () => {
    console.log("Lead data:", searchData);
    toast.success("פנייתך התקבלה בהצלחה! נציג שלנו ייצור איתך קשר בקרוב", {
      duration: 4000,
      description: "נשלח לך מייל עם סיכום הפרטים תוך כמה דקות"
    });
    onClose();
    setTimeout(() => {
      setCurrentStep(STEPS.CATEGORY);
      clearData();
    }, 300);
  };
  
  const handleCloseModal = () => {
    onClose();
    setTimeout(() => {
      setCurrentStep(STEPS.CATEGORY);
    }, 300);
  };

  const getProgressPercentage = () => {
    const totalSteps = hasSubcategories ? STEPS.RESULTS + 1 : STEPS.RESULTS;
    return Math.round((currentStep / totalSteps) * 100);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-2xl max-h-[90vh] overflow-hidden text-right" dir="rtl">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-center text-2xl flex items-center justify-center gap-2">
            {currentStep === STEPS.RESULTS ? (
              <>
                <span className="text-2xl">🎉</span>
                <span>הפתרונות המומלצים עבורך</span>
              </>
            ) : (
              <>
                <span className="text-2xl">✨</span>
                <span>מצא את הפתרון המושלם - {selectedCategory?.name}</span>
              </>
            )}
          </DialogTitle>
          
          {currentStep !== STEPS.RESULTS && (
            <>
              <DialogDescription className="text-center text-sm text-gray-600">
                ענה על מספר שאלות כדי שנוכל להמליץ לך על השירותים המתאימים ביותר
              </DialogDescription>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>שלב {currentStep + 1} מתוך {hasSubcategories ? STEPS.RESULTS + 1 : STEPS.RESULTS}</span>
                  <span>{STEP_NAMES[currentStep]}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${getProgressPercentage()}%` }}
                  ></div>
                </div>
              </div>
            </>
          )}
        </DialogHeader>
        
        <div className="py-4 overflow-hidden">
          {currentStep === STEPS.CATEGORY && (
            <div className="space-y-6 text-right" dir="rtl">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                  <h3 className="text-xl font-bold">נבחרה הקטגוריה: {selectedCategory?.name}</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  {hasSubcategories ? 'בחר תת-קטגוריה ספציפית' : 'בואו נמשיך לפרטי האירוע'}
                </p>
              </div>
              
              <div className="flex justify-center pt-4">
                <Button 
                  onClick={handleNext}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 h-12"
                >
                  {hasSubcategories ? 'בחר תת-קטגוריה' : 'המשך לפרטי האירוע'}
                  <ChevronLeft className="mr-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {currentStep === STEPS.SUBCATEGORY && hasSubcategories && (
            <div className="space-y-6 text-right" dir="rtl">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                  <h3 className="text-xl font-bold">בחר תת-קטגוריה</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  איזה סוג שירות מ{selectedCategory?.name} אתה מחפש?
                </p>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {selectedCategory?.subcategories?.map((subcategory) => (
                  <Card
                    key={subcategory.id}
                    className="cursor-pointer transition-all duration-200 hover:border-purple-500 hover:shadow-md border-2 hover:bg-purple-50"
                    onClick={() => handleSubcategorySelect(subcategory.id)}
                  >
                    <CardContent className="p-4">
                      <div className="text-right">
                        <div className="font-semibold text-base text-purple-700">{subcategory.name}</div>
                        {subcategory.description && (
                          <div className="text-sm text-gray-600 mt-1">{subcategory.description}</div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={handleBack} className="flex items-center px-6 py-3 h-12">
                  <ChevronRight className="ml-2 h-4 w-4" />
                  חזרה
                </Button>
              </div>
            </div>
          )}

          {currentStep === STEPS.DATE && (
            <EventDateStep 
              eventDate={searchData.eventDate} 
              onUpdate={(date, startTime, endTime) => {
                updateData({ 
                  eventDate: date, 
                  eventStartTime: startTime, 
                  eventEndTime: endTime 
                });
                handleNext();
              }}
            />
          )}

          {currentStep === STEPS.LOCATION && (
            <LocationStep 
              location={searchData.eventLocation}
              onUpdate={(location) => {
                updateData({ eventLocation: location });
                handleNext();
              }}
            />
          )}

          {currentStep === STEPS.ATTENDEES && (
            <AttendeesStep
              attendeesCount={searchData.attendeesCount}
              onSelect={(count) => updateData({ attendeesCount: count })}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          
          {currentStep === STEPS.BUDGET && (
            <BudgetStep
              budget={searchData.budget || { min: 0, max: 0 }}
              onBudgetChange={(budget) => updateData({ budget })}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          
          {currentStep === STEPS.RESULTS && (
            <ResultsStep 
              searchData={searchData}
              onNext={() => {}} // Dummy function since this is the final step
              onBack={handleBack}
              onSubmit={handleSubmitLead}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryGuidedSearchModal;
