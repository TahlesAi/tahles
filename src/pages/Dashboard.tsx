
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TabContents from "@/components/dashboard/TabContents";

// Mock data
const upcomingBookings = [
  {
    id: "b1",
    serviceName: "Live Band Performance",
    providerName: "Melody Makers Band",
    date: "2025-06-15",
    time: "19:00",
    status: "confirmed" as const
  },
  {
    id: "b2",
    serviceName: "Event Photography",
    providerName: "Visual Memories Photography",
    date: "2025-06-25",
    time: "14:00",
    status: "pending" as const
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // In a real implementation, we would fetch the user from auth context
  const user = {
    name: "John Smith",
    email: "john.smith@example.com",
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
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              <TabContents 
                activeTab={activeTab} 
                upcomingBookings={upcomingBookings}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
