
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Star, MapPin, Users, Calendar, Filter, Search as SearchIcon, SlidersHorizontal } from "lucide-react";
import { searchServices, getServicesByCategory } from "@/lib/unifiedMockData";
import { SearchResultService } from "@/lib/types";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [minRating, setMinRating] = useState(0);
  const [results, setResults] = useState<SearchResultService[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    "אמני חושים",
    "קוסמים", 
    "זמרים ונגנים",
    "תקליטנים",
    "סטנדאפיסטים",
    "שירותי מזון ומשקאות",
    "לוקיישנים ומתחמי אירוח",
    "שירותי הפקה",
    "מתנות",
    "ימי כיף וטיולים"
  ];

  const locations = [
    "תל אביב",
    "ירושלים", 
    "חיפה",
    "באר שבע",
    "מרכז",
    "צפון",
    "דרום",
    "כל הארץ"
  ];

  useEffect(() => {
    performSearch();
  }, [searchQuery, selectedCategory, selectedLocation, priceRange, minRating]);

  const performSearch = () => {
    setIsLoading(true);
    
    const filters = {
      category: selectedCategory && selectedCategory !== "all" ? selectedCategory : undefined,
      location: selectedLocation && selectedLocation !== "all" ? selectedLocation : undefined,
      priceRange: { min: priceRange[0], max: priceRange[1] },
      rating: minRating || undefined
    };

    let searchResults;
    if (selectedCategory && selectedCategory !== "all" && !searchQuery) {
      searchResults = getServicesByCategory(selectedCategory);
    } else {
      searchResults = searchServices(searchQuery, filters);
    }
    
    setResults(searchResults);
    setIsLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedCategory && selectedCategory !== "all") params.set("category", selectedCategory);
    setSearchParams(params);
    performSearch();
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedLocation("");
    setPriceRange([0, 10000]);
    setMinRating(0);
    setSearchParams({});
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container px-4 py-6">
          {/* חיפוש קומפקטי */}
          <div className="max-w-4xl mx-auto mb-6">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2 mb-4">
              <div className="flex-1 relative">
                <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="חפש שירותים..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 h-9 text-sm"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-40 h-9 text-sm">
                  <SelectValue placeholder="קטגוריה" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">הכל</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button 
                type="button"
                variant="outline" 
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="h-9 px-3"
              >
                <SlidersHorizontal className="h-3 w-3" />
              </Button>
            </form>

            {/* סינונים מתקדמים - קומפקטיים */}
            {showFilters && (
              <Card className="border-gray-200">
                <CardContent className="pt-4 pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger className="h-9 text-sm">
                          <SelectValue placeholder="מיקום" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">כל המיקומים</SelectItem>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <div className="text-xs text-gray-600 mb-1">
                        מחיר: ₪{priceRange[0]} - ₪{priceRange[1]}
                      </div>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={10000}
                        min={0}
                        step={100}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="text-xs text-gray-600 mb-1">
                        דירוג: {minRating} כוכבים
                      </div>
                      <Slider
                        value={[minRating]}
                        onValueChange={(value) => setMinRating(value[0])}
                        max={5}
                        min={0}
                        step={0.5}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  {(selectedLocation || priceRange[0] > 0 || priceRange[1] < 10000 || minRating > 0) && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearFilters}
                      className="mt-3 h-8 px-3 text-xs"
                    >
                      נקה סינונים
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* תוצאות */}
          <div className="mb-3">
            <p className="text-sm text-gray-600">
              {isLoading ? "מחפש..." : `${results.length} תוצאות`}
            </p>
          </div>

          {/* רשת תוצאות - גדולה יותר כשיש תוצאות */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {results.map((service) => (
              <Link key={service.id} to={`/service/${service.id}`}>
                <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer border-gray-200">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                    {service.featured && (
                      <Badge className="absolute top-2 right-2 bg-yellow-500 text-xs">
                        מומלץ
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-sm line-clamp-2 leading-tight">{service.name}</h3>
                    </div>
                    
                    <p className="text-xs text-gray-600 mb-2">{service.provider}</p>
                    
                    <p className="text-xs text-gray-700 line-clamp-2 mb-3 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{service.rating}</span>
                      <span className="text-xs text-gray-500">({service.reviewCount})</span>
                    </div>

                    <div className="flex items-center gap-1 mb-2">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-600">{service.location}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-right">
                        <span className="text-sm font-bold text-blue-600">
                          ₪{service.price.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-500 mr-1">
                          {service.priceUnit}
                        </span>
                      </div>
                      
                      <Badge variant="secondary" className="text-xs px-2 py-0">
                        {service.category}
                      </Badge>
                    </div>

                    {service.tags && service.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {service.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {results.length === 0 && !isLoading && (
            <div className="text-center py-8">
              <SearchIcon className="h-8 w-8 text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-medium text-gray-900 mb-2">לא נמצאו תוצאות</h3>
              <p className="text-sm text-gray-500 mb-3">נסה מילות חיפוש אחרות</p>
              <Button onClick={clearFilters} variant="outline" size="sm">
                נקה סינונים
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
