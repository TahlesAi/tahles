
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { CalendarIcon, Filter, SlidersHorizontal } from "lucide-react";
import AdvancedSearchFilters from "@/components/search/AdvancedSearchFilters";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { he } from 'date-fns/locale';
import ServiceResultCard from "@/components/search/ServiceResultCard";
import { useSearchSuggestions } from "@/lib/searchSuggestions";
import { toast } from "sonner";

// Mock search results data - will be replaced with actual API calls later
import { mockSearchResults } from "@/lib/mockData";
import { expandedMockSearchResults } from "@/lib/mockDataExpanded";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { mainCategories, eventConcepts } = useSearchSuggestions();
  const initialQuery = searchParams.get("q") || "";
  
  // Search state
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [showFilters, setShowFilters] = useState(false);
  const [results, setResults] = useState([...mockSearchResults, ...expandedMockSearchResults]);
  const [filteredResults, setFilteredResults] = useState([...mockSearchResults, ...expandedMockSearchResults]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Filters state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConcepts, setSelectedConcepts] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [location, setLocation] = useState<string>("");

  // Effect for initial search
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);
  
  const performSearch = (query: string) => {
    setIsLoading(true);
    
    // רשימת מילות מפתח לאמני חושים
    const mentalismKeywords = [
      'אמני חושים', 
      'אמן חושים', 
      'קריאת מחשבות', 
      'קורא מחשבות',
      'מנטליסט',
      'מנטליזם',
      'טלפתיה',
      'נטע ברסלר',
      'קליספרו',
      'דורון רוזן',
      'מאיה הקוסמת'
    ];
    
    // מילות מפתח לכרטיסי מתנה
    const giftCardKeywords = [
      'כרטיסי מתנה',
      'כרטיס מתנה',
      'שובר מתנה',
      'שוברי מתנה',
      'כרטיס שי',
      'כרטיסי שי',
      'מתנות',
      'gift card',
      'כרטיס מתנה דיגיטלי'
    ];
    
    // מילות מפתח לכרטיסים למופעים
    const eventTicketsKeywords = [
      'כרטיסים',
      'כרטיס',
      'כרטיסים למופעים',
      'כרטיס למופע',
      'כרטיס להופעה',
      'כרטיסים להופעות',
      'tickets',
      'כרטיס הופעה'
    ];
    
    // בודק אם החיפוש קשור לאמני חושים
    const searchLower = query.toLowerCase().trim();
    const isMentalismSearch = mentalismKeywords.some(keyword => 
      keyword.includes(searchLower) || searchLower.includes(keyword)
    );
    
    // בודק אם החיפוש קשור לכרטיסי מתנה
    const isGiftCardSearch = giftCardKeywords.some(keyword => 
      keyword.includes(searchLower) || searchLower.includes(keyword)
    );
    
    // בודק אם החיפוש קשור לכרטיסים למופעים
    const isEventTicketsSearch = eventTicketsKeywords.some(keyword => 
      keyword.includes(searchLower) || searchLower.includes(keyword)
    ) && !isGiftCardSearch; // מוודא שזה לא כרטיסי מתנה
    
    // Simulate API call
    setTimeout(() => {
      // בסימולציה, הבא תוצאות רלוונטיות בהתאם לחיפוש
      let allResults = [...mockSearchResults, ...expandedMockSearchResults];
      let filtered = allResults.filter(item => 
        (item.name && item.name.toLowerCase().includes(query.toLowerCase())) ||
        (item.description && item.description.toLowerCase().includes(query.toLowerCase())) ||
        (item.provider && item.provider.toLowerCase().includes(query.toLowerCase())) ||
        (item.category && item.category.toLowerCase().includes(query.toLowerCase())) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))) ||
        (item.subcategory && item.subcategory.toLowerCase().includes(query.toLowerCase()))
      );

      // אם זה חיפוש כרטיסי מתנה
      if (isGiftCardSearch) {
        // יצירת תוצאות לכרטיסי מתנה
        const giftCardResults = allResults.filter(item => 
          (item.category && item.category.includes('מתנות')) ||
          (item.tags && item.tags.some(tag => 
            tag.includes('כרטיס מתנה') || tag.includes('שובר') || tag.includes('מתנה')
          )) ||
          (item.name && (item.name.includes('מתנה') || item.name.includes('שובר'))) ||
          (item.description && item.description.includes('מתנה'))
        );
        
        // אם אין תוצאות ספציפיות, ייצר כמה דוגמאות לכרטיסי מתנה
        if (giftCardResults.length < 5) {
          const dummyGiftCards = [
            {
              id: 'gift-card-1',
              name: 'כרטיס מתנה דיגיטלי - חוויות אישיות',
              description: 'כרטיס מתנה דיגיטלי לבחירה מתוך מגוון חוויות - ספא, מסעדות, אטרקציות ועוד',
              provider: 'מתנאיי',
              imageUrl: 'https://picsum.photos/id/188/400/300',
              price: 200,
              rating: 4.8,
              reviewCount: 120,
              featured: true,
              category: 'מתנות',
              subcategory: 'כרטיסי מתנה',
              tags: ['כרטיס מתנה', 'חוויות', 'דיגיטלי'],
              suitableFor: ['יום הולדת', 'חתונה', 'בר מצווה', 'גיבוש צוות']
            },
            {
              id: 'gift-card-2',
              name: 'כרטיס מתנה לחנויות ספרים',
              description: 'שובר לרכישת ספרים ברשת חנויות הספרים המובילה בישראל',
              provider: 'רשת הספרים',
              imageUrl: 'https://picsum.photos/id/76/400/300',
              price: 150,
              rating: 4.6,
              reviewCount: 85,
              category: 'מתנות',
              subcategory: 'כרטיסי מתנה',
              tags: ['ספרים', 'כרטיס מתנה', 'תרבות'],
              suitableFor: ['יום הולדת', 'חג', 'בר מצווה']
            },
            {
              id: 'gift-card-3',
              name: 'שובר חופשה זוגית',
              description: 'שובר מפנק לחופשה זוגית במבחר בתי מלון ברחבי הארץ',
              provider: 'נופש פרימיום',
              imageUrl: 'https://picsum.photos/id/43/400/300',
              price: 1200,
              rating: 4.9,
              reviewCount: 212,
              category: 'מתנות',
              subcategory: 'כרטיסי מתנה',
              tags: ['שובר', 'חופשה', 'זוגי', 'נופש'],
              suitableFor: ['יום נישואין', 'חתונה', 'יום הולדת']
            },
            {
              id: 'gift-card-4',
              name: 'כרטיס מתנה לסדנאות בישול',
              description: 'כרטיס מתנה המעניק חווית בישול עם שפים מובילים',
              provider: 'טעימות קולינריות',
              imageUrl: 'https://picsum.photos/id/8/400/300',
              price: 350,
              rating: 4.7,
              reviewCount: 68,
              category: 'מתנות',
              subcategory: 'כרטיסי מתנה',
              tags: ['בישול', 'סדנא', 'שף', 'כרטיס מתנה'],
              suitableFor: ['יום הולדת', 'גיבוש צוות', 'חג']
            },
            {
              id: 'gift-card-5',
              name: 'שובר לסיור טעימות יינות',
              description: 'חוויה של סיור וטעימות ביקבים נבחרים בארץ',
              provider: 'יינות ישראל',
              imageUrl: 'https://picsum.photos/id/54/400/300',
              price: 280,
              rating: 4.5,
              reviewCount: 95,
              category: 'מתנות',
              subcategory: 'כרטיסי מתנה',
              tags: ['יין', 'סיור', 'טעימות', 'שובר מתנה'],
              suitableFor: ['יום הולדת', 'יום נישואין', 'ארוע חברה']
            }
          ];
          
          // הוסף את כרטיסי המתנה הדמה לתוצאות
          filtered = [...giftCardResults, ...dummyGiftCards];
        } else {
          filtered = giftCardResults;
        }
        
        // הוספת הודעה למשתמש
        toast.info("מציג תוצאות לכרטיסי מתנה", {
          description: `נמצאו ${filtered.length} תוצאות מתאימות`
        });
      }
      
      // אם זה חיפוש כרטיסים למופעים
      else if (isEventTicketsSearch) {
        // יצירת תוצאות לכרטיסים למופעים
        const ticketResults = allResults.filter(item => 
          (item.category && item.category.includes('כרטיסים')) ||
          (item.tags && item.tags.some(tag => 
            tag.includes('כרטיס') || tag.includes('הופעה') || tag.includes('מופע')
          )) ||
          (item.name && (item.name.includes('כרטיס') || item.name.includes('הופעה'))) ||
          (item.description && (item.description.includes('כרטיס') || item.description.includes('הופעה')))
        );
        
        // אם אין תוצאות ספציפיות, ייצר כמה דוגמאות לכרטיסים למופעים
        if (ticketResults.length < 5) {
          const dummyTickets = [
            {
              id: 'ticket-1',
              name: 'כרטיסים להופעת רוק',
              description: 'כרטיסים להופעת רוק של הלהקה הלוהטת ביותר בישראל',
              provider: 'כרטיסים לייב',
              imageUrl: 'https://picsum.photos/id/96/400/300',
              price: 180,
              rating: 4.8,
              reviewCount: 245,
              featured: true,
              category: 'כרטיסים',
              subcategory: 'כרטיסים למופעים',
              tags: ['כרטיס', 'הופעה', 'רוק', 'מוזיקה'],
              suitableFor: ['בילוי זוגי', 'יום הולדת', 'בילוי עם חברים']
            },
            {
              id: 'ticket-2',
              name: 'כרטיסים להצגת תיאטרון',
              description: 'כרטיסים להצגה החדשה והמדוברת בתיאטרון הלאומי',
              provider: 'תיאטרון הבמה',
              imageUrl: 'https://picsum.photos/id/42/400/300',
              price: 130,
              rating: 4.7,
              reviewCount: 112,
              category: 'כרטיסים',
              subcategory: 'כרטיסים למופעים',
              tags: ['כרטיס', 'תיאטרון', 'הצגה', 'תרבות'],
              suitableFor: ['בילוי זוגי', 'תרבות', 'ערב משפחתי']
            },
            {
              id: 'ticket-3',
              name: 'כרטיסים למופע סטנדאפ',
              description: 'כרטיסים למופע הסטנדאפ החדש של הקומיקאי המוביל',
              provider: 'צחוק בפארק',
              imageUrl: 'https://picsum.photos/id/64/400/300',
              price: 120,
              rating: 4.9,
              reviewCount: 198,
              category: 'כרטיסים',
              subcategory: 'כרטיסים למופעים',
              tags: ['כרטיס', 'סטנדאפ', 'קומדיה', 'הופעה'],
              suitableFor: ['בילוי זוגי', 'יום הולדת', 'בילוי עם חברים']
            },
            {
              id: 'ticket-4',
              name: 'כרטיסים למופע מחול',
              description: 'כרטיסים למופע המחול המרהיב של להקת המחול הישראלית',
              provider: 'אומנויות הבמה',
              imageUrl: 'https://picsum.photos/id/83/400/300',
              price: 150,
              rating: 4.6,
              reviewCount: 87,
              category: 'כרטיסים',
              subcategory: 'כרטיסים למופעים',
              tags: ['כרטיס', 'מחול', 'מופע', 'אמנות'],
              suitableFor: ['תרבות', 'בילוי זוגי', 'ערב מיוחד']
            },
            {
              id: 'ticket-5',
              name: 'כרטיסים לפסטיבל מוזיקה',
              description: 'כרטיסים לפסטיבל המוזיקה השנתי עם מיטב האמנים',
              provider: 'פסטיבל צלילים',
              imageUrl: 'https://picsum.photos/id/45/400/300',
              price: 250,
              rating: 4.8,
              reviewCount: 321,
              category: 'כרטיסים',
              subcategory: 'כרטיסים למופעים',
              tags: ['כרטיס', 'פסטיבל', 'מוזיקה', 'הופעה'],
              suitableFor: ['בילוי עם חברים', 'יום הולדת', 'חוויה מוזיקלית']
            }
          ];
          
          // הוסף את הכרטיסים למופעים הדמה לתוצאות
          filtered = [...ticketResults, ...dummyTickets];
        } else {
          filtered = ticketResults;
        }
        
        // הוספת הודעה למשתמש
        toast.info("מציג תוצאות לכרטיסים למופעים", {
          description: `נמצאו ${filtered.length} תוצאות מתאימות`
        });
      }
      
      // אם זה חיפוש של אמני חושים, וודא שאמני החושים מופיעים בתוצאות
      else if (isMentalismSearch) {
        // חפש את אמני החושים הספציפיים שאנחנו יודעים עליהם
        const specificMentalists = allResults.filter(item => 
          (item.provider && item.provider.includes('נטע ברסלר')) || 
          (item.provider && item.provider.includes('קליספרו')) ||
          (item.provider && item.provider.includes('דורון רוזן')) ||
          (item.provider && item.provider.includes('מאיה הקוסמת')) ||
          (item.name && item.name.includes('קריאת מחשבות')) ||
          (item.category && item.category.includes('אמני חושים')) ||
          (item.subcategory && item.subcategory.includes('אמני חושים')) ||
          (item.tags && item.tags.some(tag => tag.includes('אמני חושים')))
        );
        
        // הוסף את אמני החושים לרשימה אם הם לא כבר שם
        specificMentalists.forEach(mentalist => {
          if (!filtered.some(item => item.id === mentalist.id)) {
            filtered.push(mentalist);
          }
        });
        
        // מיון התוצאות כך שאמני החושים יופיעו ראשונים
        filtered.sort((a, b) => {
          const aIsMentalist = 
            (a.provider && a.provider.includes('נטע ברסלר')) || 
            (a.provider && a.provider.includes('קליספרו')) ||
            (a.provider && a.provider.includes('דורון רוזן')) ||
            (a.provider && a.provider.includes('מאיה הקוסמת')) ||
            (a.category && a.category.includes('אמני חושים')) || 
            (a.subcategory && a.subcategory.includes('אמני חושים')) || 
            (a.tags && a.tags.some(tag => tag.includes('אמני חושים')));
          
          const bIsMentalist = 
            (b.provider && b.provider.includes('נטע ברסלר')) || 
            (b.provider && b.provider.includes('קליספרו')) ||
            (b.provider && b.provider.includes('דורון רוזן')) ||
            (b.provider && b.provider.includes('מאיה הקוסמת')) ||
            (b.category && b.category.includes('אמני חושים')) || 
            (b.subcategory && b.subcategory.includes('אמני חושים')) || 
            (b.tags && b.tags.some(tag => tag.includes('אמני חושים')));
          
          if (aIsMentalist && !bIsMentalist) return -1;
          if (!aIsMentalist && bIsMentalist) return 1;
          return 0;
        });
      }
      
      // מציג הודעה אם לא נמצאו תוצאות אך החיפוש היה עבור אמני חושים
      if (filtered.length === 0 && isMentalismSearch) {
        toast.info("מחפש אמני חושים נוספים...", {
          description: "מציג תוצאות רלוונטיות"
        });
        
        // הוסף תוצאות מוגדרות מראש לאמני חושים
        filtered = allResults.filter(item => 
          (item.provider && (
            item.provider.includes('נטע ברסלר') || 
            item.provider.includes('קליספרו') ||
            item.provider.includes('דורון רוזן') ||
            item.provider.includes('מאיה הקוסמת')
          )) ||
          (item.category && item.category.includes('אמני חושים')) ||
          (item.subcategory && item.subcategory.includes('אמני חושים'))
        );
      }
      
      // מיון לפי דירוג - התוצאות הגבוהות ביותר למעלה
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      
      setResults(filtered);
      setFilteredResults(filtered);
      setIsLoading(false);
    }, 600);
  };
  
  // Apply all filters to the search results
  const applyFilters = () => {
    setIsLoading(true);
    
    // In a real implementation, you would send these filters to the server
    // For now, we'll filter the mock results client-side
    setTimeout(() => {
      let filtered = [...results];
      
      if (selectedCategories.length > 0) {
        filtered = filtered.filter(item => selectedCategories.includes(item.category));
      }
      
      if (selectedConcepts.length > 0) {
        filtered = filtered.filter(item => 
          item.suitableFor.some(concept => selectedConcepts.includes(concept))
        );
      }
      
      filtered = filtered.filter(
        item => item.price >= priceRange[0] && item.price <= priceRange[1]
      );
      
      if (location) {
        filtered = filtered.filter(item => 
          item.location?.toLowerCase().includes(location.toLowerCase())
        );
      }
      
      if (selectedDate) {
        // In a real app, you would check availability for this date
        // Here we just simulate by filtering some random items
        filtered = filtered.filter(item => item.id.charCodeAt(0) % 2 === 0);
      }
      
      setFilteredResults(filtered);
      setIsLoading(false);
    }, 500);
  };
  
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedConcepts([]);
    setPriceRange([0, 10000]);
    setSelectedDate(undefined);
    setLocation("");
    setFilteredResults(results);
  };
  
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(current =>
      current.includes(categoryId)
        ? current.filter(id => id !== categoryId)
        : [...current, categoryId]
    );
  };
  
  const toggleConcept = (conceptId: string) => {
    setSelectedConcepts(current =>
      current.includes(conceptId)
        ? current.filter(id => id !== conceptId)
        : [...current, conceptId]
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container px-4 py-8">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">
              {initialQuery 
                ? `תוצאות חיפוש עבור: "${initialQuery}"` 
                : "חיפוש שירותים"}
            </h1>
            <p className="text-gray-600">
              {filteredResults.length} שירותים נמצאו
            </p>
          </div>
          
          {/* Search Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              סינון תוצאות
            </Button>
            
            <div className="flex items-center gap-2 flex-wrap">
              {selectedCategories.length > 0 && (
                <Badge variant="secondary" className="py-1 px-3">
                  {selectedCategories.length} קטגוריות
                </Badge>
              )}
              
              {selectedConcepts.length > 0 && (
                <Badge variant="secondary" className="py-1 px-3">
                  {selectedConcepts.length} קונספטים
                </Badge>
              )}
              
              {(priceRange[0] > 0 || priceRange[1] < 10000) && (
                <Badge variant="secondary" className="py-1 px-3">
                  מחיר: ₪{priceRange[0]} - ₪{priceRange[1]}
                </Badge>
              )}
              
              {location && (
                <Badge variant="secondary" className="py-1 px-3">
                  מיקום: {location}
                </Badge>
              )}
              
              {selectedDate && (
                <Badge variant="secondary" className="py-1 px-3">
                  תאריך: {format(selectedDate, 'dd/MM/yyyy')}
                </Badge>
              )}
              
              {(selectedCategories.length > 0 || 
                 selectedConcepts.length > 0 || 
                 priceRange[0] > 0 || 
                 priceRange[1] < 10000 ||
                 location ||
                 selectedDate) && (
                <Badge 
                  variant="outline" 
                  className="py-1 px-3 cursor-pointer hover:bg-red-50"
                  onClick={resetFilters}
                >
                  איפוס מסננים
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Panel */}
            <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h2 className="text-lg font-semibold mb-4 flex items-center justify-between">
                  <span>סינון תוצאות</span>
                  <SlidersHorizontal className="h-5 w-5" />
                </h2>
                
                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">קטגוריות</h3>
                  <div className="space-y-2">
                    {mainCategories.map(category => (
                      <div key={category.id} className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox 
                          id={`category-${category.id}`} 
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => toggleCategory(category.id)}
                        />
                        <label 
                          htmlFor={`category-${category.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category.value}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Concepts/Event Types */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">סוג אירוע</h3>
                  <div className="space-y-2">
                    {eventConcepts.slice(0, 8).map(concept => (
                      <div key={concept.id} className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox 
                          id={`concept-${concept.id}`} 
                          checked={selectedConcepts.includes(concept.id)}
                          onCheckedChange={() => toggleConcept(concept.id)}
                        />
                        <label 
                          htmlFor={`concept-${concept.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {concept.value}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">טווח מחירים</h3>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      min={0}
                      max={10000}
                      step={100}
                      onValueChange={setPriceRange}
                      className="my-6"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₪{priceRange[0]}</span>
                      <span>₪{priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                {/* Location */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">מיקום</h3>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="הזן עיר או אזור"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                
                {/* Date Picker */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">תאריך</h3>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-right font-normal"
                      >
                        <CalendarIcon className="ml-2 h-4 w-4" />
                        {selectedDate ? (
                          format(selectedDate, 'PPP', { locale: he })
                        ) : (
                          <span>בחר תאריך</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                {/* Apply Button */}
                <Button 
                  className="w-full bg-brand-600 hover:bg-brand-700"
                  onClick={applyFilters}
                >
                  החל סינון
                </Button>
              </div>
            </div>
            
            {/* Results List */}
            <div className="lg:w-3/4">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {Array(8).fill(null).map((_, i) => (
                    <div key={i} className="h-64 rounded-lg bg-gray-200 animate-pulse"></div>
                  ))}
                </div>
              ) : filteredResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredResults.map(result => (
                    <ServiceResultCard key={result.id} service={result} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold mb-2">לא נמצאו תוצאות</h3>
                  <p className="text-gray-600 mb-6">
                    נסה לשנות את מונחי החיפוש או הסרת חלק מהמסננים
                  </p>
                  <Button onClick={resetFilters}>איפוס מסננים</Button>
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
