
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { CalendarIcon, Clock, MapPin, CheckCircle2, X } from "lucide-react";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import { mockSearchResults } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", 
  "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
];

const BookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [service, setService] = useState(mockSearchResults.find(s => s.id === id));
  const [isLoading, setIsLoading] = useState(true);
  
  // Form state
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [numGuests, setNumGuests] = useState(1);
  const [location, setLocation] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isAgreedToTerms, setIsAgreedToTerms] = useState(false);
  
  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  
  useEffect(() => {
    // Simulate loading service data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">השירות לא נמצא</h2>
            <p className="mb-6">לא הצלחנו למצוא את השירות המבוקש.</p>
            <Button onClick={() => navigate("/")}>חזרה לעמוד הראשי</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validate form
    const bookingSchema = z.object({
      date: z.date({
        required_error: "יש לבחור תאריך",
      }),
      time: z.string({
        required_error: "יש לבחור שעה",
      }),
      name: z.string().min(2, "יש להזין שם מלא"),
      phone: z.string().min(9, "יש להזין מספר טלפון תקין"),
      email: z.string().email("יש להזין כתובת אימייל תקינה"),
      location: service.location ? z.string().optional() : z.string().min(2, "יש להזין מיקום"),
      isAgreedToTerms: z.literal(true, {
        invalid_type_error: "יש לאשר את תנאי השימוש",
      }),
    });
    
    try {
      bookingSchema.parse({
        date,
        time,
        name,
        phone,
        email,
        location: service.location || location,
        isAgreedToTerms,
      });
      
      // Submit form
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setBookingComplete(true);
        window.scrollTo(0, 0);
        
        toast({
          title: "ההזמנה בוצעה בהצלחה",
          description: "תודה על הזמנתך! פרטים נשלחו לכתובת המייל שלך.",
        });
      }, 1500);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };
  
  if (bookingComplete) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container px-4 py-12">
          <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold mb-4">ההזמנה בוצעה בהצלחה!</h1>
            <p className="text-gray-600 mb-8">
              תודה על הזמנתך את {service.name}.<br />
              פרטי ההזמנה נשלחו לכתובת המייל {email}.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-8 text-right">
              <h3 className="font-semibold mb-2">פרטי ההזמנה:</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>שירות:</div>
                <div className="font-medium">{service.name}</div>
                
                <div>תאריך:</div>
                <div className="font-medium">{date && format(date, 'dd/MM/yyyy', { locale: he })}</div>
                
                <div>שעה:</div>
                <div className="font-medium">{time}</div>
                
                <div>מיקום:</div>
                <div className="font-medium">{service.location || location}</div>
                
                <div>מחיר:</div>
                <div className="font-medium">₪{service.price} {service.priceUnit}</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate("/")}>חזרה לעמוד הראשי</Button>
              <Button variant="outline" onClick={() => navigate("/dashboard")}>
                לדף האישי שלי
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-1">הזמנת שירות</h1>
            <p className="text-gray-600 mb-8">מלא את הפרטים הבאים להזמנת {service.name}</p>
            
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Booking Form */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <form onSubmit={handleSubmit}>
                    {/* Date and Time */}
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold mb-4">בחירת תאריך ושעה</h2>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Date Picker */}
                        <div className="flex-1">
                          <label className="block text-sm font-medium mb-1">תאריך</label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={`w-full justify-start text-right font-normal ${errors.date ? 'border-red-500' : ''}`}
                              >
                                <CalendarIcon className="ml-2 h-4 w-4" />
                                {date ? (
                                  format(date, 'PPP', { locale: he })
                                ) : (
                                  <span>בחר תאריך</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                                disabled={(date) => 
                                  date < new Date(new Date().setHours(0, 0, 0, 0))
                                }
                              />
                            </PopoverContent>
                          </Popover>
                          {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
                        </div>
                        
                        {/* Time Selector */}
                        <div className="flex-1">
                          <label className="block text-sm font-medium mb-1">שעה</label>
                          <div className="flex flex-wrap gap-2">
                            {timeSlots.map((slot) => (
                              <Button
                                key={slot}
                                type="button"
                                variant={time === slot ? "default" : "outline"}
                                className={`py-1 px-3 h-auto ${time === slot ? 'bg-brand-600' : ''}`}
                                onClick={() => setTime(slot)}
                              >
                                {slot}
                              </Button>
                            ))}
                          </div>
                          {errors.time && <p className="mt-1 text-sm text-red-500">{errors.time}</p>}
                        </div>
                      </div>
                    </div>
                    
                    {/* Contact Information */}
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold mb-4">פרטי איש קשר</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">שם מלא</label>
                          <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={errors.name ? 'border-red-500' : ''}
                          />
                          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">טלפון</label>
                          <Input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={errors.phone ? 'border-red-500' : ''}
                          />
                          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">אימייל</label>
                          <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={errors.email ? 'border-red-500' : ''}
                          />
                          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                        </div>
                      </div>
                    </div>
                    
                    {/* Event Details */}
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold mb-4">פרטי האירוע</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">מספר משתתפים</label>
                          <Input
                            type="number"
                            min="1"
                            value={numGuests}
                            onChange={(e) => setNumGuests(Number(e.target.value))}
                          />
                        </div>
                        
                        {!service.location && (
                          <div>
                            <label className="block text-sm font-medium mb-1">מיקום האירוע</label>
                            <Input
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              className={errors.location ? 'border-red-500' : ''}
                              placeholder="כתובת מדויקת"
                            />
                            {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
                          </div>
                        )}
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">בקשות מיוחדות</label>
                          <Textarea
                            value={specialRequests}
                            onChange={(e) => setSpecialRequests(e.target.value)}
                            placeholder="הוסף בקשות או הערות מיוחדות..."
                            rows={4}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Terms Agreement */}
                    <div className="mb-6">
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="terms"
                          checked={isAgreedToTerms}
                          onChange={(e) => setIsAgreedToTerms(e.target.checked)}
                          className={`mt-1 h-4 w-4 ${errors.isAgreedToTerms ? 'border-red-500' : ''}`}
                        />
                        <label htmlFor="terms" className="mr-2 text-sm">
                          אני מסכים/ה ל<a href="#" className="text-brand-600 underline">תנאי השימוש</a> ו<a href="#" className="text-brand-600 underline">מדיניות הפרטיות</a>
                        </label>
                      </div>
                      {errors.isAgreedToTerms && <p className="mt-1 text-sm text-red-500">{errors.isAgreedToTerms}</p>}
                    </div>
                    
                    {/* Submit Button */}
                    <div className="flex justify-end">
                      <Button 
                        type="submit" 
                        className="bg-brand-600 hover:bg-brand-700 px-8"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "מבצע הזמנה..." : "סיום הזמנה"}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
              
              {/* Booking Summary */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                  <h2 className="text-lg font-semibold border-b pb-3 mb-4">סיכום הזמנה</h2>
                  
                  <div className="flex items-start mb-4">
                    <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={service.imageUrl} 
                        alt={service.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="mr-3">
                      <h3 className="font-medium">{service.name}</h3>
                      <p className="text-sm text-gray-600">{service.provider}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-sm border-b pb-4 mb-4">
                    {date && (
                      <div className="flex">
                        <CalendarIcon className="h-4 w-4 ml-2 text-gray-500" />
                        <div>{format(date, 'PPP', { locale: he })}</div>
                      </div>
                    )}
                    
                    {time && (
                      <div className="flex">
                        <Clock className="h-4 w-4 ml-2 text-gray-500" />
                        <div>{time}</div>
                      </div>
                    )}
                    
                    {(service.location || location) && (
                      <div className="flex">
                        <MapPin className="h-4 w-4 ml-2 text-gray-500" />
                        <div>{service.location || location}</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2 border-b pb-4 mb-4">
                    <div className="flex justify-between">
                      <span>מחיר בסיס:</span>
                      <span>₪{service.price}</span>
                    </div>
                    {numGuests > 1 && service.priceUnit?.includes('למשתתף') && (
                      <div className="flex justify-between">
                        <span>{numGuests} משתתפים:</span>
                        <span>₪{service.price * numGuests}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between font-bold text-lg">
                    <span>סה"כ:</span>
                    <span>
                      ₪{service.priceUnit?.includes('למשתתף') 
                          ? service.price * numGuests 
                          : service.price}
                    </span>
                  </div>
                  
                  <div className="mt-4 text-xs text-gray-500">
                    * המחירים אינם כוללים מע"מ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingPage;
