
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
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

// Type for bookings from the database
type BookingFromDB = {
  id: string;
  customer_name: string;
  event_date: string;
  status: string;
  additional_requests?: string;
  services: {
    name: string;
  };
  providers: {
    name: string;
  };
  // Not required anymore since we're using nested objects:
  // service_id: string;
  // provider_id: string;
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
const fetchBookings = async (userId?: string) => {
  console.log("Fetching bookings for user:", userId);
  
  let query = supabase
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
  
  // אם יש משתמש מחובר, נסנן את ההזמנות לפי אימייל המשתמש
  if (userId) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('email')
      .eq('id', userId)
      .single();
    
    if (profile?.email) {
      query = query.eq('customer_email', profile.email);
    }
  }
  
  const { data, error } = await query;

  if (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }

  return data as BookingFromDB[];
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { user, isLoading: authLoading } = useAuth();
  
  // Fetch bookings using React Query
  const { data: bookingsData, isLoading: bookingsLoading, error } = useQuery({
    queryKey: ['bookings', user?.id],
    queryFn: () => fetchBookings(user?.id),
    enabled: !!user // רק אם המשתמש מחובר
  });

  // Process bookings data for UI
  const processedBookings: ProcessedBooking[] = bookingsData?.map(booking => ({
    id: booking.id,
    serviceName: booking.services?.name || "שירות לא ידוע",
    providerName: booking.providers?.name || "ספק לא ידוע",
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
  
  // אם המשתמש לא מחובר, הפנה ללוגין
  if (!authLoading && !user) {
    return <Navigate to="/" />;
  }
  
  // אם בתהליך טעינה של מצב ההתחברות, הצג סקלטון
  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-8">
          <div className="container px-4">
            <Skeleton className="h-12 w-40 mb-8" />
            <Skeleton className="h-8 w-full mb-6" />
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-32" />
                ))}
              </div>
              <Skeleton className="h-64" />
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
      <main className="flex-grow py-8">
        <div className="container px-4">
          <DashboardHeader userName={user?.user_metadata?.name || "משתמש"} />
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList dir="rtl" className="w-full flex justify-start overflow-x-auto">
              <TabsTrigger value="overview">סקירה כללית</TabsTrigger>
              <TabsTrigger value="bookings">הזמנות</TabsTrigger>
              <TabsTrigger value="messages">הודעות</TabsTrigger>
              <TabsTrigger value="favorites">מועדפים</TabsTrigger>
              <TabsTrigger value="settings">הגדרות</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              {bookingsLoading ? (
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
