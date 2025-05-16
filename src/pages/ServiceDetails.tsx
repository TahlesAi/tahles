
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { CalendarIcon, Clock, MapPin, Users, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("12:00");
  const [audience, setAudience] = useState<number>(20);

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", 
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
  ];

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      
      // במקרה שאין עדיין חיבור לסופאבייס, נשתמש בדאטה לדוגמה
      // בעתיד יש להחליף זאת בשאילתה אמיתית
      if (id === "demo") {
        setService({
          id: "demo",
          name: "נטע ברסלר - אמן המחשבות",
          description: "מופע קסמים וקריאת מחשבות אינטראקטיבי שישאיר את האורחים שלכם בהלם מוחלט! מופע של שעה הכולל טלפתיה, קסמי חושים וטריקים מדהימים.",
          price_range: "₪1,500 - ₪3,000",
          duration: "60 דקות",
          provider_name: "נטע ברסלר",
          provider_image: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=400&auto=format&fit=crop",
          category: "מופעים",
          subcategory: "אמני חושים",
          audience_size: "עד 350 אנשים",
          age_range: "מבוגרים ובני נוער",
          location: "כל הארץ",
          images: [
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
            "https://images.unsplash.com/photo-1470020618177-f49a96241ae7?w=800",
            "https://images.unsplash.com/photo-1604948501466-4e9c339b9c24?w=800"
          ],
          reviews: [
            { id: "1", author: "דניאל כהן", rating: 5, content: "המופע היה מדהים, נטע הצליח להפתיע את כל האורחים!" },
            { id: "2", author: "מיכל לוי", rating: 5, content: "בחרנו בנטע למסיבת חברה והוא היה פשוט מושלם. מקצועי, מצחיק ומרתק." },
            { id: "3", author: "יוסי אברהם", rating: 4, content: "מופע מרשים שהתאים בדיוק לאווירה שחיפשנו. מומלץ בחום!" }
          ],
          features: [
            "מופע מותאם אישית לאופי האירוע",
            "כולל הגברה עצמית לעד 100 איש",
            "אפשרות להארכת משך המופע",
            "שילוב קטעים אישיים בתיאום מראש"
          ]
        });
        setLoading(false);
        return;
      }

      try {
        // כאן יש להוסיף שאילתה אמיתית לסופאבייס כשיהיה חיבור
        const { data, error } = await supabase
          .from('services')
          .select(`
            *,
            provider:providers(*)
          `)
          .eq('id', id)
          .single();

        if (error) throw error;
        
        if (data) {
          setService({
            ...data,
            provider_name: data.provider?.name || "ספק לא ידוע",
            provider_image: data.provider?.image_url || "https://via.placeholder.com/100",
            images: data.images || [],
            reviews: [],
            features: data.features?.split(',') || []
          });
        }
      } catch (error) {
        console.error("Error fetching service:", error);
        toast({
          title: "שגיאה בטעינת השירות",
          description: "לא ניתן לטעון את פרטי השירות, אנא נסה שוב מאוחר יותר",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id, toast]);

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "שגיאה",
        description: "יש לבחור תאריך ושעה לפני ביצוע ההזמנה",
        variant: "destructive"
      });
      return;
    }

    // אחסן את פרטי ההזמנה ועבור למסך הזמנה
    const bookingDetails = {
      serviceId: service.id,
      serviceName: service.name,
      providerName: service.provider_name,
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: selectedTime,
      audience: audience
    };

    // שמירת פרטי ההזמנה בלוקאל סטורג' זמנית (או בסטייט גלובלי בהמשך)
    localStorage.setItem('currentBooking', JSON.stringify(bookingDetails));
    
    toast({
      title: "הזמנה התחילה",
      description: "אנא השלם את פרטי ההזמנה בדף הבא",
    });

    // נווט למסך ההזמנה (יוצר בשלב מאוחר יותר)
    navigate(`/booking/${service.id}`, { state: bookingDetails });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow p-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">השירות לא נמצא</h1>
            <p className="mb-6">לא ניתן למצוא את השירות המבוקש.</p>
            <Button onClick={() => navigate('/search')}>חזרה לחיפוש</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-4" dir="rtl">
        <div className="container mx-auto">
          {/* פרטי שירות וגלריה */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* גלריית תמונות */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <img 
                    src={service.images[0] || "https://via.placeholder.com/800x450?text=אין+תמונה"} 
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {service.images.slice(1, 4).map((image: string, index: number) => (
                  <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                    <img 
                      src={image}
                      alt={`${service.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* פרטי שירות וכפתור הזמנה */}
            <div className="lg:col-span-1">
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-2xl">{service.name}</CardTitle>
                  <CardDescription className="text-lg font-medium mt-1">
                    {service.price_range}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow">
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 ml-2" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 ml-2" />
                    <span>{service.audience_size}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 ml-2" />
                    <span>{service.location}</span>
                  </div>

                  <div className="pt-4">
                    <h4 className="font-medium mb-2">תכונות המוצר:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mt-1 ml-2" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleBooking}
                    className="w-full"
                    size="lg"
                  >
                    הזמנה עכשיו
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          
          {/* תיאור מפורט ומידע נוסף */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="description">
                <TabsList className="grid grid-cols-3 w-full mb-6">
                  <TabsTrigger value="description">תיאור</TabsTrigger>
                  <TabsTrigger value="provider">על הספק</TabsTrigger>
                  <TabsTrigger value="reviews">חוות דעת</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="p-4 border rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">תיאור השירות</h2>
                  <p className="whitespace-pre-line">{service.description}</p>
                </TabsContent>
                <TabsContent value="provider" className="p-4 border rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden ml-4">
                      <img 
                        src={service.provider_image} 
                        alt={service.provider_name}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{service.provider_name}</h2>
                      <p className="text-gray-600">{service.category} - {service.subcategory}</p>
                    </div>
                  </div>
                  <p>מידע נוסף על הספק יוצג כאן.</p>
                </TabsContent>
                <TabsContent value="reviews" className="p-4 border rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">חוות דעת</h2>
                  {service.reviews && service.reviews.length > 0 ? (
                    <div className="space-y-4">
                      {service.reviews.map((review: any) => (
                        <div key={review.id} className="border-b pb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{review.author}</span>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <span key={i} className={`text-lg ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700">{review.content}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-4">אין עדיין חוות דעת לשירות זה</p>
                  )}
                </TabsContent>
              </Tabs>
            </div>
            
            {/* אזור בחירת תאריך ושעה */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>בחירת תאריך ושעה</CardTitle>
                  <CardDescription>בחר את התאריך והשעה הרצויים</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="mb-2 text-sm font-medium">תאריך</h3>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="border rounded-md"
                      disabled={{ before: new Date() }}
                    />
                  </div>
                  <div className="pt-4">
                    <h3 className="mb-2 text-sm font-medium">שעה</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <Button 
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          className="text-sm py-1"
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4">
                    <h3 className="mb-2 text-sm font-medium">מספר משתתפים</h3>
                    <div className="flex items-center">
                      <Button 
                        variant="outline"
                        size="icon"
                        onClick={() => setAudience(prev => Math.max(1, prev - 5))}
                      >
                        -
                      </Button>
                      <span className="mx-4 text-lg font-medium">{audience}</span>
                      <Button 
                        variant="outline"
                        size="icon"
                        onClick={() => setAudience(prev => Math.min(500, prev + 5))}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleBooking}>
                    המשך להזמנה
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetails;
