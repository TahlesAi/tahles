
import React, { useState, useEffect } from 'react';
import { useProviderData } from '@/hooks/useProviderData';
import ServiceResultCard from './ServiceResultCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search } from 'lucide-react';

interface SearchResultsProps {
  searchQuery?: string;
  filters?: any;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  searchQuery = '', 
  filters = {} 
}) => {
  const { services, loading, error, searchServices } = useProviderData();
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const filteredResults = searchServices(searchQuery, filters);
    setResults(filteredResults);
  }, [searchQuery, filters, services, searchServices]);

  if (loading) {
    return (
      <div className="space-y-4" dir="rtl">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-48 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert dir="rtl">
        <AlertDescription>
          שגיאה בטעינת תוצאות החיפוש: {error}
        </AlertDescription>
      </Alert>
    );
  }

  if (!results.length) {
    return (
      <div className="text-center py-12" dir="rtl">
        <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">לא נמצאו תוצאות</h3>
        <p className="text-gray-600">
          נסה לחפש במילים אחרות או לשנות את הפילטרים
        </p>
      </div>
    );
  }

  return (
    <div dir="rtl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">תוצאות החיפוש</h2>
        <p className="text-gray-600">
          נמצאו {results.length} שירותים
          {searchQuery && ` עבור "${searchQuery}"`}
        </p>
      </div>
      
      <div className="space-y-6">
        {results.map((service) => (
          <ServiceResultCard
            key={service.id}
            service={service}
            onBook={() => {
              // כאן ניתן להוסיף לוגיקה להזמנה
              console.log('Booking service:', service.id);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
