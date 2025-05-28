
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
  eventTime?: string; // Added time field
  eventType?: EventType;
  attendeesCount?: string;
  eventConcept?: string;
  conceptDetails?: string; // לפרטים נוספים כמו גיל בימי הולדת
  conceptAudience?: 'family' | 'friends' | 'mixed' | null; // למי מיועד האירוע
  // שדות נוספים לפי הקונספטים העבריים
  selectedCategory?: string;
  selectedSubcategory?: string;
  selectedHebrewConcept?: HebrewConcept | null;
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
  
  const handleCloseModal = () => {
    onClose();
    // איפוס שלבים ונתונים בעת סגירת החלון
    setTimeout(() => {
      setCurrentStep(STEPS.EVENT_DATE);
      setSearchData({});
    }, 300);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-2xl text-right" dir="rtl">
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
              onUpdate={(date, time) => updateSearchData({ eventDate: date, eventTime: time })}
              onSkip={() => updateSearchData({ eventDate: null, eventTime: undefined })}
            />
          )}
          
          {currentStep === STEPS.EVENT_TYPE && (
            <EventTypeStep 
              selectedType={searchData.eventType}
              onSelect={(type) => updateSearchData({ eventType: type })}
              hebrewConcepts={hebrewConcepts}
              onSelectHebrewConcept={(concept) => 
                updateSearchData({ 
                  selectedHebrewConcept: concept,
                  // מיפוי קונספט עברי לסוג אירוע של המערכת
                  eventType: 
                    concept.id === 'family-event' ? 'private' : 
                    concept.id === 'company-event' ? 'business' : 
                    'mixed'
                })
              }
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
