
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Home, Star, Phone, Mail, Globe, MapPin } from "lucide-react";
import { useEventContext } from "@/context/EventContext";
import ServiceResultCard from "@/components/search/ServiceResultCard";
import { Service } from "@/types";
import { SearchResultService } from "@/types";
import { convertServiceToSearchResult } from "@/utils/serviceConverters";

const ProviderServices = () => {
  const { providerId } = useParams<{ providerId: string }>();
  const {
    providers,
    selectedCategory,
    selectedSubcategory,
    selectedServiceType,
    getServicesByProvider,
    isLoading,
    error
  } = useEventContext();
  
  const [provider, setProvider] = useState<any | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [serviceResults, setServiceResults] = useState<SearchResultService[]>([]);
  const [activeTab, setActiveTab] = useState("services");

  useEffect(() => {
    if (providerId && providers.length > 0) {
      const foundProvider = providers.find((p) => p.id === providerId);
      setProvider(foundProvider || null);
      
      if (foundProvider) {
        const providerServices = getServicesByProvider(providerId);
        setServices(providerServices);
        
        // המרה של Service לפורמט SearchResultService שמתאים ל-ServiceResultCard
        const convertedServices = providerServices.map(service => 
          convertServiceToSearchResult(service, foundProvider.name)
        );
        setServiceResults(convertedServices);
      }
    }
  }, [providerId, providers, getServicesByProvider]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container px-4 py-8 flex-grow">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-6 w-full mb-8" />
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <Skeleton className="h-60 w-full rounded-lg mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="lg:w-2/3">
              <Skeleton className="h-12 w-full mb-6" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {Array(4).fill(null).map((_, i) => (
                  <Skeleton key={i} className="h-52 rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow" dir="rtl">
        <div className="container px-4 py-8">
          {/* פירורי לחם */}
          <nav className="flex mb-6 text-sm items-center text-gray-500">
            <Link to="/" className="hover:text-brand-600">
              <Home className="h-4 w-4 ml-1" />
            </Link>
            <ChevronLeft className="h-3 w-3 mx-1" />
            <Link to="/categories" className="hover:text-brand-600">קטגוריות</Link>
            {selectedCategory && (
              <>
                <ChevronLeft className="h-3 w-3 mx-1" />
                <Link to={`/categories/${selectedCategory.id}`} className="hover:text-brand-600">
                  {selectedCategory.name}
                </Link>
              </>
            )}
            {selectedSubcategory && (
              <>
                <ChevronLeft className="h-3 w-3 mx-1" />
                <Link to={`/subcategories/${selectedSubcategory.id}`} className="hover:text-brand-600">
                  {selectedSubcategory.name}
                </Link>
              </>
            )}
            {selectedServiceType && (
              <>
                <ChevronLeft className="h-3 w-3 mx-1" />
                <Link to={`/service-types/${selectedServiceType.id}`} className="hover:text-brand-600">
                  {selectedServiceType.name}
                </Link>
              </>
            )}
            <ChevronLeft className="h-3 w-3 mx-1" />
            <span className="text-gray-900 font-medium">{provider.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Provider Sidebar */}
            <div className="lg:w-1/3">
              <Card className="p-6">
                <div className="mb-6">
                  {provider.logo_url ? (
                    <img
                      src={provider.logo_url}
                      alt={provider.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-lg mb-4">
                      <span className="text-gray-400">אין לוגו</span>
                    </div>
                  )}
                  
                  <h1 className="text-2xl font-bold mb-2">{provider.name}</h1>
                  
                  {provider.rating && (
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-1" />
                      <span className="font-medium">{provider.rating.toFixed(1)}</span>
                      {provider.review_count && (
                        <span className="text-sm text-gray-500 mr-1">
                          ({provider.review_count} ביקורות)
                        </span>
                      )}
                    </div>
                  )}
                  
                  {provider.is_verified && (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200 mb-3">
                      ספק מאומת ✓
                    </Badge>
                  )}
                  
                  <p className="text-gray-600 mb-4">{provider.description}</p>
                </div>
                
                <div className="space-y-3">
                  {provider.contact_phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 ml-2 text-gray-500" />
                      <a href={`tel:${provider.contact_phone}`} className="text-sm hover:text-brand-600">
                        {provider.contact_phone}
                      </a>
                    </div>
                  )}
                  
                  {provider.contact_email && (
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 ml-2 text-gray-500" />
                      <a href={`mailto:${provider.contact_email}`} className="text-sm hover:text-brand-600">
                        {provider.contact_email}
                      </a>
                    </div>
                  )}
                  
                  {provider.website && (
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 ml-2 text-gray-500" />
                      <a 
                        href={provider.website.startsWith('http') ? provider.website : `https://${provider.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm hover:text-brand-600"
                      >
                        {provider.website}
                      </a>
                    </div>
                  )}
                  
                  {provider.address && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 ml-2 text-gray-500" />
                      <span className="text-sm">{provider.address}</span>
                    </div>
                  )}
                </div>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="lg:w-2/3">
              <Tabs defaultValue="services" onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="services" className="flex-1">שירותים ומוצרים</TabsTrigger>
                  <TabsTrigger value="about" className="flex-1">אודות</TabsTrigger>
                  <TabsTrigger value="reviews" className="flex-1">ביקורות</TabsTrigger>
                </TabsList>
                
                <TabsContent value="services">
                  {serviceResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {serviceResults.map((service) => (
                        <ServiceResultCard key={service.id} service={service} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">לא נמצאו שירותים לספק זה</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="about">
                  <Card className="p-6">
                    <h2 className="text-xl font-bold mb-4">אודות {provider.name}</h2>
                    <p className="text-gray-600 mb-6 whitespace-pre-line">{provider.description}</p>
                    
                    <h3 className="text-lg font-semibold mb-3">קטגוריות שירות:</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {provider.subcategory_ids?.map((subcategoryId: string) => {
                        const subcategory = selectedSubcategory;
                        if (subcategory) {
                          return (
                            <Badge key={subcategoryId} variant="outline">
                              {subcategory.name}
                            </Badge>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="reviews">
                  <Card className="p-6">
                    <h2 className="text-xl font-bold mb-4">ביקורות</h2>
                    {provider.review_count && provider.review_count > 0 ? (
                      <div className="space-y-4">
                        {/* כאן יהיו ביקורות מנותני שירות */}
                        <p className="text-gray-600">ביקורות יוצגו כאן בקרוב...</p>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">אין ביקורות עדיין</p>
                      </div>
                    )}
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProviderServices;
