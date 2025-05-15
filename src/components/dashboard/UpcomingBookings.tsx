
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parseISO } from "date-fns";
import { he } from "date-fns/locale";
import { CalendarIcon, Clock, MapPin } from "lucide-react";

type BookingProps = {
  id: string;
  serviceName: string;
  providerName: string;
  date: string;
  time: string;
  status: "confirmed" | "pending";
};

type UpcomingBookingsProps = {
  bookings: BookingProps[];
};

const UpcomingBookings = ({ bookings }: UpcomingBookingsProps) => {
  // Function to translate status to Hebrew
  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "מאושר";
      case "pending":
        return "ממתין לאישור";
      default:
        return status;
    }
  };

  // Function to get status style
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  // Function to format date in Hebrew
  const formatHebrewDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return format(date, "EEEE, d בMMMM yyyy", { locale: he });
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">ההזמנות הקרובות שלך</CardTitle>
      </CardHeader>
      <CardContent dir="rtl">
        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">{booking.serviceName}</h3>
                  <p className="text-sm text-gray-600">ע״י {booking.providerName}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <CalendarIcon className="h-4 w-4 ml-1" />
                    {formatHebrewDate(booking.date)}
                  </div>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <Clock className="h-4 w-4 ml-1" />
                    {booking.time}
                  </div>
                </div>
                <div className="mt-3 md:mt-0">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                    getStatusStyle(booking.status)
                  }`}>
                    {getStatusText(booking.status)}
                  </span>
                </div>
              </div>
            ))}
            <Button variant="outline" asChild className="w-full mt-4">
              <Link to="/bookings">צפייה בכל ההזמנות</Link>
            </Button>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">לא נמצאו הזמנות קרובות</p>
            <Button asChild>
              <Link to="/search">חיפוש שירותים</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingBookings;
