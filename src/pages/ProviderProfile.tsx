
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
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

// Sample providers for demo purposes
const demoProviders = {
  "1": {
    id: "1",
    name: "נטע ברסלר",
    description: "אמן מחשבות וקריאת מחשבות מהמובילים בישראל. עם ניסיון של יותר מ-15 שנה, נטע מציע מופעים אינטראקטיביים שמשאירים את הקהל פעור פה. מופיע באירועים פרטיים, חתונות, אירועי חברה ועוד.",
    logo_url: "https://images.unsplash.com/photo-1492288991661-058aa541ff43?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80",
    email: "neta@mentalmagic.co.il",
    phone: "050-1234567",
    website: "www.netabresler.co.il",
    address: "תל אביב, ישראל"
  },
  "2": {
    id: "2",
    name: "להקת מלודי מייקרס",
    description: "להקה מקצועית המתמחה במגוון סגנונות מוזיקליים. מאז 2010, אנחנו מנגנים באירועים פרטיים, חתונות ואירועי חברה. הלהקה כוללת נגנים וזמרים מוכשרים שיהפכו כל אירוע לבלתי נשכח.",
    logo_url: "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80",
    email: "info@melodymakers.co.il",
    phone: "052-9876543",
    website: "www.melodymakers.co.il",
    address: "חיפה, ישראל"
  },
  "3": {
    id: "3",
    name: "סטודיו צילום זכרונות חיים",
    description: "סטודיו צילום מקצועי המתמחה בצילום אירועים, חתונות ומשפחות. הצלמים שלנו מצלמים רגעים מיוחדים בגישה טבעית ואותנטית, יוצרים זכרונות חיים שנשארים לתמיד.",
    logo_url: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80",
    email: "studio@zichronot.co.il",
    phone: "053-7654321",
    website: "www.livingmemories.co.il",
    address: "ירושלים, ישראל"
  }
};

// Sample services for demo providers
const demoServices = {
  "1": [
    {
      id: "1-1",
      name: "מופע קריאת מחשבות - חבילה בסיסית",
      short_description: "מופע קריאת מחשבות מרהיב לאירועים קטנים עד 50 איש",
      description: "מופע קריאת מחשבות אינטראקטיבי באורך של כ-30 דקות, מתאים לאירועים קטנים או לחלק מאירוע גדול יותר.",
      price_range: "₪3,000 - ₪4,000",
      duration: "30 דקות",
      provider_id: "1",
      provider_name: "נטע ברסלר",
      image_url: "https://images.unsplash.com/photo-1492288991661-058aa541ff43?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
      availability: "ימי חול בערב",
      is_premium: false,
      is_custom: false,
      includes: ["מופע אינטראקטיבי", "שילוב של עד 10 משתתפים", "אפקטים מנטליים", "הפתעות מותאמות אישית"]
    },
    {
      id: "1-2",
      name: "מופע קריאת מחשבות - חבילת פרימיום",
      short_description: "מופע קריאת מחשבות משולב בקטעי הומור לאירועים גדולים",
      description: "מופע קריאת מחשבות מורחב באורך של כ-60 דקות, הכולל קטעי הומור ואלמנטים אינטראקטיביים רבים עם הקהל.",
      price_range: "₪5,000 - ₪7,000",
      duration: "60 דקות",
      provider_id: "1",
      provider_name: "נטע ברסלר",
      image_url: "https://images.unsplash.com/photo-1503095396549-807759245b35?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
      availability: "כל ימות השבוע",
      is_premium: true,
      is_custom: false,
      includes: ["מופע אינטראקטיבי", "שילוב של עד 20 משתתפים", "אפקטים מנטליים", "קטעי הומור", "הקלטת וידאו של האירוע", "משימה מותאמת אישית לאירוע"]
    },
    {
      id: "1-3",
      name: "קריאת מחשבות אישית בין שולחנות",
      short_description: "קריאת מחשבות אינטימית בין אורחי האירוע",
      description: "מתאים לקבלת פנים או במהלך האירוע, נטע יעבור בין השולחנות ויבצע קסמים אישיים וקריאת מחשבות.",
      price_range: "₪2,500 - ₪3,500",
      duration: "עד שעתיים",
      provider_id: "1",
      provider_name: "נטע ברסלר",
      image_url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
      availability: "כל ימות השבוע",
      is_premium: false,
      is_custom: true,
      includes: ["קסמים אישיים", "אינטראקציה עם האורחים", "ניתן להתאים לכל סוג אירוע"]
    }
  ],
  "2": [
    {
      id: "2-1",
      name: "מופע מוזיקלי - הרכב בסיסי",
      short_description: "הרכב מוזיקלי של 3 נגנים לאירועים קטנים",
      description: "הרכב מוזיקלי הכולל זמר/ת, גיטריסט וקלידן, מתאים לאירועים קטנים עד 100 איש.",
      price_range: "₪4,000 - ₪5,500",
      duration: "3 שעות",
      provider_id: "2",
      provider_name: "להקת מלודי מייקרס",
      image_url: "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
      availability: "ימי חול וסופי שבוע",
      is_premium: false,
      is_custom: false,
      includes: ["הגברה בסיסית", "תאורה בסיסית", "רפרטואר מגוון", "התאמה אישית של 5 שירים"]
    },
    {
      id: "2-2",
      name: "מופע מוזיקלי - הרכב מלא",
      short_description: "הרכב מוזיקלי מלא של 6 נגנים לאירועים גדולים",
      description: "הרכב מוזיקלי מלא הכולל שני זמרים, גיטריסט, בסיסט, קלידן ומתופף. מתאים לאירועים גדולים ואולמות.",
      price_range: "₪8,000 - ₪12,000",
      duration: "4 שעות",
      provider_id: "2",
      provider_name: "להקת מלודי מייקרס",
      image_url: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
      availability: "סופי שבוע",
      is_premium: true,
      is_custom: false,
      includes: ["מערכת הגברה מקצועית", "תאורה מקצועית", "רפרטואר רחב", "התאמה אישית של 10 שירים", "הקלטת סאונד מלאה", "מנהל במה"]
    }
  ],
  "3": [
    {
      id: "3-1",
      name: "צילום אירוע - חבילה בסיסית",
      short_description: "צילום אירוע בסיסי עם צלם אחד",
      description: "צילום סטילס מקצועי לאירוע באורך של עד 4 שעות עם צלם אחד.",
      price_range: "₪1,800 - ₪2,500",
      duration: "4 שעות",
      provider_id: "3",
      provider_name: "סטודיו צילום זכרונות חיים",
      image_url: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
      availability: "כל ימות השבוע",
      is_premium: false,
      is_custom: false,
      includes: ["צילום סטילס", "עד 300 תמונות ערוכות", "אלבום דיגיטלי", "זמן עריכה: עד שבועיים"]
    },
    {
      id: "3-2",
      name: "צילום אירוע - חבילת פרימיום",
      short_description: "צילום אירוע מלא עם צלם סטילס וצלם וידאו",
      description: "צילום מקצועי לאירוע הכולל צילום סטילס וצילום וידאו באורך של עד 6 שעות.",
      price_range: "₪5,000 - ₪7,000",
      duration: "6 שעות",
      provider_id: "3",
      provider_name: "סטודיו צילום זכרונות חיים",
      image_url: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
      availability: "כל ימות השבוע",
      is_premium: true,
      is_custom: false,
      includes: ["צילום סטילס מקצועי", "צילום וידאו 4K", "עד 500 תמונות ערוכות", "סרטון מסכם עד 5 דקות", "אלבום דיגיטלי מפואר", "אלבום מודפס יוקרתי", "זמן עריכה: עד חודש"]
    }
  ]
};

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
  const [usingDemoData, setUsingDemoData] = useState(false);
  
  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        if (!id) return;
        
        setLoading(true);
        
        // Try to fetch provider from database
        const { data: providerData, error: providerError } = await supabase
          .from('providers')
          .select('*')
          .eq('id', id)
          .single();
        
        if (providerError || !providerData) {
          // If database fetch fails, check if we have demo data for this ID
          if (demoProviders[id as keyof typeof demoProviders]) {
            setProvider(demoProviders[id as keyof typeof demoProviders]);
            setServices(demoServices[id as keyof typeof demoServices] || []);
            setUsingDemoData(true);
            
            // Set active image from demo provider
            const demoProvider = demoProviders[id as keyof typeof demoProviders];
            if (demoProvider?.logo_url) {
              setActiveImage(demoProvider.logo_url);
            } else if (demoServices[id as keyof typeof demoServices]?.length > 0) {
              setActiveImage(demoServices[id as keyof typeof demoServices][0].image_url);
            }
          } else {
            console.error("Provider not found in database or demo data");
            // Don't set provider - will show not found state
          }
        } else {
          // Provider found in database, now get services
          setProvider(providerData);
          
          const { data: servicesData, error: servicesError } = await supabase
            .from('services')
            .select('*')
            .eq('provider_id', id);
          
          if (servicesError) {
            console.error("Error fetching services:", servicesError);
          } else {
            setServices(servicesData || []);
          }
          
          // Set active image
          if (providerData?.logo_url) {
            setActiveImage(providerData.logo_url);
          } else if (servicesData?.length > 0 && servicesData[0].image_url) {
            setActiveImage(servicesData[0].image_url);
          }
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
      // If using demo data, just simulate a successful booking
      if (usingDemoData) {
        // Simulate server delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Close booking dialog and show success message
        setIsBookingDialogOpen(false);
        setIsSuccessDialogOpen(true);
        
        return;
      }
      
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
