
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceHeader from "@/components/service/ServiceHeader";
import ServiceGallery from "@/components/service/ServiceGallery";
import ServiceBookingCard from "@/components/service/ServiceBookingCard";
import ServiceDetailInfo from "@/components/service/ServiceDetailInfo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { getServiceById, getProviderById } from "@/lib/unifiedMockData";
import ServiceLoadingState from "@/components/service/ServiceLoadingState";
import ServiceErrorState from "@/components/service/ServiceErrorState";

const EnhancedServiceDetails = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (serviceId) {
      loadServiceData(serviceId);
    }
  }, [serviceId]);

  const loadServiceData = async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Try to get from mock data first
      const mockService = getServiceById(id);
      if (mockService) {
        const mockProvider = getProviderById(mockService.providerId);
        setService(mockService);
        setProvider(mockProvider);
        setIsLoading(false);
        return;
      }
      
      // If not found in mock data, set error
      setError('השירות לא נמצא');
    } catch (err) {
      console.error('Error loading service:', err);
      setError('שגיאה בטעינת השירות');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSave = () => {
    setIsSaved(!isSaved);
  };

  if (isLoading) {
    return <ServiceLoadingState />;
  }

  if (error || !service) {
    return <ServiceErrorState error={error} onRetry={() => loadServiceData(serviceId!)} />;
  }

  const averageRating = service.rating || 0;
  const reviewCount = service.reviewCount || 0;

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <ServiceHeader 
                service={service}
                provider={provider}
                averageRating={averageRating}
                reviewCount={reviewCount}
              />
              
              {/* Service Gallery */}
              <ServiceGallery 
                mediaGallery={service.mediaGallery || []}
                serviceName={service.name}
              />
              
              {/* Service Details Tabs */}
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">פרטי השירות</TabsTrigger>
                  <TabsTrigger value="availability">זמינות</TabsTrigger>
                  <TabsTrigger value="reviews">ביקורות</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="mt-6">
                  <ServiceDetailInfo service={service} />
                </TabsContent>
                
                <TabsContent value="availability" className="mt-6">
                  <div className="bg-white rounded-lg p-6 border">
                    <h3 className="text-lg font-semibold mb-4">זמינות השירות</h3>
                    <p className="text-gray-600 mb-4">
                      הספק זמין לביצוע השירות בתאמים הבאים:
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">ימים: ראשון - חמישי</Badge>
                        <Badge variant="outline">שעות: 09:00 - 22:00</Badge>
                      </div>
                      <p className="text-sm text-gray-500">
                        לבדיקת זמינות מדויקת, אנא צרו קשר או בצעו הזמנה
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="mt-6">
                  <div className="bg-white rounded-lg p-6 border">
                    <h3 className="text-lg font-semibold mb-4">ביקורות לקוחות</h3>
                    <div className="text-center py-8">
                      <p className="text-gray-600">
                        הביקורות יועלו בקרוב. בינתיים תוכלו לפנות ישירות לספק לקבלת המלצות.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <ServiceBookingCard 
                  service={service}
                  provider={provider}
                  averageRating={averageRating}
                  reviewCount={reviewCount}
                  isSaved={isSaved}
                  toggleSave={toggleSave}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EnhancedServiceDetails;
