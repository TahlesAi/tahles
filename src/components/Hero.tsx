
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Music, Utensils, Camera, Map, Mic, Gift } from "lucide-react";

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };
  
  const categories = [
    { name: "מופעים", icon: <Music className="h-5 w-5" /> },
    { name: "קייטרינג", icon: <Utensils className="h-5 w-5" /> },
    { name: "צילום", icon: <Camera className="h-5 w-5" /> },
    { name: "לוקיישנים", icon: <Map className="h-5 w-5" /> },
    { name: "הגברה", icon: <Mic className="h-5 w-5" /> },
    { name: "מתנות", icon: <Gift className="h-5 w-5" /> }
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
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/80 to-purple-800/80"></div>
      </div>
      
      <div className="relative container px-4 py-16 md:py-24 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-3">
          פתרונות הפקה במרחק לחיצה
        </h1>
        <p className="text-xl md:text-2xl text-white/90 text-center mb-8">
          ת'כל'ס - כל מה שצריך לאירוע מושלם במקום אחד
        </p>
        
        <form onSubmit={handleSearch} className="w-full max-w-2xl relative bg-white rounded-full overflow-hidden shadow-xl mb-10">
          <input
            type="text"
            placeholder="חיפוש שירותים, מופעים או מקומות אירוח..."
            className="w-full px-6 py-4 text-base text-gray-700 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            dir="rtl"
          />
          <Button 
            type="submit" 
            className="absolute left-0 top-0 h-full rounded-r-none rounded-l-full px-6"
          >
            <Search className="h-5 w-5 ml-2" />
            חיפוש
          </Button>
        </form>
        
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
