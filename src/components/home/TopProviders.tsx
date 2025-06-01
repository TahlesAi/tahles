
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEventContext } from "@/context/EventContext";
import { useAutoCarousel } from "@/hooks/useAutoCarousel";
import { useMemo } from "react";

const TopProviders = () => {
  const { topProviders, providers } = useEventContext();
  const { emblaRef } = useAutoCarousel({ delay: 3000 });

  // נוסחת דירוג דינמית
  const sortedProviders = useMemo(() => {
    const calculateScore = (provider: any) => {
      const rating = provider.rating || 0;
      const reviewCount = provider.review_count || 0;
      const popularityScore = Math.min(reviewCount / 10, 10); // מנרמל לטווח 0-10
      const recentActivity = Math.random() * 3; // זמני - יוחלף בנתונים אמיתיים
      
      return (rating * 0.4) + (popularityScore * 0.3) + (recentActivity * 0.3);
    };

    return (providers || topProviders || [])
      .filter(provider => provider.rating > 3.5)
      .map(provider => ({
        ...provider,
        dynamicScore: calculateScore(provider)
      }))
      .sort((a, b) => b.dynamicScore - a.dynamicScore);
  }, [providers, topProviders]);

  // חלוקה לסלידים של 3 ספקים - עם הבטחת שורות שלמות
  const itemsPerSlide = 3;
  const slides = [];
  
  // יצירת רשימה מתרחבת כדי להבטיח שורות שלמות
  const extendedProviders = [...sortedProviders];
  while (extendedProviders.length % itemsPerSlide !== 0) {
    extendedProviders.push(...sortedProviders.slice(0, itemsPerSlide - (extendedProviders.length % itemsPerSlide)));
  }
  
  for (let i = 0; i < extendedProviders.length; i += itemsPerSlide) {
    slides.push(extendedProviders.slice(i, i + itemsPerSlide));
  }

  if (slides.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white" dir="rtl">
      <div className="container px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">ספקים מובילים</h2>
          <Link to="/providers" className="text-brand-600 hover:text-brand-700 font-medium flex items-center text-sm">
            לכל הספקים
            <ArrowRight className="h-4 w-4 mr-1" />
          </Link>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {slides.map((slideProviders, slideIndex) => (
                <div 
                  key={slideIndex} 
                  className="flex-[0_0_100%] min-w-0"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {slideProviders.map((provider, index) => (
                      <div key={`${provider.id}-${slideIndex}-${index}`} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <Link to={`/providers/${provider.id}`}>
                          <div className="aspect-video bg-gray-100">
                            {provider.logo_url ? (
                              <img src={provider.logo_url} alt={provider.name} className="h-full w-full object-cover" />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-gray-400">
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-brand-600 mb-1">
                                    {provider.name.charAt(0)}
                                  </div>
                                  <div className="text-xs">אין תמונה</div>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold mb-1 line-clamp-1">{provider.name}</h3>
                            <p className="text-sm text-gray-500 line-clamp-2 mb-2 min-h-[2.5rem]">
                              {provider.description || 'ספק שירותים מקצועי'}
                            </p>
                            <div className="flex items-center justify-between">
                              {provider.rating && (
                                <div className="flex items-center">
                                  <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                      <span key={i} className="text-sm">
                                        {i < Math.round(provider.rating) ? "★" : "☆"}
                                      </span>
                                    ))}
                                  </div>
                                  <span className="text-xs text-gray-500 ml-2">({provider.review_count || 0})</span>
                                </div>
                              )}
                              <div className="text-xs text-brand-600 font-medium">
                                דירוג: {provider.dynamicScore?.toFixed(1)}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* אינדיקטורי קרוסלה */}
          <div className="flex justify-center mt-6 space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"
              />
            ))}
          </div>
        </div>
        
        <div className="text-center mt-10">
          <Button variant="outline" asChild>
            <Link to="/providers">לכל הספקים</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopProviders;
