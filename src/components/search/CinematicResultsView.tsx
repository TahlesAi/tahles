
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import ResponsiveServiceCard from '@/components/responsive/ResponsiveServiceCard';

interface CinematicResultsViewProps {
  services: any[];
  providers: any[];
}

const CinematicResultsView: React.FC<CinematicResultsViewProps> = ({ 
  services, 
  providers 
}) => {
  const [showAllRecommended, setShowAllRecommended] = useState(false);
  const [showAllProviders, setShowAllProviders] = useState(false);

  const topRecommended = services.filter(s => s.featured).slice(0, showAllRecommended ? services.length : 10);
  const personalizedProviders = providers.slice(0, showAllProviders ? providers.length : 10);

  return (
    <div className="space-y-8" dir="rtl">
      {/* המומלצים שלנו */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Star className="h-6 w-6 text-amber-500 fill-amber-500" />
              המומלצים שלנו
            </h2>
            <p className="text-gray-600 mt-1">
              השירותים הכי מבוקשים ומדורגים שלנו
            </p>
          </div>
          <Badge className="bg-amber-100 text-amber-800 border-amber-200">
            TOP 10
          </Badge>
        </div>

        {/* גריד רספונסיבי */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mb-6">
          {topRecommended.map((service, index) => (
            <div key={service.id} className="relative">
              {index < 3 && (
                <Badge className="absolute top-2 right-2 z-10 bg-amber-500">
                  #{index + 1}
                </Badge>
              )}
              <ResponsiveServiceCard service={service} variant="grid" />
            </div>
          ))}
        </div>

        {services.filter(s => s.featured).length > 10 && (
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => setShowAllRecommended(!showAllRecommended)}
              className="px-8"
            >
              {showAllRecommended ? 'הצג פחות' : `הצג עוד (${services.filter(s => s.featured).length - 10})`}
            </Button>
          </div>
        )}
      </section>

      {/* קו הפרדה */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-gray-500">מותאם אישית עבורכם</span>
        </div>
      </div>

      {/* ספקים מותאמים אישית */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              ספקים מותאמים אישית
            </h2>
            <p className="text-gray-600 mt-1">
              על בסיס החיפוש והעדפות שלכם
            </p>
          </div>
        </div>

        {/* תצוגת רשימה רספונסיבית */}
        <div className="space-y-4 mb-6">
          {personalizedProviders.map((provider, index) => (
            <ResponsiveServiceCard 
              key={provider.id} 
              service={provider} 
              variant="list" 
            />
          ))}
        </div>

        {providers.length > 10 && (
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => setShowAllProviders(!showAllProviders)}
              className="px-8"
            >
              {showAllProviders ? 'הצג פחות' : `הצג עוד (${providers.length - 10} ספקים)`}
            </Button>
          </div>
        )}
      </section>

      {/* תוצאות מורחבות */}
      {(showAllRecommended || showAllProviders) && (
        <section className="border-t pt-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">מחפשים משהו ספציפי יותר?</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="outline">סינון מתקדם</Button>
              <Button variant="outline">חיפוש לפי מיקום</Button>
              <Button variant="outline">חיפוש לפי תאריך</Button>
              <Button>פנו אלינו לייעוץ</Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default CinematicResultsView;
