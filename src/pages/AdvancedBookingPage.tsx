
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingWizard from "@/components/booking/BookingWizard";
import ServiceSummary from "@/components/booking/ServiceSummary";
import BookingTimer from "@/components/booking/BookingTimer";
import { useEventContext } from "@/context/EventContext";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingData {
  // פרטי לקוח
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  
  // פרטי אירוע
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  attendeesCount: number;
  eventType: 'private' | 'business';
  
  // בקשות מיוחדות
  specialRequests: string;
  accessibilityNeeds: string;
  cateringRequests: string;
  
  // פרטי תיאום
  contactPerson: string;
  contactPhone: string;
  setupTime: string;
  
  // תשלום
  paymentMethod: 'credit' | 'paypal' | 'bit' | 'bank_transfer' | 'check';
  agreeToTerms: boolean;
  agreeToCancellation: boolean;
  
  // נוספים
  selectedUpsells: string[];
  parkingInfo: string;
  additionalServices: any[];
}

const AdvancedBookingPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { services, providers } = useEventContext();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    customerCity: '',
    eventDate: '',
    eventTime: '',
    eventLocation: '',
    attendeesCount: 50,
    eventType: 'private',
    specialRequests: '',
    accessibilityNeeds: '',
    cateringRequests: '',
    contactPerson: '',
    contactPhone: '',
    setupTime: '',
    paymentMethod: 'credit',
    agreeToTerms: false,
    agreeToCancellation: false,
    selectedUpsells: [],
    parkingInfo: '',
    additionalServices: []
  });

  const [timeReservation, setTimeReservation] = useState<Date | null>(null);
  const [reservationExpiry, setReservationExpiry] = useState<Date | null>(null);

  const service = services.find(s => s.id === serviceId);
  const provider = service ? providers.find(p => p.id === service.providerId) : null;

  useEffect(() => {
    // נעילת זמינות ל-15 דקות
    const now = new Date();
    const expiry = new Date(now.getTime() + 15 * 60 * 1000);
    setTimeReservation(now);
    setReservationExpiry(expiry);

    // מילוי נתונים מחיפוש קודם אם יש
    const searchParams = new URLSearchParams(location.search);
    const fromRecommended = searchParams.get('from') === 'recommended';
    if (fromRecommended) {
      // מילוי אוטומטי מנתוני החיפוש הקודם
      const savedSearchData = sessionStorage.getItem('searchCriteria');
      if (savedSearchData) {
        const criteria = JSON.parse(savedSearchData);
        setBookingData(prev => ({
          ...prev,
          eventDate: criteria.eventDate || '',
          eventTime: criteria.eventTime || '',
          eventLocation: criteria.location || '',
          attendeesCount: criteria.attendeesCount || 50,
          eventType: criteria.eventType || 'private'
        }));
      }
    }
  }, [location.search]);

  const handleBookingUpdate = (updates: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...updates }));
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate(-1);
    }
  };

  const handleBookingComplete = () => {
    // עיבוד ההזמנה והמשך לדף אישור
    const bookingId = `booking_${Date.now()}`;
    sessionStorage.setItem('bookingData', JSON.stringify({
      ...bookingData,
      service,
      provider,
      bookingId,
      bookingDate: new Date().toISOString()
    }));
    
    navigate(`/booking-confirmation/${bookingId}`);
  };

  if (!service || !provider) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">שירות לא נמצא</h2>
            <Button onClick={() => navigate(-1)}>חזרה</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow py-8" dir="rtl">
        <div className="container px-4 max-w-7xl mx-auto">
          {/* כותרת עם טיימר */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              {currentStep > 1 ? 'שלב קודם' : 'חזור'}
            </Button>

            <h1 className="text-3xl font-bold text-gray-900">הזמנת שירות</h1>

            {reservationExpiry && (
              <BookingTimer 
                expiryTime={reservationExpiry}
                onExpire={() => {
                  alert('זמן ההזמנה פג. אנא התחל מחדש.');
                  navigate(-1);
                }}
              />
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* טופס הזמנה */}
            <div className="lg:col-span-2">
              <BookingWizard
                currentStep={currentStep}
                bookingData={bookingData}
                service={service}
                provider={provider}
                onUpdate={handleBookingUpdate}
                onStepChange={handleStepChange}
                onComplete={handleBookingComplete}
              />
            </div>

            {/* סיכום שירות */}
            <div className="lg:col-span-1">
              <ServiceSummary
                service={service}
                provider={provider}
                bookingData={bookingData}
                currentStep={currentStep}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdvancedBookingPage;
