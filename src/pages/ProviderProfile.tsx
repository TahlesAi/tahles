
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Check, Clock, Globe, MapPin, MessageSquare, Phone, Star, Verified } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";

const ProviderProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("about");
  const [provider, setProvider] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<any>(null);
  
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
  };
  
  const handleSubmitBooking = () => {
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <Skeleton className="w-32 h-32 rounded-full mb-4" />
                      <Skeleton className="h-8 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-2/3 mb-4" />
                      <Skeleton className="h-4 w-1/2 mb-4" />
                      <Skeleton className="h-10 w-full mb-2" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="lg:col-span-2">
                <Skeleton className="aspect-video rounded-lg mb-4" />
                <div className="flex space-x-2 mb-6">
                  <Skeleton className="h-20 w-20" />
                  <Skeleton className="h-20 w-20" />
                  <Skeleton className="h-20 w-20" />
                </div>
                <Card>
                  <CardContent>
                    <Skeleton className="h-10 w-full mb-4" />
                    <Skeleton className="h-24 w-full mb-4" />
                    <Skeleton className="h-24 w-full" />
                  </CardContent>
                </Card>
              </div>
            </div>
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
            <h1 className="text-3xl font-bold mb-4">ספק לא נמצא</h1>
            <p className="text-gray-600 mb-6">
              לא הצלחנו למצוא את הספק המבוקש. אנא בדוק את הקישור ונסה שנית.
            </p>
            <Link to="/">
              <Button>חזרה לדף הבית</Button>
            </Link>
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
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                      <img 
                        src={provider.logo_url || "/placeholder.svg"} 
                        alt={provider.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h1 className="text-2xl font-bold flex items-center gap-2" dir="rtl">
                      {provider.name}
                    </h1>
                    <p className="text-gray-600 mb-4" dir="rtl">{provider.description && provider.description.substring(0, 80)}...</p>
                    <div className="flex items-center mb-4">
                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 font-medium">4.9</span>
                      <span className="text-gray-500 ml-1">(87 חוות דעת)</span>
                    </div>
                    
                    {provider.address && (
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 ml-2" />
                        <span dir="rtl">{provider.address}</span>
                      </div>
                    )}
                    
                    <div className="border-t w-full my-4"></div>
                    
                    <div className="space-y-4 w-full">
                      <Button className="w-full" dir="rtl">
                        <MessageSquare className="h-4 w-4 ml-2" />
                        צור קשר
                      </Button>
                      <Button variant="outline" className="w-full" dir="rtl">
                        <Calendar className="h-4 w-4 ml-2" />
                        בדוק זמינות
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3 text-right">מידע נוסף</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="text-right">
                        <p className="text-sm font-medium">דוא"ל</p>
                        <p className="text-sm text-gray-600" dir="ltr">{provider.email || 'לא צוין'}</p>
                      </div>
                      <Globe className="h-5 w-5 text-gray-500 mr-auto ml-3 mt-0.5" />
                    </div>
                    
                    {provider.phone && (
                      <div className="flex items-start">
                        <div className="text-right">
                          <p className="text-sm font-medium">טלפון</p>
                          <p className="text-sm text-gray-600" dir="ltr">{provider.phone}</p>
                        </div>
                        <Phone className="h-5 w-5 text-gray-500 mr-auto ml-3 mt-0.5" />
                      </div>
                    )}
                    
                    {provider.website && (
                      <div className="flex items-start">
                        <div className="text-right">
                          <p className="text-sm font-medium">אתר</p>
                          <a href={provider.website.startsWith('http') ? provider.website : `https://${provider.website}`} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="text-sm text-blue-600 hover:underline" dir="ltr">
                            {provider.website}
                          </a>
                        </div>
                        <Globe className="h-5 w-5 text-gray-500 mr-auto ml-3 mt-0.5" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* תוכן ראשי */}
            <div className="lg:col-span-2 space-y-6">
              {/* גלריית תמונות */}
              <div className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img 
                    src={activeImage || provider.logo_url || "/placeholder.svg"} 
                    alt={provider.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                {allImages.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto pb-2" dir="rtl">
                    {allImages.map((image, index) => (
                      <div 
                        key={index}
                        className={`h-20 w-32 rounded-md overflow-hidden cursor-pointer border-2 ${
                          activeImage === image ? "border-brand-500" : "border-transparent"
                        }`}
                        onClick={() => setActiveImage(image)}
                      >
                        <img 
                          src={image} 
                          alt={`${provider.name} ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* טאבים */}
              <Card>
                <CardContent className="p-0">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" dir="rtl">
                    <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-auto p-0">
                      <TabsTrigger 
                        value="about" 
                        className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-500 data-[state=active]:shadow-none py-3 px-6"
                      >
                        אודות
                      </TabsTrigger>
                      <TabsTrigger 
                        value="services" 
                        className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-500 data-[state=active]:shadow-none py-3 px-6"
                      >
                        שירותים
                      </TabsTrigger>
                      <TabsTrigger 
                        value="reviews" 
                        className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-500 data-[state=active]:shadow-none py-3 px-6"
                      >
                        חוות דעת
                      </TabsTrigger>
                      <TabsTrigger 
                        value="booking" 
                        className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-500 data-[state=active]:shadow-none py-3 px-6"
                      >
                        זמינות והזמנה
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="about" className="p-6 text-right" dir="rtl">
                      <h2 className="text-2xl font-bold mb-4">אודות {provider.name}</h2>
                      <p className="mb-6">{provider.description}</p>
                      
                      {provider.name === "נטע ברסלר" && (
                        <>
                          <h3 className="text-xl font-semibold mb-3">מה אנו מציעים</h3>
                          <ul className="list-disc pr-5 space-y-2 mb-6">
                            <li>מופעי קריאת מחשבות אינטראקטיביים לכל סוג של אירוע</li>
                            <li>קסמים אישיים בין שולחנות האירוע</li>
                            <li>התאמה אישית של המופע לאופי האירוע והלקוח</li>
                            <li>ניסיון של מעל 15 שנה בהופעה במגוון אירועים</li>
                            <li>שילוב הומור וריגושים למופע בלתי נשכח</li>
                          </ul>
                          
                          <h3 className="text-xl font-semibold mb-3">הניסיון שלנו</h3>
                          <p>
                            עם ניסיון של יותר מעשור בהופעה באירועים רבים, אנו מביאים מקצועיות ומצוינות לכל מופע. 
                            נטע ברסלר הופיע במגוון אירועים מחתונות ועד מסיבות חברה, והוא ידוע ביכולתו המרשימה 
                            להפוך כל אירוע למיוחד.
                          </p>
                        </>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="services" className="p-6 text-right" dir="rtl">
                      <h2 className="text-2xl font-bold mb-4">שירותים וחבילות</h2>
                      <p className="mb-6">
                        אנו מציעים מגוון שירותים המותאמים לצרכים הספציפיים של האירוע שלך.
                      </p>
                      
                      <div className="space-y-4">
                        {services.length > 0 ? (
                          services.map((service, index) => (
                            <Card key={index}>
                              <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                                  <div>
                                    <h3 className="text-lg font-semibold">{service.name}</h3>
                                    <p className="text-gray-600">{service.description}</p>
                                    {service.duration && (
                                      <div className="flex items-center mt-2 text-sm text-gray-500">
                                        <Clock className="h-4 w-4 ml-1" />
                                        {service.duration}
                                      </div>
                                    )}
                                  </div>
                                  <div className="mt-4 md:mt-0 flex flex-col items-end">
                                    <span className="text-xl font-bold mb-2">{service.price_range}</span>
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button onClick={() => handleBookService(service)}>הזמן עכשיו</Button>
                                      </DialogTrigger>
                                      <DialogContent className="sm:max-w-[425px]" dir="rtl">
                                        <DialogHeader>
                                          <DialogTitle>הזמנת שירות: {service.name}</DialogTitle>
                                        </DialogHeader>
                                        <div className="py-4">
                                          <p className="mb-4 text-right">לאחר שליחת הטופס, נציג יצור איתך קשר לתיאום הפרטים הסופיים והתשלום.</p>
                                          
                                          <div className="space-y-4">
                                            <div>
                                              <label className="block text-sm font-medium mb-1">שם מלא</label>
                                              <input 
                                                type="text" 
                                                className="w-full p-2 border rounded-md" 
                                                placeholder="הכנס את שמך המלא"
                                              />
                                            </div>
                                            
                                            <div>
                                              <label className="block text-sm font-medium mb-1">טלפון</label>
                                              <input 
                                                type="tel" 
                                                className="w-full p-2 border rounded-md" 
                                                placeholder="הכנס את מספר הטלפון שלך"
                                              />
                                            </div>
                                            
                                            <div>
                                              <label className="block text-sm font-medium mb-1">תאריך האירוע</label>
                                              <input 
                                                type="date" 
                                                className="w-full p-2 border rounded-md" 
                                              />
                                            </div>
                                            
                                            <div>
                                              <label className="block text-sm font-medium mb-1">הערות נוספות</label>
                                              <textarea 
                                                className="w-full p-2 border rounded-md" 
                                                rows={3}
                                                placeholder="פרטים נוספים לגבי ההזמנה"
                                              ></textarea>
                                            </div>
                                            
                                            <Button 
                                              className="w-full" 
                                              onClick={handleSubmitBooking}
                                            >
                                              שלח בקשת הזמנה
                                            </Button>
                                          </div>
                                        </div>
                                      </DialogContent>
                                    </Dialog>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <p className="text-gray-500">לא נמצאו שירותים זמינים כרגע.</p>
                        )}
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">חבילות מותאמות אישית</h3>
                        <p className="mb-4">
                          צריך משהו ספציפי לאירוע שלך? צור איתנו קשר כדי ליצור חבילה מותאמת אישית לדרישות המדויקות שלך.
                        </p>
                        <Button variant="outline">
                          <MessageSquare className="h-4 w-4 ml-2" />
                          בקש הצעת מחיר מותאמת אישית
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="reviews" className="p-6 text-right" dir="rtl">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <div className="flex items-center ml-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className="h-5 w-5 text-yellow-400 fill-yellow-400" 
                              />
                            ))}
                          </div>
                          <span className="font-medium">4.9</span>
                          <span className="text-gray-500 mr-1">(87)</span>
                        </div>
                        <h2 className="text-2xl font-bold">חוות דעת</h2>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="border-b pb-6">
                          <div className="flex justify-between mb-2">
                            <div className="text-gray-500 text-sm">
                              18 באפריל, 2025
                            </div>
                            <div className="font-semibold">שרה כהן</div>
                          </div>
                          <div className="flex mb-2 justify-end">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className="h-4 w-4 text-yellow-400 fill-yellow-400"
                              />
                            ))}
                          </div>
                          <p>פשוט מדהים! הופיע בחתונה שלנו והיה פנומנלי. האורחים לא מפסיקים לדבר על כמה המופע היה מרשים. ממליצה בחום!</p>
                        </div>
                        
                        <div className="border-b pb-6">
                          <div className="flex justify-between mb-2">
                            <div className="text-gray-500 text-sm">
                              22 במרץ, 2025
                            </div>
                            <div className="font-semibold">מיכאל לוי</div>
                          </div>
                          <div className="flex mb-2 justify-end">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className="h-4 w-4 text-yellow-400 fill-yellow-400"
                              />
                            ))}
                          </div>
                          <p>הזמנו אותו לאירוע חברה והוא היה מקצועי ביותר. תקשורת מצוינת לפני האירוע, הגיע בזמן, והציג מופע יוצא מן הכלל.</p>
                        </div>
                        
                        <div className="border-b pb-6">
                          <div className="flex justify-between mb-2">
                            <div className="text-gray-500 text-sm">
                              5 במרץ, 2025
                            </div>
                            <div className="font-semibold">יסמין אברהם</div>
                          </div>
                          <div className="flex mb-2 justify-end">
                            {[1, 2, 3, 4].map((star) => (
                              <Star 
                                key={star} 
                                className="h-4 w-4 text-yellow-400 fill-yellow-400"
                              />
                            ))}
                            <Star 
                              className="h-4 w-4 text-gray-300"
                            />
                          </div>
                          <p>מופע טוב מאוד עם רפרטואר רחב. הם נענו לבקשות שלנו והשאירו את האנרגיה גבוהה לאורך כל הערב. הבעיה היחידה הייתה שההתארגנות לקחה קצת יותר זמן ממה שציפינו.</p>
                        </div>
                      </div>
                      
                      <div className="text-center mt-6">
                        <Button variant="outline">
                          טען עוד חוות דעת
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="booking" className="p-6 text-right" dir="rtl">
                      <h2 className="text-2xl font-bold mb-4">זמינות והזמנה</h2>
                      <p className="mb-6">
                        להלן שעות הזמינות הכלליות שלנו. לתאריכים ספציפיים, אנא צרו קשר או בדקו את יומן ההזמנות שלנו.
                      </p>
                      
                      <Table className="mb-8">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-right">יום</TableHead>
                            <TableHead className="text-right">שעות פעילות</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">ראשון</TableCell>
                            <TableCell>9:00 - 18:00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">שני</TableCell>
                            <TableCell>9:00 - 18:00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">שלישי</TableCell>
                            <TableCell>9:00 - 18:00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">רביעי</TableCell>
                            <TableCell>9:00 - 18:00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">חמישי</TableCell>
                            <TableCell>9:00 - 22:00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">שישי</TableCell>
                            <TableCell>10:00 - 16:00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">שבת</TableCell>
                            <TableCell>סגור</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-2">הזמן תאריך</h3>
                        <p className="mb-4">
                          מוכנים להבטיח את השירותים שלנו לאירוע שלך? בדקו את היומן שלנו לתאריכים זמינים או צרו קשר ישירות.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button>
                            <Calendar className="h-4 w-4 ml-2" />
                            צפה בלוח שנה
                          </Button>
                          <Button variant="outline">
                            <Phone className="h-4 w-4 ml-2" />
                            צור קשר לבדיקת זמינות
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProviderProfile;
