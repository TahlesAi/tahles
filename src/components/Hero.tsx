
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };
  
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-hero-pattern"></div>
      <div className="relative container px-4 py-24 md:py-32 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6">
          Find the Perfect Service <br className="hidden sm:block" /> for Your Event
        </h1>
        <p className="text-xl text-white/90 text-center mb-8 max-w-3xl">
          Connect with talented performers, artists, and event service providers for your next special occasion
        </p>
        
        <form onSubmit={handleSearch} className="w-full max-w-2xl flex">
          <input
            type="text"
            placeholder="Search for services, performers, or venues..."
            className="hero-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit" className="hero-search-button">
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
        </form>
        
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
            Musicians
          </Button>
          <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
            DJs
          </Button>
          <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
            Photographers
          </Button>
          <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
            Venues
          </Button>
          <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
            Catering
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
