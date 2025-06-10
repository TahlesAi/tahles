
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useProviderData } from '@/hooks/useProviderData';
import ProviderCard from '@/components/provider/ProviderCard';
import { SearchResultsSkeleton } from '@/components/loading/AdvancedSkeletonLoader';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const ProvidersPage: React.FC = () => {
  const { providers, loading, error } = useProviderData();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6" dir="rtl">כל הספקים</h1>
          <SearchResultsSkeleton />
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Alert dir="rtl">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              שגיאה בטעינת הספקים: {error}
            </AlertDescription>
          </Alert>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8" dir="rtl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">כל הספקים</h1>
          <p className="text-gray-600">
            גלה את הספקים המובילים שלנו ({providers.length} ספקים זמינים)
          </p>
        </div>
        
        {providers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">אין ספקים זמינים כרגע</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                showServices={true}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProvidersPage;
