
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">{booking.serviceName}</h3>
                  <p className="text-sm text-gray-600">by {booking.providerName}</p>
                  <p className="text-sm">
                    {new Date(booking.date).toLocaleDateString()} at {booking.time}
                  </p>
                </div>
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                    booking.status === "confirmed" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {booking.status === "confirmed" ? "Confirmed" : "Pending"}
                  </span>
                </div>
              </div>
            ))}
            <Button variant="outline" asChild className="w-full mt-4">
              <Link to="/bookings">View All Bookings</Link>
            </Button>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No upcoming bookings found</p>
            <Button asChild>
              <Link to="/search">Find Services</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingBookings;
