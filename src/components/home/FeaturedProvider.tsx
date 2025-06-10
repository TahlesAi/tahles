
import React from 'react';
import { useProviderData } from '@/hooks/useProviderData';
import NetaBreslerCard from '@/components/provider/NetaBreslerCard';
import { Skeleton } from '@/components/ui/skeleton';

const FeaturedProvider: React.FC = () => {
  const { providers, services, loading, error } = useProviderData();
  
  if (loading) {
    return (
      <section className="py-12 bg-gray-50" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <Skeleton className="h-64 max-w-4xl mx-auto" />
        </div>
      </section>
    );
  }
  
  if (error || !providers.length) {
    return null;
  }
  
  // חיפוש נטע ברסלר
  const netaBresler = providers.find(p => 
    p.name.includes('נטע ברסלר') || p.name.includes('אמן המחשבות')
  );
  
  if (!netaBresler) {
    return null;
  }
  
  // שירותים של נטע ברסלר
  const netaServices = services.filter(s => s.provider_id === netaBresler.id);
  
  return (
    <section className="py-12 bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">ספק מוביל בתחום המנטליזם</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            הכירו את נטע ברסלר, מנטליסט ישראלי מוביל עם ניסיון עשיר במופעים מרתקים
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <NetaBreslerCard 
            provider={netaBresler}
            services={netaServices}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedProvider;
