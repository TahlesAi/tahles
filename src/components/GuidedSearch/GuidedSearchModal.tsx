
import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import EventDateStep from "./steps/EventDateStep";
import EventTypeStep from "./steps/EventTypeStep";
import LocationStep from "./steps/LocationStep";
import ConceptStep from "./steps/ConceptStep";
import AttendeesStep from "./steps/AttendeesStep";
import BudgetStep from "./steps/BudgetStep";
import ResultsStep from "./steps/ResultsStep";
import { toast } from "sonner";
import { HebrewConcept, HebrewCategory } from "@/lib/types/hierarchy";
import { useEventContext } from "@/context/EventContext";

export type EventType = 'private' | 'business' | 'mixed' | 'children';

export interface GuidedSearchData {
  eventDate?: Date | null;
  eventStartTime?: string;
  eventEndTime?: string;
  eventType?: EventType;
  attendeesCount?: string;
  eventLocation?: {
    city: string;
    address?: string;
  };
  eventConcept?: string;
  conceptDetails?: string;
  conceptAudience?: 'family' | 'friends' | 'mixed' | null;
  selectedCategory?: string;
  selectedSubcategory?: string;
  selectedHebrewConcept?: HebrewConcept | null;
  selectedSubconcept?: string;
  budget?: {
    min: number;
    max: number;
  };
}

interface GuidedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = {
  EVENT_DATE: 0,
  EVENT_TYPE: 1,
  LOCATION: 2,
  CONCEPT: 3,
  ATTENDEES: 4,
  BUDGET: 5,
  RESULTS: 6
};

const STEP_NAMES = {
  [STEPS.EVENT_DATE]: 'תאריך ושעה',
  [STEPS.EVENT_TYPE]: 'סוג אירוע',
  [STEPS.LOCATION]: 'מיקום',
  [STEPS.CONCEPT]: 'קונספט',
  [STEPS.ATTENDEES]: 'מספר משתתפים',
  [STEPS.BUDGET]: 'תקציב',
  [STEPS.RESULTS]: 'תוצאות'
};

const GuidedSearchModal = ({ isOpen, onClose }: GuidedSearchModalProps) => {
  const [currentStep, setCurrentStep] = useState(STEPS.EVENT_DATE);
  const [searchData, setSearchData] = useState<GuidedSearchData>({});
  const { hebrewCategories, hebrewConcepts } = useEventContext();
  
  const handleNext = () => {
    if (currentStep < STEPS.RESULTS) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const handleBack = () => {
    if (currentStep > STEPS.EVENT_DATE) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const updateSearchData = (data: Partial<GuidedSearchData>) => {
    setSearchData(prev => ({ ...prev, ...data }));
  };

  const handleStepNext = (data?: Partial<GuidedSearchData>) => {
    if (data) {
      updateSearchData(data);
    }
    handleNext();
  };
  
  const handleSubmitLead = () => {
    console.log("Lead data:", searchData);
    toast.success("פנייתך התקבלה בהצלחה! נציג שלנו ייצור איתך קשר בקרוב", {
      duration: 4000,
      description: "נשלח לך מייל עם סיכום הפרטים תוך כמה דקות"
    });
    onClose();
    setTimeout(() => {
      setCurrentStep(STEPS.EVENT_DATE);
      setSearchData({});
    }, 300);
  };
  
  const handleCloseModal = () => {
    onClose();
    setTimeout(() => {
      setCurrentStep(STEPS.EVENT_DATE);
      setSearchData({});
    }, 300);
  };

  const getProgressPercentage = () => {
    return Math.round((currentStep / STEPS.RESULTS) * 100);
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
                <span>מצא את הפתרון המושלם לאירוע שלך</span>
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
                  <span>שלב {currentStep + 1} מתוך {STEPS.RESULTS + 1}</span>
                  <span>{STEP_NAMES[currentStep]}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${getProgressPercentage()}%` }}
                  ></div>
                </div>
              </div>
            </>
          )}
        </DialogHeader>
        
        <div className="py-4 overflow-hidden">
          {currentStep === STEPS.EVENT_DATE && (
            <EventDateStep 
              eventDate={searchData.eventDate} 
              onUpdate={(date, startTime, endTime) => handleStepNext({ 
                eventDate: date, 
                eventStartTime: startTime, 
                eventEndTime: endTime 
              })}
            />
          )}

          {currentStep === STEPS.EVENT_TYPE && (
            <EventTypeStep 
              selectedType={searchData.eventType}
              onSelect={(type) => handleStepNext({ eventType: type })}
              hebrewConcepts={hebrewConcepts}
              onSelectHebrewConcept={(concept) => 
                handleStepNext({ 
                  selectedHebrewConcept: concept,
                  eventType: 
                    concept.id === 'family-event' ? 'private' : 
                    concept.id === 'company-event' ? 'business' :
                    concept.id === 'children-event' ? 'children' :
                    'mixed'
                })
              }
            />
          )}

          {currentStep === STEPS.LOCATION && (
            <LocationStep 
              location={searchData.eventLocation}
              onUpdate={(location) => handleStepNext({ eventLocation: location })}
            />
          )}

          {currentStep === STEPS.CONCEPT && (
            <ConceptStep 
              selectedConcept={searchData.eventConcept}
              selectedHebrewConcept={searchData.selectedHebrewConcept}
              selectedSubconcept={searchData.selectedSubconcept}
              eventType={searchData.eventType}
              hebrewCategories={hebrewCategories}
              onSelectConcept={(concept) => updateSearchData({ selectedHebrewConcept: concept })}
              onSelectSubconcept={(subconcept) => updateSearchData({ selectedSubconcept: subconcept })}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === STEPS.ATTENDEES && (
            <AttendeesStep
              attendeesCount={searchData.attendeesCount}
              onSelect={(count) => updateSearchData({ attendeesCount: count })}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          
          {currentStep === STEPS.BUDGET && (
            <BudgetStep
              budget={searchData.budget || { min: 0, max: 0 }}
              onBudgetChange={(budget) => updateSearchData({ budget })}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          
          {currentStep === STEPS.RESULTS && (
            <ResultsStep 
              searchData={searchData}
              onBack={handleBack}
              onSubmit={handleSubmitLead}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GuidedSearchModal;
