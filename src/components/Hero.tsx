
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Music, 
  Utensils, 
  Camera, 
  MapPin, 
  Mic, 
  Gift, 
  Building,
  Plane,
  Wand2
} from "lucide-react";
import AutocompleteSearch from "@/components/search/AutocompleteSearch";
import { useSearchSuggestions } from "@/lib/searchSuggestions";
import GuidedSearchButton from "./GuidedSearch/GuidedSearchButton";

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { searchSuggestions } = useSearchSuggestions();
  
  const handleSearch = (term: string) => {
    if (term.trim()) {
      navigate(`/search?q=${encodeURIComponent(term)}`);
    }
  };
  
  // עדכון הקטגוריות עם מזהים תקינים מבסיס הנתונים
  const categories = [
    { name: "לוקיישנים", icon: <MapPin className="h-5 w-5" />, id: "d0251580-5005-4bd8-ae4d-ddd1084f1c99" },
    { name: "קייטרינג", icon: <Utensils className="h-5 w-5" />, id: "cb6c8965-2dfc-442b-824d-528ab2ab5648" },
    { name: "צילום", icon: <Camera className="h-5 w-5" />, id: "580015a2-9e2c-4dc1-8ff2-cea0b228f9cc" },
    { name: "מופעים", icon: <Music className="h-5 w-5" />, id: "efcdf47a-07a1-4dfc-818d-bbc5620e204f" },
    { name: "מתנות", icon: <Gift className="h-5 w-5" />, id: "7d597aa0-fbba-4ca2-bfb1-edad14c27f2b" },
    { name: "אמני חושים", icon: <Wand2 className="h-5 w-5" />, id: "90b93241-7405-4c6b-8d16-267ed79d80a5" }
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
        {/* שכבת כהות מעל הסרטון */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-500/80 to-accent1-500/80"></div>
      </div>
      
      <div className="relative container px-4 py-16 md:py-24 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-3">
          פתרונות הפקה מקצועיים בתכלס
        </h1>
        <p className="text-xl md:text-2xl text-white/90 text-center mb-8">
          אמנים, הרצאות, ימי כיף וכל מה שצריך לאירוע מושלם, במקום אחד
        </p>
        
        <div className="w-full max-w-2xl relative z-10">
          <AutocompleteSearch
            suggestions={searchSuggestions}
            onSearch={handleSearch}
            placeholder="חיפוש אמנים, מרצים, מופעים או מקומות אירוח..."
            value={searchTerm}
            onChange={setSearchTerm}
            buttonText="חיפוש"
            autoFocus={false}
            dir="rtl"
            className="w-full"
            inputClassName="py-4 px-6 text-base text-gray-700 focus:outline-none border-none rounded-full"
            buttonClassName="px-6 rounded-r-full"
            showCommandBar={true}
          />
        </div>
        
        {/* כפתור חיפוש מונחה */}
        <div className="mt-6 w-full max-w-md">
          <GuidedSearchButton className="w-full text-lg py-6" />
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 md:gap-5 mt-10">
          {categories.map((category, index) => (
            <Button 
              key={index}
              variant="outline" 
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
              onClick={() => navigate(`/categories/${category.id}`)}
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
