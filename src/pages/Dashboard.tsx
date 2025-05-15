
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TabContents from "@/components/dashboard/TabContents";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";

// Type for bookings from the database
type BookingFromDB = {
  id: string;
  customer_name: string;
  event_date: string;
  status: string;
  service_id: string;
  provider_id: string;
  additional_requests?: string;
  service?: {
    name: string;
  };
  provider?: {
    name: string;
  };
};

// Processed booking type for UI
type ProcessedBooking = {
  id: string;
  serviceName: string;
  providerName: string;
  date: string;
  time: string;
  status: "confirmed" | "pending";
};

// Function to fetch bookings from Supabase
const fetchBookings = async () => {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      id, 
      customer_name, 
      event_date, 
      status,
      additional_requests,
      services (name),
      providers (name)
    `)
    .order('event_date', { ascending: true })
    .limit(5);

  if (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }

  return data as BookingFromDB[];
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Fetch bookings using React Query
  const { data: bookingsData, isLoading, error } = useQuery({
    queryKey: ['bookings'],
    queryFn: fetchBookings
  });

  // Process bookings data for UI
  const processedBookings: ProcessedBooking[] = bookingsData?.map(booking => ({
    id: booking.id,
    serviceName: booking.service?.name || "שירות לא ידוע",
    providerName: booking.provider?.name || "ספק לא ידוע",
    date: booking.event_date,
    time: "19:00", // Default time since we don't store time in the DB
    status: booking.status as "confirmed" | "pending"
  })) || [];

  // Show error toast if fetch fails
  useEffect(() => {
    if (error) {
      toast({
        title: "שגיאה בטעינת הזמנות",
        description: "לא הצלחנו לטעון את ההזמנות שלך. אנא נסה שוב מאוחר יותר.",
        variant: "destructive"
      });
    }
  }, [error]);
  
  // In a real implementation, we would fetch the user from auth context
  const user = {
    name: "ישראל ישראלי",
    email: "israel@example.com",
    userType: "client",
    joinDate: "2025-05-01"
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8">
        <div className="container px-4">
          <DashboardHeader userName={user.name} />
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList dir="rtl" className="w-full flex justify-start overflow-x-auto">
              <TabsTrigger value="overview">סקירה כללית</TabsTrigger>
              <TabsTrigger value="bookings">הזמנות</TabsTrigger>
              <TabsTrigger value="messages">הודעות</TabsTrigger>
              <TabsTrigger value="favorites">מועדפים</TabsTrigger>
              <TabsTrigger value="settings">הגדרות</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              {isLoading ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-32" />
                    ))}
                  </div>
                  <Skeleton className="h-64" />
                  <Skeleton className="h-48" />
                </div>
              ) : (
                <TabContents 
                  activeTab={activeTab} 
                  upcomingBookings={processedBookings}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
