
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
import { ChevronRight, ChevronLeft, Sparkles, Target, ArrowRight } from "lucide-react";
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
    toast.success("🎉 פנייתך התקבלה בהצלחה!", {
      duration: 4000,
      description: "נציג שלנו ייצור איתך קשר תוך 24 שעות. נשלח לך מייל עם סיכום הפרטים"
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
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">✓</span>
                </div>
                <span>הפתרונות המומלצים עבורך</span>
              </>
            ) : (
              <>
                <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center">
                  <Target className="h-4 w-4 text-white" />
                </div>
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
                    className="bg-gradient-to-l from-brand-600 to-brand-500 h-2 rounded-full transition-all duration-500" 
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
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">נבחרה הקטגוריה: {selectedCategory?.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {hasSubcategories ? 'בחר תת-קטגוריה ספציפית' : 'בואו נמשיך לפרטי האירוע'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center pt-4">
                <Button 
                  onClick={handleNext}
                  className="bg-gradient-to-l from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white px-8 py-4 h-12 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <span className="ml-2">🎯</span>
                  {hasSubcategories ? 'בחר תת-קטגוריה' : 'המשך לפרטי האירוע'}
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {currentStep === STEPS.SUBCATEGORY && hasSubcategories && (
            <div className="space-y-6 text-right" dir="rtl">
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">בחר תת-קטגוריה</h3>
                    <p className="text-gray-600 text-sm">
                      איזה סוג שירות מ{selectedCategory?.name} אתה מחפש?
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {selectedCategory?.subcategories?.map((subcategory) => (
                  <Card
                    key={subcategory.id}
                    className="cursor-pointer transition-all duration-200 hover:border-brand-500 hover:shadow-lg border-2 hover:bg-gradient-to-l hover:from-brand-50 hover:to-purple-50 group"
                    onClick={() => handleSubcategorySelect(subcategory.id)}
                  >
                    <CardContent className="p-4">
                      <div className="text-right flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-semibold text-base text-brand-700 group-hover:text-brand-800">{subcategory.name}</div>
                          {subcategory.description && (
                            <div className="text-sm text-gray-600 mt-1">{subcategory.description}</div>
                          )}
                        </div>
                        <div className="mr-3 opacity-50 group-hover:opacity-100 transition-opacity">
                          <ArrowRight className="h-5 w-5 text-brand-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={handleBack} 
                  className="flex items-center px-6 py-3 h-12 border-2 border-gray-300 hover:border-brand-500 hover:bg-brand-50 transition-all duration-200"
                >
                  <ChevronRight className="ml-2 h-4 w-4" />
                  <span className="ml-1">⬅️</span>
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
