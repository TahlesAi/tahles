
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, MapPin, Calendar, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { format } from "date-fns";

interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  comments: string;
  paymentMethod: string;
}

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: "",
    email: "",
    phone: "",
    comments: "",
    paymentMethod: "creditCard"
  });

  // בדיקה האם יש נתונים בלוקיישן או בלוקאל סטורג'
  useEffect(() => {
    let details = location.state;
    
    if (!details) {
      // נסיון לקבל מידע מלוקאל סטורג'
      const storedData = localStorage.getItem('currentBooking');
      if (storedData) {
        try {
          details = JSON.parse(storedData);
        } catch (e) {
          console.error("Failed to parse stored booking data", e);
        }
      }
    }

    if (!details || !details.serviceId) {
      toast({
        title: "שגיאה",
        description: "לא נמצאו פרטי הזמנה. אנא נסה שוב.",
        variant: "destructive"
      });
      navigate(`/services/${id || 'demo'}`);
      return;
    }

    setBookingDetails(details);
  }, [id, location.state, navigate, toast]);

  // טיפול בשינוי שדות הטופס
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // טיפול בשינוי אמצעי תשלום
  const handlePaymentMethodChange = (method: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: method }));
  };

  // טיפול בשליחת הטופס
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // בדיקת תקינות בסיסית
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast({
        title: "שגיאה",
        description: "יש למלא את כל השדות הנדרשים",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // כאן תהיה קריאת API לביצוע ההזמנה
      // עבור המוקאפ נדמה תהליך של שליחת הזמנה
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // ניקוי הנתונים מהלוקאל סטורג'
      localStorage.removeItem('currentBooking');
      
      // הקפצת הודעת הצלחה
      toast({
        title: "ההזמנה בוצעה בהצלחה!",
        description: "פרטי ההזמנה נשלחו לדוא\"ל שלך",
      });
      
      setBookingComplete(true);
      
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast({
        title: "שגיאה בביצוע ההזמנה",
        description: "אירעה שגיאה בעת ביצוע ההזמנה. אנא נסה שוב מאוחר יותר.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!bookingDetails) {
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

  // תצוגת סיום הזמנה
  if (bookingComplete) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow p-4" dir="rtl">
          <div className="max-w-2xl mx-auto">
            <Card className="border-green-200 shadow-lg">
              <CardHeader className="text-center pb-2 bg-green-50">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-2" />
                <CardTitle className="text-2xl">ההזמנה הושלמה בהצלחה!</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <p className="text-center text-lg mb-6">תודה על הזמנתך! פרטי ההזמנה נשלחו לדוא"ל שלך.</p>
                  
                  <div className="border-t border-b py-4">
                    <h3 className="font-semibold mb-3">פרטי ההזמנה:</h3>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">שירות:</span>
                        <span className="font-medium">{bookingDetails.serviceName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ספק:</span>
                        <span>{bookingDetails.providerName}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">תאריך:</span>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 ml-1" />
                          <span>{format(new Date(bookingDetails.date), 'dd/MM/yyyy')}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">שעה:</span>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 ml-1" />
                          <span>{bookingDetails.time}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">מספר משתתפים:</span>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 ml-1" />
                          <span>{bookingDetails.audience}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-center text-sm text-gray-600 mt-6">
                    מספר הזמנה: {Math.floor(Math.random() * 100000)}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex-col space-y-2">
                <Button className="w-full" onClick={() => navigate('/')}>
                  חזרה לדף הבית
                </Button>
                <Button variant="outline" onClick={() => navigate('/dashboard')}>
                  לרשימת ההזמנות שלי
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // תצוגת טופס הזמנה
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-4" dir="rtl">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold mb-8 text-center">השלמת ההזמנה</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* טופס הזמנה */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>פרטי המזמין</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="fullName">שם מלא</Label>
                          <Input
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">טלפון</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email">דוא"ל</Label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="comments">הערות נוספות</Label>
                        <Input
                          id="comments"
                          name="comments"
                          value={formData.comments}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-3">בחירת אמצעי תשלום</h3>
                        <div className="grid grid-cols-3 gap-3">
                          <div
                            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                              formData.paymentMethod === 'creditCard'
                                ? 'bg-brand-50 border-brand-500'
                                : 'hover:bg-gray-50'
                            }`}
                            onClick={() => handlePaymentMethodChange('creditCard')}
                          >
                            <div className="text-center">
                              <div className="mb-2">💳</div>
                              <span className="text-sm">כרטיס אשראי</span>
                            </div>
                          </div>
                          
                          <div
                            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                              formData.paymentMethod === 'paypal'
                                ? 'bg-brand-50 border-brand-500'
                                : 'hover:bg-gray-50'
                            }`}
                            onClick={() => handlePaymentMethodChange('paypal')}
                          >
                            <div className="text-center">
                              <div className="mb-2">🅿️</div>
                              <span className="text-sm">PayPal</span>
                            </div>
                          </div>
                          
                          <div
                            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                              formData.paymentMethod === 'bit'
                                ? 'bg-brand-50 border-brand-500'
                                : 'hover:bg-gray-50'
                            }`}
                            onClick={() => handlePaymentMethodChange('bit')}
                          >
                            <div className="text-center">
                              <div className="mb-2">📱</div>
                              <span className="text-sm">Bit</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {formData.paymentMethod === 'creditCard' && (
                        <div className="space-y-4 border p-4 rounded-lg">
                          <p className="text-sm text-gray-500">פרטי אשראי לדוגמה בלבד</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="cardNumber">מספר כרטיס</Label>
                              <Input
                                id="cardNumber"
                                placeholder="1234 5678 9012 3456"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="expiry">תוקף</Label>
                                <Input
                                  id="expiry"
                                  placeholder="MM/YY"
                                />
                              </div>
                              <div>
                                <Label htmlFor="cvv">CVV</Label>
                                <Input
                                  id="cvv"
                                  placeholder="123"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/services/${id || 'demo'}`)}
                  >
                    חזרה
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "מעבד..." : "השלם הזמנה"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* סיכום הזמנה */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>סיכום הזמנה</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{bookingDetails.serviceName}</h3>
                      <p className="text-gray-600">{bookingDetails.providerName}</p>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 ml-2" />
                      <span>{format(new Date(bookingDetails.date), 'dd/MM/yyyy')}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 ml-2" />
                      <span>{bookingDetails.time}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="h-4 w-4 ml-2" />
                      <span>{bookingDetails.audience} משתתפים</span>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>מחיר בסיסי</span>
                        <span>₪2,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>הגברה (עד 100 איש)</span>
                        <span>₪300</span>
                      </div>
                      <div className="flex justify-between">
                        <span>הנחת הזמנה מוקדמת</span>
                        <span className="text-green-600">-₪200</span>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex justify-between text-lg font-semibold">
                      <span>סה"כ לתשלום</span>
                      <span>₪2,100</span>
                    </div>
                    
                    <div className="text-xs text-gray-500 mt-2">
                      * המחירים כוללים מע"מ
                    </div>
                  </div>
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

export default BookingPage;
