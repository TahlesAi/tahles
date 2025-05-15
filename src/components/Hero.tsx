
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
      <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-purple-800"></div>
      <div className="relative container px-4 py-16 md:py-24 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-6">
          Find Perfect Services for Your Event
        </h1>
        
        <form onSubmit={handleSearch} className="w-full max-w-2xl relative bg-white rounded-full overflow-hidden shadow-xl">
          <input
            type="text"
            placeholder="Search for services, performers, or venues..."
            className="w-full px-6 py-4 text-base text-gray-700 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button 
            type="submit" 
            className="absolute right-0 top-0 h-full rounded-l-none rounded-r-full px-6"
          >
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
