
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { StarIcon, Clock, Calendar, MapPin, Phone, Package, User, Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Service {
  id: string;
  name: string;
  description: string;
  price_range: string;
  duration: string;
  image_url: string;
  provider_id: string;
  created_at: string;
  updated_at: string;
  provider: {
    id: string;
    name: string;
    description: string;
    phone: string;
    email: string;
    website: string;
    address: string;
    logo_url: string;
    created_at: string;
    updated_at: string;
  };
}

// מוק נתונים לשירות לדוגמה
const demoData = {
  id: "demo",
  name: "נטע ברסלר - מופע מנטליזם וקריאת מחשבות",
  description: "נטע ברסלר מביא את האמנות הייחודית של קריאת מחשבות ומנטליזם לאירוע שלכם. מופע מרתק שישאיר את האורחים מרותקים ובהלם מוחלט. מופע שמתאים לכל סוגי האירועים: ימי הולדת, ארועי חברה, חתונות ומסיבות פרטיות.",
  price_range: "3,000₪ - 5,000₪",
  duration: "45-60 דקות",
  image_url: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=800&auto=format&fit=crop",
  provider_id: "demo",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  provider: {
    id: "demo",
    name: "נטע ברסלר",
    description: "אמן מנטליזם וקריאת מחשבות מהמובילים בישראל עם ניסיון של מעל 10 שנים בתחום.",
    phone: "052-1234567",
    email: "neta@example.com",
    website: "https://netabresler.example.com",
    address: "תל אביב, ישראל",
    logo_url: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=200&auto=format&fit=crop",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}; 

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setIsLoading(true);
        
        // מציג דוגמה קבועה אם זה המזהה demo
        if (id === "demo") {
          setTimeout(() => {
            setService(demoData as Service);
            setIsLoading(false);
          }, 500);
          return;
        }
        
        // אחרת מנסה לשלוף מהשרת
        const { data, error } = await supabase
          .from("services")
          .select(`
            *,
            provider:providers(*)
          `)
          .eq("id", id)
          .single();
        
        if (error) throw error;
        
        if (data) {
          setService(data as unknown as Service);
        } else {
          setError("השירות המבוקש לא נמצא");
        }
      } catch (err: any) {
        console.error("Error fetching service:", err);
        setError(err.message || "אירעה שגיאה בטעינת הנתונים");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchService();
  }, [id]);

  const handleBookNow = () => {
    // ניווט לדף הזמנה
    window.location.href = `/booking/${id}`;
  };

  const handleContactProvider = () => {
    toast({
      title: "יצירת קשר עם הספק",
      description: "פרטי הקשר נשלחו לדוא״ל שלך",
    });
  };

  // מצב טעינה
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Skeleton className="h-8 w-1/2 mb-4" />
                <Skeleton className="h-6 w-1/3 mb-8" />
                <Skeleton className="h-64 w-full mb-8 rounded-lg" />
                <Skeleton className="h-5 w-full mb-4" />
                <Skeleton className="h-5 w-full mb-4" />
                <Skeleton className="h-5 w-2/3 mb-8" />
              </div>
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <Skeleton className="h-8 w-1/2 mb-4" />
                  <Skeleton className="h-6 w-full mb-4" />
                  <Skeleton className="h-6 w-full mb-4" />
                  <Skeleton className="h-10 w-full mb-4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // מצב שגיאה
  if (error || !service) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-2xl font-bold mb-4">לא נמצא שירות</h2>
            <p className="text-gray-600 mb-8">{error || "השירות המבוקש אינו זמין"}</p>
            <Button onClick={() => window.history.back()}>חזרה לדף הקודם</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // פריסת הדף העיקרי
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* תמונת כותרת רחבה */}
        <div className="relative h-64 md:h-80 lg:h-96 w-full">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url(${service.image_url})` }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-0 right-0 left-0 p-8">
            <div className="container mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{service.name}</h1>
              <div className="flex items-center text-white">
                <StarIcon className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                <span>4.9</span>
                <span className="text-sm mx-1">(84 ביקורות)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* תוכן עיקרי */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">תיאור השירות</h2>
              <p className="text-gray-700 mb-8 whitespace-pre-line">{service.description}</p>
              
              {/* פרטים נוספים */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">פרטים נוספים</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-brand-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">משך זמן</p>
                      <p className="font-medium">{service.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-brand-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">זמינות</p>
                      <p className="font-medium">כל ימות השבוע</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-brand-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">סוג אירוע</p>
                      <p className="font-medium">כל סוגי האירועים</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-brand-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">אזור פעילות</p>
                      <p className="font-medium">כל הארץ</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* קטגוריות */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">קטגוריות</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge>מופעים</Badge>
                  <Badge>אמני במה</Badge>
                  <Badge>קריאת מחשבות</Badge>
                  <Badge>בידור</Badge>
                </div>
              </div>
              
              {/* אודות הספק */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">אודות הספק</h3>
                <div className="flex items-start mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden mr-4 flex-shrink-0">
                    <img 
                      src={service.provider.logo_url} 
                      alt={service.provider.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">{service.provider.name}</h4>
                    <p className="text-gray-600">{service.provider.description}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">{service.provider.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">{service.provider.email}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* תיבת הזמנה */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">מחיר</h3>
                <p className="text-2xl font-bold text-brand-600 mb-4">{service.price_range}</p>
                <p className="text-gray-600 mb-6">המחיר כולל את כל הציוד הנדרש למופע</p>
                <Button 
                  className="w-full mb-4" 
                  size="lg"
                  onClick={handleBookNow}
                >
                  הזמינו עכשיו
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="lg"
                  onClick={handleContactProvider}
                >
                  יצירת קשר עם הספק
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetails;
