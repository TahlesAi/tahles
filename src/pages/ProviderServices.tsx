
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Home, ChevronRight, Star } from "lucide-react";
import { useEventContext } from "@/context/EventContext";
import { designSystem } from "@/lib/designSystem";

const ProviderServices = () => {
  const { providerId } = useParams<{ providerId: string }>();
  const { providers, isLoading, error, getServicesByProvider } = useEventContext();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container px-4 py-4 flex-grow">
          <div className="max-w-5xl mx-auto">
            <Skeleton className="h-4 w-48 mb-3" />
            <Skeleton className="h-4 w-full mb-4" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {Array(10).fill(null).map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const provider = providers.find(p => p.id === providerId);
  if (error || !provider) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container px-4 py-16 flex-grow">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">ספק לא נמצא</h1>
            <p className="text-gray-600 mb-6">מצטערים, הספק שחיפשת אינו קיים.</p>
            <Button asChild>
              <Link to="/categories">חזרה לקטגוריות</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const services = getServicesByProvider(providerId as string);
  
  // תיקון גישה לנכסי הספק
  const providerName = provider.businessName || provider.name || 'ספק ללא שם';
  const providerDescription = provider.description || '';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow" dir="rtl">
        <div className="container px-4 py-4">
          {/* פירורי לחם - קומפקטי */}
          <nav className="flex mb-4 text-xs items-center text-gray-500">
            <Link to="/" className="hover:text-brand-600">
              <Home className="h-3 w-3 ml-1" />
            </Link>
            <ChevronLeft className="h-3 w-3 mx-1" />
            <Link to="/categories" className="hover:text-brand-600">קטגוריות</Link>
            <ChevronLeft className="h-3 w-3 mx-1" />
            <span className="text-gray-900 font-medium">{providerName}</span>
          </nav>

          {/* כותרת קומפקטית */}
          <div className="mb-5">
            <h1 className={`${designSystem.typography.title} mb-1`}>{providerName}</h1>
            <p className="text-sm text-gray-600">{providerDescription}</p>
          </div>

          {/* שירותים - רשת צפופה */}
          <div className="mb-6">
            <h2 className={`${designSystem.typography.subtitle} mb-3`}>שירותים זמינים:</h2>
            
            {services.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {services.map((service) => (
                  <Link
                    key={service.id}
                    to={`/service/${service.id}`}
                    className="group"
                  >
                    <Card className="h-full hover:shadow-md transition-all duration-200 hover:scale-[1.02] overflow-hidden">
                      <div className="aspect-video bg-gray-100 flex items-center justify-center">
                        {service.imageUrl ? (
                          <img
                            src={service.imageUrl}
                            alt={service.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-400 text-xs">אין תמונה</span>
                        )}
                      </div>
                      <CardContent className="p-2.5">
                        <h3 className="text-xs font-medium group-hover:text-brand-600 transition-colors mb-1 line-clamp-2 leading-tight">
                          {service.name}
                        </h3>
                        
                        {service.rating && (
                          <div className="flex items-center mb-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 ml-1" />
                            <span className="text-xs font-medium">{service.rating.toFixed(1)}</span>
                          </div>
                        )}
                        
                        {service.featured && (
                          <div className="inline-block bg-green-100 text-green-800 text-xs px-1 py-0.5 rounded-full mb-1">
                            מומלץ ✓
                          </div>
                        )}
                        
                        <div className="text-center mt-1">
                          <span className="text-xs text-brand-600 font-medium">
                            צפה <ChevronRight className="inline h-3 w-3" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-2">לא נמצאו שירותים</p>
                <Button asChild variant="link" size="sm">
                  <Link to="/categories">חזרה לקטגוריות</Link>
                </Button>
              </div>
            )}
          </div>
          
          {/* CTA קומפקטי */}
          <div className="text-center py-4 bg-brand-50 rounded-lg">
            <h3 className="text-sm font-medium mb-1">מעוניין להציע שירותים?</h3>
            <p className="text-xs text-gray-600 mb-2">הצטרף כספק</p>
            <Button asChild size="sm">
              <Link to="/provider-onboarding">הצטרפות</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProviderServices;
