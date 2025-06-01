
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { eventConcepts } from "@/lib/searchSuggestions";
import useIsMobile from "@/hooks/use-mobile";

const EventConcepts = () => {
  const isMobile = useIsMobile();

  return (
    <section className="py-10 bg-white border-b" dir="rtl">
      <div className="container px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">קונספטים פופולריים</h2>
          <Badge variant="outline" className="cursor-pointer">ראה הכל</Badge>
        </div>
        
        <div className={`overflow-x-auto pb-6 ${isMobile ? '-mx-4 px-4' : ''}`}>
          <div className="flex gap-4 min-w-max">
            {eventConcepts.map((concept, index) => (
              <Link key={index} to={`/search?concept=${encodeURIComponent(concept.value)}`}>
                <div
                  className={`bg-gray-100 rounded-lg p-3 flex flex-col items-center justify-center h-24 w-32 cursor-pointer hover:bg-gray-200 transition-colors gap-2 ${
                    concept.value === "דייט ראשון" ? "bg-pink-100 hover:bg-pink-200 border-2 border-pink-300" : ""
                  }`}
                >
                  {concept.icon}
                  <span className={`font-medium text-center text-sm ${
                    concept.value === "דייט ראשון" ? "text-pink-700" : ""
                  }`}>
                    {concept.value}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventConcepts;
