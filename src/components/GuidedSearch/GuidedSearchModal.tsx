
import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import EventTypeStep from "./steps/EventTypeStep";
import EventDateStep from "./steps/EventDateStep";
import AttendeesStep from "./steps/AttendeesStep";
import ConceptStep from "./steps/ConceptStep";
import BudgetStep from "./steps/BudgetStep";
import ResultsStep from "./steps/ResultsStep";
import { toast } from "sonner";
import { HebrewConcept, HebrewCategory } from "@/lib/types/hierarchy";
import { useEventContext } from "@/context/EventContext";

export type EventType = 'private' | 'business' | 'mixed' | 'children';
export type EventConcept = {
  id: string;
  name: string;
  category: EventType | 'all';
};

export interface GuidedSearchData {
  eventDate?: Date | null;
  eventStartTime?: string;
  eventEndTime?: string;
  eventType?: EventType;
  attendeesCount?: string;
  eventConcept?: string;
  conceptDetails?: string;
  conceptAudience?: 'family' | 'friends' | 'mixed' | null;
  selectedCategory?: string;
  selectedSubcategory?: string;
  selectedHebrewConcept?: HebrewConcept | null;
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
  EVENT_TYPE: 0,
  EVENT_DATE: 1,
  ATTENDEES: 2,
  CONCEPT: 3,
  BUDGET: 4,
  RESULTS: 5
};

const GuidedSearchModal = ({ isOpen, onClose }: GuidedSearchModalProps) => {
  const [currentStep, setCurrentStep] = useState(STEPS.EVENT_TYPE);
  const [searchData, setSearchData] = useState<GuidedSearchData>({});
  const { hebrewCategories, hebrewConcepts } = useEventContext();
  
  const handleNext = () => {
    if (currentStep < STEPS.RESULTS) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const handleBack = () => {
    if (currentStep > STEPS.EVENT_TYPE) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const updateSearchData = (data: Partial<GuidedSearchData>) => {
    setSearchData(prev => ({ ...prev, ...data }));
    handleNext();
  };
  
  const handleSubmitLead = () => {
    console.log("Lead data:", searchData);
    toast.success("פנייתך התקבלה בהצלחה! נציג שלנו ייצור איתך קשר בקרוב");
    onClose();
    setCurrentStep(STEPS.EVENT_TYPE);
    setSearchData({});
  };
  
  const handleCloseModal = () => {
    onClose();
    setTimeout(() => {
      setCurrentStep(STEPS.EVENT_TYPE);
      setSearchData({});
    }, 300);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-2xl max-h-[90vh] overflow-y-auto text-right" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            {currentStep === STEPS.RESULTS ? "הפתרונות המומלצים עבורך" : "מצא את הפתרון המושלם לאירוע שלך"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {currentStep !== STEPS.RESULTS && "ענה על מספר שאלות כדי שנוכל להמליץ לך על השירותים המתאימים ביותר"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6 overflow-y-auto max-h-[60vh]">
          {currentStep === STEPS.EVENT_TYPE && (
            <EventTypeStep 
              selectedType={searchData.eventType}
              onSelect={(type) => updateSearchData({ eventType: type })}
              hebrewConcepts={hebrewConcepts}
              onSelectHebrewConcept={(concept) => 
                updateSearchData({ 
                  selectedHebrewConcept: concept,
                  eventType: 
                    concept.id === 'family-event' ? 'private' : 
                    concept.id === 'company-event' ? 'business' : 
                    'mixed'
                })
              }
            />
          )}
          
          {currentStep === STEPS.EVENT_DATE && (
            <EventDateStep 
              eventDate={searchData.eventDate} 
              onUpdate={(date, startTime, endTime) => updateSearchData({ 
                eventDate: date, 
                eventStartTime: startTime, 
                eventEndTime: endTime 
              })}
              onSkip={() => updateSearchData({ 
                eventDate: null, 
                eventStartTime: undefined, 
                eventEndTime: undefined 
              })}
            />
          )}
          
          {currentStep === STEPS.ATTENDEES && (
            <AttendeesStep 
              attendeesCount={searchData.attendeesCount}
              onUpdate={(count) => updateSearchData({ attendeesCount: count })}
            />
          )}
          
          {currentStep === STEPS.CONCEPT && (
            <ConceptStep 
              eventType={searchData.eventType}
              selectedConcept={searchData.eventConcept}
              selectedHebrewConcept={searchData.selectedHebrewConcept}
              hebrewCategories={hebrewCategories}
              onUpdate={(concept, details, audience, category, subcategory) => 
                updateSearchData({ 
                  eventConcept: concept, 
                  conceptDetails: details,
                  conceptAudience: audience,
                  selectedCategory: category,
                  selectedSubcategory: subcategory
                })
              }
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
