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
import { createBooking } from "@/lib/actions/booking";
import { BookingFormValues } from "@/lib/validations/booking";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ProviderProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("about");
  const [provider, setProvider] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  
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
  
  const handleSubmitBooking = async (formValues: BookingFormValues) => {
    if (!id || !selectedService?.id) return;
    
    setIsSubmitting(true);
    
    try {
      const bookingData = {
        ...formValues,
        providerId: id,
        serviceId: selectedService.id,
      };
      
      const result = await createBooking(bookingData);
      
      if (!result.success) {
        throw new Error(result.error || "שגיאה בשליחת ההזמנה");
      }
      
      // Close booking dialog and show success message
      setIsBookingDialogOpen(false);
      setIsSuccessDialogOpen(true);
      
    } catch (error: any) {
      console.error("Error submitting booking:", error);
      toast({
        title: "שגיאה בשליחת ההזמנה",
        description: error.message || "אירעה שגיאה בעת שליחת ההזמנה, אנא נסה שנית",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                providerId={id || ""} // Pass the provider ID
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
          providerId={id || ""}
          onSubmitBooking={handleSubmitBooking}
          isOpen={isBookingDialogOpen}
          setIsOpen={setIsBookingDialogOpen}
          isSubmitting={isSubmitting}
        >
          <div></div>
        </BookingDialog>
      )}

      {/* דיאלוג אישור הזמנה */}
      <AlertDialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>ההזמנה נשלחה בהצלחה!</AlertDialogTitle>
            <AlertDialogDescription>
              הזמנתך ל{selectedService?.name ? `-${selectedService.name}` : ""} נשלחה בהצלחה. נציג ייצור איתך קשר בקרוב לתיאום הפרטים הסופיים והתשלום.
              <p className="mt-2">תודה על פנייתך!</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-center">
            <AlertDialogAction>אישור</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProviderProfile;
