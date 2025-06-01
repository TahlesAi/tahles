
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, CreditCard, User, Phone, Mail, Calendar, MapPin } from "lucide-react";
import { getServiceById, getProviderById } from '@/lib/unifiedMockData';
import { toast } from "sonner";

const BookingPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  
  const [service, setService] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    eventDate: '',
    eventTime: '',
    eventLocation: '',
    guestCount: '',
    specialRequests: '',
    paymentMethod: 'credit'
  });

  useEffect(() => {
    if (serviceId) {
      const serviceData = getServiceById(serviceId);
      if (serviceData) {
        setService(serviceData);
        const providerData = getProviderById(serviceData.providerId);
        setProvider(providerData);
      }
    }
  }, [serviceId]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // ולידציה בסיסית
    if (!formData.customerName || !formData.customerEmail || !formData.customerPhone) {
      toast.error("אנא מלא את כל השדות הנדרשים");
      return;
    }

    // כאן יהיה חיבור לבסיס הנתונים
    console.log('Booking data:', formData);
    
    toast.success("ההזמנה נשלחה בהצלחה!");
    
    // הפניה לעמוד אישור
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  if (!service || !provider) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">טוען פרטי הזמנה...</h2>
            <p className="text-gray-600">אנא המתן</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50" dir="rtl">
        <div className="container px-4 py-8">
          {/* כפתור חזרה */}
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowRight className="h-4 w-4" />
              חזרה
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* טופס הזמנה */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>פרטי ההזמנה</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* פרטים אישיים */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <User className="h-5 w-5" />
                        פרטים אישיים
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="customerName">שם מלא *</Label>
                          <Input
                            id="customerName"
                            value={formData.customerName}
                            onChange={(e) => handleInputChange('customerName', e.target.value)}
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="customerPhone">טלפון *</Label>
                          <Input
                            id="customerPhone"
                            type="tel"
                            value={formData.customerPhone}
                            onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="customerEmail">דוא"ל *</Label>
                        <Input
                          id="customerEmail"
                          type="email"
                          value={formData.customerEmail}
                          onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* פרטי האירוע */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        פרטי האירוע
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="eventDate">תאריך האירוע</Label>
                          <Input
                            id="eventDate"
                            type="date"
                            value={formData.eventDate}
                            onChange={(e) => handleInputChange('eventDate', e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="eventTime">שעת האירוע</Label>
                          <Input
                            id="eventTime"
                            type="time"
                            value={formData.eventTime}
                            onChange={(e) => handleInputChange('eventTime', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="eventLocation">מיקום האירוע</Label>
                          <Input
                            id="eventLocation"
                            value={formData.eventLocation}
                            onChange={(e) => handleInputChange('eventLocation', e.target.value)}
                            placeholder="כתובת מלאה"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="guestCount">מספר משתתפים</Label>
                          <Input
                            id="guestCount"
                            type="number"
                            value={formData.guestCount}
                            onChange={(e) => handleInputChange('guestCount', e.target.value)}
                            placeholder="50"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="specialRequests">בקשות מיוחדות</Label>
                        <Textarea
                          id="specialRequests"
                          value={formData.specialRequests}
                          onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                          placeholder="פרט כאן על בקשות מיוחדות או הערות..."
                          rows={4}
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* תשלום */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        אופן תשלום
                      </h3>
                      
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 space-x-reverse">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="credit"
                            checked={formData.paymentMethod === 'credit'}
                            onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                          />
                          <span>כרטיס אשראי</span>
                        </label>
                        
                        <label className="flex items-center space-x-2 space-x-reverse">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="bank"
                            checked={formData.paymentMethod === 'bank'}
                            onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                          />
                          <span>העברה בנקאית</span>
                        </label>
                      </div>
                    </div>

                    <Button type="submit" className="w-full">
                      בצע הזמנה
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* סיכום הזמנה */}
            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>סיכום הזמנה</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* פרטי השירות */}
                  <div>
                    <h4 className="font-semibold">{service.name}</h4>
                    <p className="text-sm text-gray-600">{provider.businessName}</p>
                  </div>
                  
                  <Separator />
                  
                  {/* מחיר */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>מחיר בסיס:</span>
                      <span>₪{service.price.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between font-semibold text-lg">
                      <span>סה"כ:</span>
                      <span>₪{service.price.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* פרטי קשר לתיאום */}
                  <div className="text-sm space-y-2">
                    <h5 className="font-medium">פרטי קשר לתיאום:</h5>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{provider.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>{provider.email}</span>
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
