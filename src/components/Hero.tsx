
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import AutocompleteSearch from "@/components/search/AutocompleteSearch";
import { useSearchSuggestions } from "@/lib/searchSuggestions";
import GuidedSearchModal from "./GuidedSearch/GuidedSearchModal";
import useIsMobile from "@/hooks/use-mobile";
import { useEventContext } from "@/context/EventContext";

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isGuidedSearchOpen, setIsGuidedSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { searchSuggestions } = useSearchSuggestions();
  const isMobile = useIsMobile();
  const { categories, isLoading } = useEventContext();
  
  const handleSearch = (term: string) => {
    if (term.trim()) {
      navigate(`/search?q=${encodeURIComponent(term)}`);
    } else {
      // אם אין מונח חיפוש, פתח את החיפוש המונחה
      setIsGuidedSearchOpen(true);
    }
  };
  
  const handleButtonClick = () => {
    setIsGuidedSearchOpen(true);
  };
  
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
        {/* שכבת כהות מעל הסרטון */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-500/80 to-accent1-500/80"></div>
      </div>
      
      <div className="relative container px-4 py-16 md:py-24 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-3" dir="rtl">
          פתרונות הפקה מקצועיים בתכלס
        </h1>
        <p className="text-xl md:text-2xl text-white/90 text-center mb-8" dir="rtl">
          אמנים, הרצאות, ימי כיף וכל מה שצריך לאירוע מושלם, במקום אחד
        </p>
        
        <div className="w-full max-w-2xl relative z-10">
          <AutocompleteSearch
            suggestions={searchSuggestions}
            onSearch={handleSearch}
            placeholder="מצא לי פתרון תוכן לאירוע מושלם..."
            value={searchTerm}
            onChange={setSearchTerm}
            buttonText="חיפוש מונחה"
            autoFocus={false}
            dir="rtl"
            className="w-full"
            inputClassName="py-4 px-6 text-base text-gray-700 focus:outline-none border-none rounded-full"
            buttonClassName="px-6 rounded-r-full"
            showCommandBar={true}
            onButtonClick={handleButtonClick}
          />
        </div>
        
        {/* קטגוריות - שיפור תצוגה למובייל */}
        <div className={`flex flex-wrap justify-center gap-3 md:gap-5 mt-10 ${isMobile ? 'overflow-x-auto pb-4 flex-nowrap justify-start w-full' : ''}`} dir="rtl">
          {!isLoading && categories.slice(0, 6).map((category) => (
            <Button 
              key={category.id}
              variant="outline" 
              className={`bg-white/20 text-white border-white/30 hover:bg-white/30 ${isMobile ? 'min-w-[120px] flex-shrink-0' : ''}`}
              onClick={() => navigate(`/categories/${category.id}`)}
            >
              {category.icon && typeof category.icon === 'string' && iconMap[category.icon] ? (
                iconMap[category.icon]
              ) : (
                <div className="h-5 w-5 rounded-full bg-white flex items-center justify-center text-brand-600 text-xs ml-2">
                  {category.name.substring(0, 1)}
                </div>
              )}
              <span className="mr-2">{category.name}</span>
            </Button>
          ))}
          
          <Button
            variant="outline"
            className={`bg-white/20 text-white border-white/30 hover:bg-white/30 ${isMobile ? 'min-w-[120px] flex-shrink-0' : ''}`}
            onClick={() => navigate('/categories')}
          >
            <span>כל הקטגוריות</span>
          </Button>
        </div>
        
        <Button
          variant="outline"
          size="lg"
          className="mt-8 bg-brand-500 text-white hover:bg-brand-600 border-white"
          onClick={() => navigate('/categories')}
          dir="rtl"
        >
          צפה בכל הקטגוריות
        </Button>
      </div>
      
      {/* מודל החיפוש המונחה */}
      <GuidedSearchModal 
        isOpen={isGuidedSearchOpen} 
        onClose={() => setIsGuidedSearchOpen(false)} 
      />
    </section>
  );
};

// מיפוי אייקונים 
const iconMap: Record<string, React.ReactNode> = {
  "Music": <Music className="h-5 w-5" />,
  "Camera": <Camera className="h-5 w-5" />,
  "Utensils": <Utensils className="h-5 w-5" />,
  "MapPin": <MapPin className="h-5 w-5" />,
  "Mic": <Mic2 className="h-5 w-5" />,
  "Mic2": <Mic2 className="h-5 w-5" />,
  "Monitor": <Monitor className="h-5 w-5" />,
  "Gift": <Gift className="h-5 w-5" />,
  "Sparkles": <Sparkles className="h-5 w-5" />,
  "Calendar": <Calendar className="h-5 w-5" />,
  "Wand2": <Wand2 className="h-5 w-5" />,
};

export default Hero;
