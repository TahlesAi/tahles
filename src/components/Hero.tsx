
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Music, 
  Utensils, 
  MapPin, 
  Mic2, 
  Gift, 
  Sparkles, 
  PartyPopper, 
  TentTree, 
  PlusCircle, 
  Users,
  Building,
  Lightbulb
} from "lucide-react";
import useIsMobile from "@/hooks/use-mobile";
import { useEventContext } from "@/context/EventContext";

const Hero = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { hebrewCategories, isLoading } = useEventContext();
  
  const handleSearch = () => {
    navigate('/guided-search');
  };
  
  // מיפוי אייקונים עבור הקטגוריות העבריות
  const getCategoryIcon = (iconName: string | undefined) => {
    if (!iconName) return <PlusCircle className="h-5 w-5" />;
    
    const iconComponents: Record<string, JSX.Element> = {
      "MapPin": <MapPin className="h-5 w-5" />,
      "Utensils": <Utensils className="h-5 w-5" />,
      "Music": <Music className="h-5 w-5" />,
      "Mic2": <Mic2 className="h-5 w-5" />,
      "TentTree": <TentTree className="h-5 w-5" />,
      "Sparkles": <Sparkles className="h-5 w-5" />,
      "Gift": <Gift className="h-5 w-5" />,
      "PlusCircle": <PlusCircle className="h-5 w-5" />,
      "Users": <Users className="h-5 w-5" />,
      "Building": <Building className="h-5 w-5" />,
      "Lightbulb": <Lightbulb className="h-5 w-5" />
    };
    
    return iconComponents[iconName] || <PlusCircle className="h-5 w-5" />;
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
          {/* חיפוש מונחה במרכז */}
          <div className="relative" dir="rtl">
            <input
              type="text"
              placeholder="מצא לי פתרון לאירוע מושלם..."
              className="w-full py-4 px-6 text-base text-gray-700 focus:outline-none border-none rounded-full pl-12"
              onClick={handleSearch}
              readOnly
            />
            <button 
              onClick={handleSearch}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full"
              aria-label="חיפוש מונחה"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* קטגוריות - רק קטגוריות ראשיות כפי שהוגדרו בהיררכיה העברית */}
        <div className={`flex flex-wrap justify-center gap-3 md:gap-5 mt-10 ${isMobile ? 'overflow-x-auto pb-4 flex-nowrap justify-start w-full' : ''}`} dir="rtl">
          {!isLoading && hebrewCategories && hebrewCategories
            .filter(category => category.id !== 'other-category')
            .map((category) => (
              <Button 
                key={category.id}
                variant="outline" 
                className={`bg-white/20 text-white border-white/30 hover:bg-white/30 ${isMobile ? 'min-w-[120px] flex-shrink-0' : ''}`}
                onClick={() => navigate(`/categories/${category.id}`)}
              >
                {getCategoryIcon(category.icon)}
                <span className="mr-2">{category.name}</span>
              </Button>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
