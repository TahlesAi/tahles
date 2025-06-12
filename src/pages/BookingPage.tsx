
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/booking/BookingForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, CreditCard, User, Phone, Mail, Calendar, MapPin } from "lucide-react";
import { getServiceById, getProviderById } from '@/lib/unifiedMockData';
import { toast } from "sonner";

const BookingPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  
  const [service, setService] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);

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
              <BookingForm />
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
                      <span>₪{service.price?.toLocaleString() || '0'}</span>
                    </div>
                    
                    <div className="flex justify-between font-semibold text-lg">
                      <span>סה"כ:</span>
                      <span>₪{service.price?.toLocaleString() || '0'}</span>
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
