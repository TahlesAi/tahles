
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Star } from "lucide-react";
import ProfileSidebar from "@/components/provider/ProfileSidebar";
import ProfileGallery from "@/components/provider/ProfileGallery";
import ProfileTabs from "@/components/provider/ProfileTabs";
import BookingDialog from "@/components/provider/BookingDialog";
import LoadingState from "@/components/provider/LoadingState";
import NotFoundState from "@/components/provider/NotFoundState";

const ProviderProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("about");
  const [provider, setProvider] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  
  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        if (!id) return;
        
        setLoading(true);
        
        // פריט נתונים של הספק
        const { data: providerData, error: providerError } = await supabase
          .from('providers')
          .select('*')
          .eq('id', id)
          .single();
        
        if (providerError) throw providerError;
        
        // פריט שירותים של הספק
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('*')
          .eq('provider_id', id);
        
        if (servicesError) throw servicesError;
        
        setProvider(providerData);
        setServices(servicesData);
        
        // הגדר את התמונה הפעילה מתמונת הלוגו של הספק
        if (providerData?.logo_url) {
          setActiveImage(providerData.logo_url);
        } else if (servicesData?.length > 0 && servicesData[0].image_url) {
          setActiveImage(servicesData[0].image_url);
        }
        
      } catch (error) {
        console.error("Error fetching provider data:", error);
        toast({
          title: "שגיאה בטעינת הנתונים",
          description: "לא ניתן לטעון את פרטי הספק, אנא נסה שנית מאוחר יותר",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProviderData();
  }, [id]);
  
  const handleBookService = (service: any) => {
    setSelectedService(service);
    setIsBookingDialogOpen(true);
  };
  
  const handleSubmitBooking = () => {
    setIsBookingDialogOpen(false);
    toast({
      title: "הזמנה נשלחה בהצלחה!",
      description: `הזמנתך ל-${selectedService.name} נשלחה בהצלחה. הספק ייצור איתך קשר בקרוב.`,
    });
  };
  
  // אם הנתונים עדיין בטעינה, הצג מחוון טעינה
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-8">
          <div className="container px-4">
            <LoadingState />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // אם הספק לא נמצא, הצג הודעת שגיאה
  if (!provider) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-8">
          <div className="container px-4 text-center">
            <NotFoundState />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // חילוץ תמונות מהשירותים לגלריה
  const serviceImages = services
    .map(service => service.image_url)
    .filter(url => url && url !== activeImage);
  
  const allImages = [provider.logo_url, ...serviceImages]
    .filter(Boolean)
    .filter((url, index, self) => self.indexOf(url) === index); // הסר כפילויות

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* פרופיל סיידבר */}
            <ProfileSidebar provider={provider} />
            
            {/* תוכן ראשי */}
            <div className="lg:col-span-2 space-y-6">
              {/* גלריית תמונות */}
              <ProfileGallery
                activeImage={activeImage}
                images={allImages}
                onImageSelect={setActiveImage}
                providerName={provider.name}
              />
              
              {/* טאבים */}
              <ProfileTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                providerName={provider.name}
                providerDescription={provider.description}
                services={services}
                onBookService={handleBookService}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      {/* דיאלוג הזמנה */}
      {selectedService && (
        <BookingDialog 
          service={selectedService}
          onSubmitBooking={handleSubmitBooking}
          isOpen={isBookingDialogOpen}
          setIsOpen={setIsBookingDialogOpen}
        >
          <div></div>
        </BookingDialog>
      )}
    </div>
  );
};

export default ProviderProfile;
