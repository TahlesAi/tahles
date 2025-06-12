
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { ServiceCard } from '@/components/cards/ServiceCard';
import SearchFilters from "@/components/search/SearchFilters";

interface SearchResult {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
}

// Mock data for search results
const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    name: 'נטע ברסלר - מנטליסט',
    description: 'מופע מנטליזם מרתק ומותאם לכל סוג של אירוע',
    price: 3500,
    imageUrl: '/placeholder.svg',
    rating: 4.8,
    reviewCount: 142
  },
  {
    id: '2',
    name: 'להקת הג\'אז הישראלית',
    description: 'מוזיקת ג\'אז איכותית לאירועים מיוחדים',
    price: 4200,
    imageUrl: '/placeholder.svg',
    rating: 4.6,
    reviewCount: 89
  },
  {
    id: '3',
    name: 'דוד הקוסם',
    description: 'מופעי קסמים לילדים ולמבוגרים',
    price: 2800,
    imageUrl: '/placeholder.svg',
    rating: 4.9,
    reviewCount: 203
  }
];

export const SearchResultsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
    
    // Filter results based on search query
    const filteredResults = query 
      ? mockSearchResults.filter(result => 
          result.name.toLowerCase().includes(query.toLowerCase()) ||
          result.description.toLowerCase().includes(query.toLowerCase())
        )
      : mockSearchResults;
    
    setSearchResults(filteredResults);
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50" dir="rtl">
        <div className="container px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">
                תוצאות חיפוש
              </h1>
              {searchQuery && (
                <p className="text-gray-600">
                  עבור "{searchQuery}"
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="search"
                placeholder="חיפוש..."
                className="w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* מסנני חיפוש */}
            <div className="lg:col-span-1">
              <SearchFilters onFiltersChange={(filters) => console.log('Filters changed:', filters)} />
            </div>
            
            {/* תוצאות חיפוש */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {searchResults.length} תוצאות
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.map((result) => (
                    <ServiceCard
                      key={result.id}
                      id={result.id}
                      name={result.name}
                      description={result.description}
                      price={result.price}
                      imageUrl={result.imageUrl}
                      rating={result.rating}
                      reviewCount={result.reviewCount}
                    />
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
