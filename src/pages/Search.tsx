
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowDownUp, MapPin, Search as SearchIcon, Star } from "lucide-react";

interface Provider {
  id: string;
  name: string;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  location: string;
  pricing: string;
  featured?: boolean;
  verifiedBadge?: boolean;
}

// Mock data for providers
const allProviders: Provider[] = [
  {
    id: "1",
    name: "Melody Makers Band",
    image: "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
    category: "Musicians",
    rating: 4.9,
    reviewCount: 87,
    location: "New York, NY",
    pricing: "$1,200+",
    featured: true,
    verifiedBadge: true
  },
  {
    id: "2",
    name: "Visual Memories Photography",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
    category: "Photographers",
    rating: 4.8,
    reviewCount: 62,
    location: "Los Angeles, CA",
    pricing: "$800+",
    featured: true
  },
  {
    id: "3",
    name: "Elite Sound Systems",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
    category: "Audio Equipment",
    rating: 4.7,
    reviewCount: 45,
    location: "Chicago, IL",
    pricing: "$500+",
    verifiedBadge: true
  },
  {
    id: "4",
    name: "Gourmet Delights Catering",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
    category: "Catering",
    rating: 4.9,
    reviewCount: 73,
    location: "Miami, FL",
    pricing: "$1,500+",
    featured: true
  },
  {
    id: "5",
    name: "Elegant Event Spaces",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
    category: "Venues",
    rating: 4.6,
    reviewCount: 39,
    location: "Seattle, WA",
    pricing: "$2,000+",
    verifiedBadge: true
  },
  {
    id: "6",
    name: "Party Planners Pro",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
    category: "Event Planners",
    rating: 4.8,
    reviewCount: 56,
    location: "Boston, MA",
    pricing: "$1,200+",
    featured: true
  },
  {
    id: "7",
    name: "Floral Fantasy Designs",
    image: "https://images.unsplash.com/photo-1551184451-76b762941ad6?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
    category: "Decoration",
    rating: 4.7,
    reviewCount: 42,
    location: "Portland, OR",
    pricing: "$600+",
    verifiedBadge: true
  },
  {
    id: "8",
    name: "Classic Limo Services",
    image: "https://images.unsplash.com/photo-1551836989-b4622a17a792?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
    category: "Transportation",
    rating: 4.5,
    reviewCount: 31,
    location: "Dallas, TX",
    pricing: "$350+",
  }
];

const categories = [
  "All Categories", "Musicians", "Photographers", "Audio Equipment", 
  "Catering", "Venues", "Event Planners", "Decoration", "Transportation"
];

const locations = [
  "All Locations", "New York, NY", "Los Angeles, CA", "Chicago, IL", 
  "Miami, FL", "Seattle, WA", "Boston, MA", "Portland, OR", "Dallas, TX"
];

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [minRating, setMinRating] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortOption, setSortOption] = useState("relevance");
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  
  useEffect(() => {
    const query = searchParams.get("q") || "";
    const category = selectedCategory === "All Categories" ? "" : selectedCategory;
    const location = selectedLocation === "All Locations" ? "" : selectedLocation;
    
    let results = allProviders.filter(provider => {
      const matchesSearch = query 
        ? provider.name.toLowerCase().includes(query.toLowerCase()) ||
          provider.category.toLowerCase().includes(query.toLowerCase())
        : true;
        
      const matchesCategory = category 
        ? provider.category === category 
        : true;
        
      const matchesLocation = location 
        ? provider.location.includes(location) 
        : true;
        
      const matchesPricing = parseInt(provider.pricing.replace(/[^0-9]/g, "")) >= priceRange[0] && 
        parseInt(provider.pricing.replace(/[^0-9]/g, "")) <= priceRange[1];
        
      const matchesRating = provider.rating >= minRating;
      
      const matchesVerification = verifiedOnly 
        ? provider.verifiedBadge === true 
        : true;
        
      return matchesSearch && matchesCategory && matchesLocation && 
        matchesPricing && matchesRating && matchesVerification;
    });
    
    // Sort results
    if (sortOption === "rating-high") {
      results = results.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "rating-low") {
      results = results.sort((a, b) => a.rating - b.rating);
    } else if (sortOption === "price-high") {
      results = results.sort((a, b) => 
        parseInt(b.pricing.replace(/[^0-9]/g, "")) - parseInt(a.pricing.replace(/[^0-9]/g, ""))
      );
    } else if (sortOption === "price-low") {
      results = results.sort((a, b) => 
        parseInt(a.pricing.replace(/[^0-9]/g, "")) - parseInt(b.pricing.replace(/[^0-9]/g, ""))
      );
    } else {
      // Sort by relevance - featured first, then by rating
      results = results.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
      });
    }
    
    setFilteredProviders(results);
  }, [
    searchParams,
    selectedCategory,
    selectedLocation,
    priceRange,
    minRating,
    verifiedOnly,
    sortOption
  ]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchTerm });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8">
        <div className="container px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Search Results</h1>
            <p className="text-gray-600">
              Find the perfect service provider for your event
            </p>
          </div>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex w-full max-w-4xl mx-auto">
              <Input
                type="text"
                placeholder="Search for services, providers, or specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-l-lg"
              />
              <Button type="submit" className="rounded-l-none">
                <SearchIcon className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </form>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Filters</h2>
                  
                  {/* Category Filter */}
                  <div className="mb-6">
                    <Label htmlFor="category" className="mb-2 block">Category</Label>
                    <Select 
                      value={selectedCategory} 
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Location Filter */}
                  <div className="mb-6">
                    <Label htmlFor="location" className="mb-2 block">Location</Label>
                    <Select 
                      value={selectedLocation} 
                      onValueChange={setSelectedLocation}
                    >
                      <SelectTrigger id="location">
                        <SelectValue placeholder="Select a location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Price Range Filter */}
                  <div className="mb-6">
                    <Label className="mb-2 block">Price Range</Label>
                    <div className="mb-2">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        min={0}
                        max={5000}
                        step={100}
                        className="my-4"
                      />
                      <div className="flex justify-between text-sm">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}+</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Rating Filter */}
                  <div className="mb-6">
                    <Label className="mb-2 block">Minimum Rating</Label>
                    <div className="flex items-center space-x-2">
                      {[0, 3, 3.5, 4, 4.5].map((rating) => (
                        <Button
                          key={rating}
                          variant={minRating === rating ? "default" : "outline"}
                          size="sm"
                          onClick={() => setMinRating(rating)}
                          className={rating === 0 ? "px-3" : ""}
                        >
                          {rating === 0 ? "Any" : rating+"+"}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Verified Filter */}
                  <div className="mb-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="verified" 
                        checked={verifiedOnly}
                        onCheckedChange={() => setVerifiedOnly(!verifiedOnly)}
                      />
                      <Label htmlFor="verified">Verified Providers Only</Label>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setSearchParams({});
                      setSelectedCategory("All Categories");
                      setSelectedLocation("All Locations");
                      setPriceRange([0, 5000]);
                      setMinRating(0);
                      setVerifiedOnly(false);
                      setSortOption("relevance");
                    }}
                  >
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Search Results */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  {filteredProviders.length} providers found
                </p>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="sort" className="whitespace-nowrap">Sort by:</Label>
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger id="sort" className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="rating-high">Highest Rated</SelectItem>
                      <SelectItem value="rating-low">Lowest Rated</SelectItem>
                      <SelectItem value="price-high">Price High to Low</SelectItem>
                      <SelectItem value="price-low">Price Low to High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {filteredProviders.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredProviders.map((provider) => (
                    <Link key={provider.id} to={`/providers/${provider.id}`}>
                      <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
                        <div className="relative h-48">
                          <img 
                            src={provider.image} 
                            alt={provider.name} 
                            className="w-full h-full object-cover"
                          />
                          {provider.featured && (
                            <Badge className="absolute top-2 right-2 bg-brand-500">Featured</Badge>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="text-sm">
                              {provider.category}
                            </Badge>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
                              <span className="text-sm font-medium">{provider.rating}</span>
                              <span className="text-xs text-gray-500 ml-1">({provider.reviewCount})</span>
                            </div>
                          </div>
                          <h3 className="font-semibold text-lg mb-1 flex items-center">
                            {provider.name}
                            {provider.verifiedBadge && (
                              <span className="ml-1 inline-flex items-center justify-center w-4 h-4 bg-brand-500 rounded-full">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </span>
                            )}
                          </h3>
                          <div className="flex items-center text-gray-500 text-sm mb-2">
                            <MapPin className="h-3.5 w-3.5 mr-1" />
                            {provider.location}
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="font-medium">{provider.pricing}</span>
                            <Button size="sm">View Profile</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No providers found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or search terms to find what you're looking for.
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchParams({});
                      setSelectedCategory("All Categories");
                      setSelectedLocation("All Locations");
                      setPriceRange([0, 5000]);
                      setMinRating(0);
                      setVerifiedOnly(false);
                      setSortOption("relevance");
                    }}
                  >
                    Reset All Filters
                  </Button>
                </div>
              )}
              
              {filteredProviders.length > 0 && (
                <div className="flex justify-center mt-8">
                  <Button variant="outline">
                    Load More Results
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
