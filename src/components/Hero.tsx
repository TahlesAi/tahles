
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Music, Utensils, Camera, Map, Mic, Gift } from "lucide-react";
import AutocompleteSearch from "@/components/search/AutocompleteSearch";

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const handleSearch = (term: string) => {
    if (term.trim()) {
      navigate(`/search?q=${encodeURIComponent(term)}`);
    }
  };
  
  const categories = [
    { name: "לוקיישנים", icon: <Map className="h-5 w-5" /> },
    { name: "קייטרינג", icon: <Utensils className="h-5 w-5" /> },
    { name: "הפקה", icon: <Camera className="h-5 w-5" /> },
    { name: "מופעים", icon: <Music className="h-5 w-5" /> },
    { name: "מתנות", icon: <Gift className="h-5 w-5" /> },
    { name: "ימי כיף", icon: <Mic className="h-5 w-5" /> }
  ];
  
  // Define search suggestions based on common searches
  const searchSuggestions = [
    { id: "1", value: "מופעי מוזיקה", type: "קטגוריה" },
    { id: "2", value: "להקות חתונה", type: "שירות" },
    { id: "3", value: "צלם אירועים", type: "שירות" },
    { id: "4", value: "קייטרינג כשר", type: "שירות" },
    { id: "5", value: "אולמות אירועים בתל אביב", type: "מיקום" },
    { id: "6", value: "אמן חושים", type: "שירות" },
    { id: "7", value: "נטע ברסלר", type: "ספק" },
    { id: "8", value: "דיג'יי למסיבת רווקים", type: "שירות" },
    { id: "9", value: "שירותי הגברה", type: "קטגוריה" },
    { id: "10", value: "קוסם לבר מצווה", type: "שירות" }
  ];
  
  return (
    <section className="relative overflow-hidden">
      {/* סרטון רקע */}
      <div className="absolute inset-0 w-full h-full">
        <video 
          className="w-full h-full object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-event-with-many-people-dancing-4825-large.mp4" 
            type="video/mp4" 
          />
        </video>
        {/* שכבת כהות מעל הסרטון - עודכנה לצבעי הלוגו */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-500/80 to-accent1-500/80"></div>
      </div>
      
      <div className="relative container px-4 py-16 md:py-24 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-3">
          פתרונות צרכנות משובחים בתכלס
        </h1>
        <p className="text-xl md:text-2xl text-white/90 text-center mb-8">
          כל מה שצריך לאירוע או מפגש חברתי מושלם, במקום 1
        </p>
        
        <div className="w-full max-w-2xl relative bg-white rounded-full overflow-hidden shadow-xl mb-10">
          <AutocompleteSearch
            suggestions={searchSuggestions}
            onSearch={handleSearch}
            placeholder="חיפוש שירותים, מופעים או מקומות אירוח..."
            value={searchTerm}
            onChange={setSearchTerm}
            buttonText="חיפוש"
            autoFocus={false}
            dir="rtl"
            className="w-full"
            inputClassName="py-4 px-6 text-base text-gray-700 focus:outline-none border-none"
            buttonClassName="px-6"
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 md:gap-5">
          {categories.map((category, index) => (
            <Button 
              key={index}
              variant="outline" 
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
              onClick={() => navigate(`/categories/${index + 1}`)}
            >
              {category.icon}
              <span className="mr-2">{category.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
