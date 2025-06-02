
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderSummaryPage from "@/components/confirmation/OrderSummaryPage";
import BookingSuccess from "@/components/confirmation/BookingSuccess";
import EmailConfirmation from "@/components/confirmation/EmailConfirmation";
import CalendarIntegration from "@/components/confirmation/CalendarIntegration";
import { Button } from "@/components/ui/button";
import { Home, Download, Share, Calendar } from "lucide-react";

const BookingConfirmationPage = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<any>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // טעינת נתוני ההזמנה מ-sessionStorage
    const savedBookingData = sessionStorage.getItem('bookingData');
    if (savedBookingData) {
      const data = JSON.parse(savedBookingData);
      setBookingData(data);
      
      // הצגת אנימציית הצלחה אחרי רגע
      setTimeout(() => {
        setShowSuccess(true);
      }, 500);
    } else {
      // אם אין נתונים, חזרה לדף הבית
      navigate('/');
    }
  }, [bookingId, navigate]);

  const handleDownloadConfirmation = () => {
    // יצירת PDF של אישור ההזמנה
    console.log('Downloading booking confirmation...');
  };

  const handleShareBooking = () => {
    // שיתוף ההזמנה
    if (navigator.share) {
      navigator.share({
        title: `אישור הזמנה - ${bookingData?.service?.name}`,
        text: `הזמנתי את השירות ${bookingData?.service?.name} דרך תכלס`,
        url: window.location.href
      });
    }
  };

  const handleAddToCalendar = () => {
    // הוספה ליומן
    const event = {
      title: `${bookingData?.service?.name} - ${bookingData?.provider?.businessName}`,
      start: new Date(`${bookingData?.eventDate}T${bookingData?.eventTime}`),
      description: `שירות: ${bookingData?.service?.name}\nספק: ${bookingData?.provider?.businessName}\nמיקום: ${bookingData?.eventLocation}`
    };
    
    // יצירת קישור ליומן Google
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(event.description)}`;
    window.open(googleCalendarUrl, '_blank');
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">טוען פרטי הזמנה...</h2>
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
        <div className="container px-4 max-w-4xl mx-auto">
          {/* הודעת הצלחה */}
          {showSuccess && (
            <BookingSuccess
              bookingId={bookingId!}
              service={bookingData.service}
              provider={bookingData.provider}
            />
          )}

          {/* סיכום ההזמנה */}
          <OrderSummaryPage bookingData={bookingData} />

          {/* אינטגרציות */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <EmailConfirmation
              customerEmail={bookingData.customerEmail}
              bookingId={bookingId!}
            />
            
            <CalendarIntegration
              eventData={{
                title: `${bookingData.service.name} - ${bookingData.provider.businessName}`,
                date: bookingData.eventDate,
                time: bookingData.eventTime,
                location: bookingData.eventLocation
              }}
              onAddToCalendar={handleAddToCalendar}
            />
          </div>

          {/* פעולות */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={() => navigate('/')}
              className="flex items-center bg-brand-600 hover:bg-brand-700"
            >
              <Home className="h-4 w-4 ml-2" />
              חזרה לדף הבית
            </Button>

            <Button
              variant="outline"
              onClick={handleDownloadConfirmation}
              className="flex items-center"
            >
              <Download className="h-4 w-4 ml-2" />
              הורד אישור
            </Button>

            <Button
              variant="outline"
              onClick={handleShareBooking}
              className="flex items-center"
            >
              <Share className="h-4 w-4 ml-2" />
              שתף
            </Button>

            <Button
              variant="outline"
              onClick={handleAddToCalendar}
              className="flex items-center"
            >
              <Calendar className="h-4 w-4 ml-2" />
              הוסף ליומן
            </Button>
          </div>

          {/* הודעת תודה */}
          <div className="text-center mt-8 p-6 bg-white rounded-lg shadow-sm border">
            <h2 className="text-2xl font-bold text-brand-600 mb-2">
              תודה שבחרת בתכלס! 🎉
            </h2>
            <p className="text-gray-600">
              ההזמנה שלך התקבלה בהצלחה. נציג הספק יצור איתך קשר בקרוב לתיאום פרטים נוספים.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingConfirmationPage;
