
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
import ResultsStep from "./steps/ResultsStep";
import { toast } from "react-toastify";

export type EventType = 'private' | 'business' | 'mixed' | 'children';
export type EventConcept = {
  id: string;
  name: string;
  category: EventType | 'all';
};

export interface GuidedSearchData {
  eventDate?: Date | null;
  eventType?: EventType;
  attendeesCount?: string;
  eventConcept?: string;
  conceptDetails?: string; // לפרטים נוספים כמו גיל בימי הולדת
  conceptAudience?: 'family' | 'friends' | 'mixed' | null; // למי מיועד האירוע
}

interface GuidedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = {
  EVENT_DATE: 0,
  EVENT_TYPE: 1,
  ATTENDEES: 2,
  CONCEPT: 3,
  RESULTS: 4
};

const GuidedSearchModal = ({ isOpen, onClose }: GuidedSearchModalProps) => {
  const [currentStep, setCurrentStep] = useState(STEPS.EVENT_DATE);
  const [searchData, setSearchData] = useState<GuidedSearchData>({});
  
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
    handleNext();
  };
  
  const handleSubmitLead = () => {
    // כאן נשלח את הפרטים של הליד לשרת
    console.log("Lead data:", searchData);
    toast.success("פנייתך התקבלה בהצלחה! נציג שלנו ייצור איתך קשר בקרוב");
    onClose();
    setCurrentStep(STEPS.EVENT_DATE);
    setSearchData({});
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            {currentStep === STEPS.RESULTS ? "הפתרונות המומלצים עבורך" : "מצא את הפתרון המושלם לאירוע שלך"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {currentStep !== STEPS.RESULTS && "ענה על מספר שאלות כדי שנוכל להמליץ לך על השירותים המתאימים ביותר"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6">
          {currentStep === STEPS.EVENT_DATE && (
            <EventDateStep 
              eventDate={searchData.eventDate} 
              onUpdate={(date) => updateSearchData({ eventDate: date })}
              onSkip={() => updateSearchData({ eventDate: null })}
            />
          )}
          
          {currentStep === STEPS.EVENT_TYPE && (
            <EventTypeStep 
              selectedType={searchData.eventType}
              onSelect={(type) => updateSearchData({ eventType: type })}
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
              onUpdate={(concept, details, audience) => 
                updateSearchData({ 
                  eventConcept: concept, 
                  conceptDetails: details,
                  conceptAudience: audience
                })
              }
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
