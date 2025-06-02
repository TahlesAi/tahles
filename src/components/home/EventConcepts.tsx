
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useEventContext } from "@/context/EventContext";
import useIsMobile from "@/hooks/use-mobile";
import GuidedSearchModal from "@/components/GuidedSearch/GuidedSearchModal";
import { 
  Cake, 
  PartyPopper, 
  Users, 
  Star, 
  Heart, 
  Building, 
  Sparkles, 
  TentTree, 
  Gift 
} from "lucide-react";

// מיפוי אייקונים
const iconMap: Record<string, React.ReactNode> = {
  "Cake": <Cake className="h-4 w-4" />,
  "PartyPopper": <PartyPopper className="h-4 w-4" />,
  "Users": <Users className="h-4 w-4" />,
  "Star": <Star className="h-4 w-4" />,
  "Heart": <Heart className="h-4 w-4" />,
  "Building": <Building className="h-4 w-4" />,
  "Sparkles": <Sparkles className="h-4 w-4" />,
  "TentTree": <TentTree className="h-4 w-4" />,
  "Gift": <Gift className="h-4 w-4" />
};

const EventConcepts = () => {
  const isMobile = useIsMobile();
  const { hebrewConcepts } = useEventContext();
  const [guidedSearchOpen, setGuidedSearchOpen] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);

  const handleConceptClick = (conceptId: string) => {
    setSelectedConcept(conceptId);
    setGuidedSearchOpen(true);
  };

  return (
    <section className="py-10 bg-white border-b" dir="rtl">
      <div className="container px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">קונספטים פופולריים</h2>
          <Badge variant="outline" className="cursor-pointer">ראה הכל</Badge>
        </div>
        
        <div className={`overflow-x-auto pb-6 ${isMobile ? '-mx-4 px-4' : ''}`}>
          <div className="flex gap-4 min-w-max">
            {hebrewConcepts.map((concept) => (
              <div
                key={concept.id}
                onClick={() => handleConceptClick(concept.id)}
                className={`bg-gray-100 rounded-lg p-3 flex flex-col items-center justify-center h-24 w-32 cursor-pointer hover:bg-gray-200 transition-colors gap-2 ${
                  concept.id === "first-date" ? "bg-pink-100 hover:bg-pink-200 border-2 border-pink-300" : ""
                }`}
              >
                {concept.icon && iconMap[concept.icon] ? (
                  <div className={concept.id === "first-date" ? "text-pink-700" : ""}>
                    {iconMap[concept.icon]}
                  </div>
                ) : (
                  <div className="h-4 w-4 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs">
                    {concept.name.substring(0, 1)}
                  </div>
                )}
                <span className={`font-medium text-center text-sm ${
                  concept.id === "first-date" ? "text-pink-700" : ""
                }`}>
                  {concept.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <GuidedSearchModal 
        isOpen={guidedSearchOpen} 
        onClose={() => {
          setGuidedSearchOpen(false);
          setSelectedConcept(null);
        }} 
      />
    </section>
  );
};

export default EventConcepts;
