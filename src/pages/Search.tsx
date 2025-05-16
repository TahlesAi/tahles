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
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Star } from "lucide-react";
import AdvancedSearchFilters from "@/components/search/AdvancedSearchFilters";
import AutocompleteSearch from "@/components/search/AutocompleteSearch";

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

// נתונים מדומים לנותני השירות
const allProviders: Provider[] = [
  {
    id: "1",
    name: "להקת מלודי מייקרס",
    image: "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
    category: "מוזיקאים",
    rating: 4.9,
    reviewCount: 87,
    location: "תל אביב",
    pricing: "₪1,200+",
    featured: true,
    verifiedBadge: true
  },
  {
    id: "2",
    name: "צילומי זכרונות ויזואליים",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
    category: "צלמים",
    rating: 4.8,
    reviewCount: 62,
    location: "ירושלים",
    pricing: "₪800+",
    featured: true
  },
  {
    id: "3",
    name: "מערכות סאונד עילית",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
    category: "ציוד אודיו",
    rating: 4.7,
    reviewCount: 45,
    location: "חיפה",
    pricing: "₪500+",
    verifiedBadge: true
  },
  {
    id: "4",
    name: "קייטרינג מעדני גורמה",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
    category: "קייטרינג",
    rating: 4.9,
    reviewCount: 73,
    location: "הרצליה",
    pricing: "₪1,500+",
    featured: true
  },
  {
    id: "5",
    name: "אולמות אירועים אלגנטיים",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
    category: "אולמות",
    rating: 4.6,
    reviewCount: 39,
    location: "רעננה",
    pricing: "₪2,000+",
    verifiedBadge: true
  },
  {
    id: "6",
    name: "מתכנני אירועים מקצועיים",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
    category: "מתכנני אירועים",
    rating: 4.8,
    reviewCount: 56,
    location: "כפר סבא",
    pricing: "₪1,200+",
    featured: true
  },
  {
    id: "7",
    name: "עיצובי פרחים פנטזיה",
    image: "https://images.unsplash.com/photo-1551184451-76b762941ad6?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
    category: "עיצוב",
    rating: 4.7,
    reviewCount: 42,
    location: "רמת גן",
    pricing: "₪600+",
    verifiedBadge: true
  },
  {
    id: "8",
    name: "שירותי לימוזינות קלאסיות",
    image: "https://images.unsplash.com/photo-1551836989-b4622a17a792?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
    category: "הסעות",
    rating: 4.5,
    reviewCount: 31,
    location: "נתניה",
    pricing: "₪350+",
  },
  {
    id: "9",
    name: "קליוסטרו - קסמים ואשליות",
    image: "https://images.unsplash.com/photo-1543157144-f7c0a15c140c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
    category: "אמני חושים",
    rating: 4.9,
    reviewCount: 65,
    location: "תל אביב",
    pricing: "₪1,800+",
    featured: true,
    verifiedBadge: true
  }
];

const categories = [
  "כל הקטגוריות", "מוזיקאים", "צלמים", "ציוד אודיו", 
  "קייטרינג", "אולמות", "מתכנני אירועים", "עיצוב", "הסעות", "אמני חושים"
];

const locations = [
  "כל המיקומים", "תל אביב", "ירושלים", "חיפה", 
  "הרצליה", "רעננה", "כפר סבא", "רמת גן", "נתניה"
];

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState("כל הקטגוריות");
  const [selectedLocation, setSelectedLocation] = useState("כל המיקומים");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [minRating, setMinRating] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortOption, setSortOption] = useState("relevance");
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  
  // Generate search suggestions based on providers data
  const searchSuggestions = [
    // Categories
    ...categories.map((category, index) => ({
      id: `cat-${index}`,
      value: category,
      type: "קטגוריה"
    })),
    
    // Locations
    ...locations.map((location, index) => ({
      id: `loc-${index}`,
      value: location,
      type: "מיקום"
    })),
    
    // Providers
    ...allProviders.map(provider => ({
      id: `prov-${provider.id}`,
      value: provider.name,
      type: "ספק"
    })),
    
    // Services (some generated examples)
    { id: "srv-1", value: "צילום אירועים", type: "שירות" },
    { id: "srv-2", value: "הגברה לחתונה", type: "שירות" },
    { id: "srv-3", value: "קייטרינג כשר", type: "שירות" },
    { id: "srv-4", value: "מוזיקה אלקטרונית", type: "שירות" },
    { id: "srv-5", value: "אולם אירועים עד 300 איש", type: "שירות" }
  ];
  
  useEffect(() => {
    const query = searchParams.get("q") || "";
    const category = selectedCategory === "כל הקטגוריות" ? "" : selectedCategory;
    const location = selectedLocation === "כל המיקומים" ? "" : selectedLocation;
    
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

      // בעתיד צריכה להיות כאן בדיקה אמיתית כאשר יהיה מיפוי של ספקים לקטגוריות וקטגוריות משנה במסד הנתונים
      // כרגע משתמשים בבדיקה פשוטה על סמך שם הקטגוריה
      const matchesAdvancedCategories = selectedCategories.length > 0 || selectedSubcategories.length > 0
        ? selectedCategories.includes(provider.category) || selectedSubcategories.some(sub => provider.category.includes(sub))
        : true;
        
      return matchesSearch && matchesCategory && matchesLocation && 
        matchesPricing && matchesRating && matchesVerification && matchesAdvancedCategories;
    });
    
    // מיון תוצאות
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
      // מיון לפי רלוונטיות - מומלצים ראשונים, ואז לפי דירוג
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
    sortOption,
    selectedCategories,
    selectedSubcategories
  ]);
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setSearchParams({ q: term });
  };

  const handleCategoriesChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  const handleSubcategoriesChange = (subcategories: string[]) => {
    setSelectedSubcategories(subcategories);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8">
        <div className="container px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">תוצאות חיפוש</h1>
            <p className="text-gray-600">
              מצאו את נותן השירות המושלם לאירוע שלכם
            </p>
          </div>
          
          {/* שורת חיפוש */}
          <div className="mb-8">
            <div className="flex w-full max-w-4xl mx-auto">
              <AutocompleteSearch
                suggestions={searchSuggestions}
                onSearch={handleSearch}
                placeholder="חפשו שירותים, נותני שירות או התמחויות..."
                value={searchTerm}
                onChange={setSearchTerm}
                buttonText="חיפוש"
                dir="rtl"
                className="w-full"
              />
            </div>
          </div>

          {/* פילטר קטגוריות מתקדם */}
          <div className="w-full max-w-4xl mx-auto">
            <AdvancedSearchFilters 
              onCategoriesChange={handleCategoriesChange}
              onSubcategoriesChange={handleSubcategoriesChange}
              selectedCategories={selectedCategories}
              selectedSubcategories={selectedSubcategories}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* סרגל צד עם סינונים */}
            <div className="space-y-6 order-last lg:order-first">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">סינון</h2>
                  
                  {/* סינון לפי קטגוריה */}
                  <div className="mb-6">
                    <Label htmlFor="category" className="mb-2 block">קטגוריה</Label>
                    <Select 
                      value={selectedCategory} 
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="בחרו קטגוריה" />
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
                  
                  {/* סינון לפי מיקום */}
                  <div className="mb-6">
                    <Label htmlFor="location" className="mb-2 block">מיקום</Label>
                    <Select 
                      value={selectedLocation} 
                      onValueChange={setSelectedLocation}
                    >
                      <SelectTrigger id="location">
                        <SelectValue placeholder="בחרו מיקום" />
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
                  
                  {/* סינון לפי טווח מחירים */}
                  <div className="mb-6">
                    <Label className="mb-2 block">טווח מחירים</Label>
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
                        <span>₪{priceRange[0]}</span>
                        <span>₪{priceRange[1]}+</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* סינון לפי דירוג */}
                  <div className="mb-6">
                    <Label className="mb-2 block">דירוג מינימלי</Label>
                    <div className="flex items-center space-x-2">
                      {[0, 3, 3.5, 4, 4.5].map((rating) => (
                        <Button
                          key={rating}
                          variant={minRating === rating ? "default" : "outline"}
                          size="sm"
                          onClick={() => setMinRating(rating)}
                          className={rating === 0 ? "px-3" : ""}
                        >
                          {rating === 0 ? "הכל" : rating+"+"}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* סינון לפי אימות */}
                  <div className="mb-6">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="verified">נותני שירות מאומתים בלבד</Label>
                      <Checkbox 
                        id="verified" 
                        checked={verifiedOnly}
                        onCheckedChange={() => setVerifiedOnly(!verifiedOnly)}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setSearchParams({});
                      setSelectedCategory("כל הקטגוריות");
                      setSelectedLocation("כל המיקומים");
                      setPriceRange([0, 5000]);
                      setMinRating(0);
                      setVerifiedOnly(false);
                      setSortOption("relevance");
                      setSelectedCategories([]);
                      setSelectedSubcategories([]);
                    }}
                  >
                    איפוס סינונים
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* תוצאות חיפוש */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  נמצאו {filteredProviders.length} נותני שירות
                </p>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="sort" className="whitespace-nowrap">מיון לפי:</Label>
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger id="sort" className="w-[180px]">
                      <SelectValue placeholder="מיון לפי" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">רלוונטיות</SelectItem>
                      <SelectItem value="rating-high">דירוג - מהגבוה לנמוך</SelectItem>
                      <SelectItem value="rating-low">דירוג - מהנמוך לגבוה</SelectItem>
                      <SelectItem value="price-high">מחיר - מהגבוה לנמוך</SelectItem>
                      <SelectItem value="price-low">מחיר - מהנמוך לגבוה</SelectItem>
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
                            <Badge className="absolute top-2 left-2 bg-brand-500">מומלץ</Badge>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="text-sm">
                              {provider.category}
                            </Badge>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 ml-1 fill-yellow-400" />
                              <span className="text-sm font-medium">{provider.rating}</span>
                              <span className="text-xs text-gray-500 mr-1">({provider.reviewCount})</span>
                            </div>
                          </div>
                          <h3 className="font-semibold text-lg mb-1 flex items-center">
                            {provider.name}
                            {provider.verifiedBadge && (
                              <span className="mr-1 inline-flex items-center justify-center w-4 h-4 bg-brand-500 rounded-full">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </span>
                            )}
                          </h3>
                          <div className="flex items-center text-gray-500 text-sm mb-2">
                            <MapPin className="h-3.5 w-3.5 ml-1" />
                            {provider.location}
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="font-medium">{provider.pricing}</span>
                            <Button size="sm">צפייה בפרופיל</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">לא נמצאו נותני שירות</h3>
                  <p className="text-gray-600 mb-6">
                    נסו לשנות את הגדרות הסינון או מונחי החיפוש כדי למצוא את מה שאתם מחפשים.
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchParams({});
                      setSelectedCategory("כל הקטגוריות");
                      setSelectedLocation("כל המיקומים");
                      setPriceRange([0, 5000]);
                      setMinRating(0);
                      setVerifiedOnly(false);
                      setSortOption("relevance");
                      setSelectedCategories([]);
                      setSelectedSubcategories([]);
                    }}
                  >
                    איפוס כל הסינונים
                  </Button>
                </div>
              )}
              
              {filteredProviders.length > 0 && (
                <div className="flex justify-center mt-8">
                  <Button variant="outline">
                    טען תוצאות נוספות
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
