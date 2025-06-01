
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
import { Star, MapPin, Users, Calendar, Filter, Search as SearchIcon } from "lucide-react";
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
      category: selectedCategory || undefined,
      location: selectedLocation || undefined,
      priceRange: { min: priceRange[0], max: priceRange[1] },
      rating: minRating || undefined
    };

    let searchResults;
    if (selectedCategory && !searchQuery) {
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
    if (selectedCategory) params.set("category", selectedCategory);
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
        <div className="container px-4 py-8">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">חיפוש שירותים</h1>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="חפש לפי שם שירות, ספק, או תיאור..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="md:w-48">
                  <SelectValue placeholder="בחר קטגוריה" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">כל הקטגוריות</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="submit" className="md:w-32">
                חפש
              </Button>
            </form>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                סינונים מתקדמים
              </Button>
              {(selectedLocation || priceRange[0] > 0 || priceRange[1] < 10000 || minRating > 0) && (
                <Button variant="ghost" onClick={clearFilters}>
                  נקה סינונים
                </Button>
              )}
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>סינונים מתקדמים</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">מיקום</label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="בחר מיקום" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">כל המיקומים</SelectItem>
                        {locations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      טווח מחירים: ₪{priceRange[0]} - ₪{priceRange[1]}
                    </label>
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
                    <label className="block text-sm font-medium mb-2">
                      דירוג מינימלי: {minRating} כוכבים
                    </label>
                    <Slider
                      value={[minRating]}
                      onValueChange={(value) => setMinRating(value[0])}
                      max={5}
                      min={0}
                      step={0.5}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Results */}
          <div className="mb-4">
            <p className="text-gray-600">
              {isLoading ? "מחפש..." : `נמצאו ${results.length} תוצאות`}
            </p>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((service) => (
              <Link key={service.id} to={`/service/${service.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                    {service.featured && (
                      <Badge className="absolute top-2 right-2 bg-yellow-500">
                        מומלץ
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg line-clamp-2">{service.name}</h3>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{service.provider}</p>
                    
                    <p className="text-sm text-gray-700 line-clamp-2 mb-3">
                      {service.description}
                    </p>

                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{service.rating}</span>
                      <span className="text-sm text-gray-500">({service.reviewCount})</span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{service.location}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-right">
                        <span className="text-lg font-bold text-blue-600">
                          ₪{service.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 mr-1">
                          {service.priceUnit}
                        </span>
                      </div>
                      
                      <Badge variant="secondary" className="text-xs">
                        {service.category}
                      </Badge>
                    </div>

                    {service.tags && service.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {service.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
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
            <div className="text-center py-12">
              <SearchIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">לא נמצאו תוצאות</h3>
              <p className="text-gray-500 mb-4">נסה לשנות את מילות החיפוש או הסינונים</p>
              <Button onClick={clearFilters} variant="outline">
                נקה את כל הסינונים
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
