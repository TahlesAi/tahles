
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CalendarIcon, GlobeIcon, MessageSquareIcon, Settings2Icon, StarIcon } from "lucide-react";

// Mock data
const upcomingBookings = [
  {
    id: "b1",
    serviceName: "Live Band Performance",
    providerName: "Melody Makers Band",
    date: "2025-06-15",
    time: "19:00",
    status: "confirmed"
  },
  {
    id: "b2",
    serviceName: "Event Photography",
    providerName: "Visual Memories Photography",
    date: "2025-06-25",
    time: "14:00",
    status: "pending"
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-600">Welcome, {user.name}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button>
                <CalendarIcon className="h-4 w-4 mr-2" />
                View Calendar
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{upcomingBookings.length}</div>
                    <p className="text-sm text-gray-500">Next event on {upcomingBookings[0]?.date || "N/A"}</p>
                    <Button variant="link" asChild className="p-0 mt-2">
                      <Link to="/bookings">View all bookings</Link>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Recent Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">2</div>
                    <p className="text-sm text-gray-500">2 unread messages</p>
                    <Button variant="link" asChild className="p-0 mt-2">
                      <Link to="/messages">View all messages</Link>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Favorite Providers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">4</div>
                    <p className="text-sm text-gray-500">Saved for future reference</p>
                    <Button variant="link" asChild className="p-0 mt-2">
                      <Link to="/favorites">View favorites</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  {upcomingBookings.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingBookings.map((booking) => (
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
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant="outline" className="flex flex-col items-center justify-center h-24 text-center">
                      <GlobeIcon className="h-8 w-8 mb-2" />
                      <span>Browse Services</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center justify-center h-24 text-center">
                      <MessageSquareIcon className="h-8 w-8 mb-2" />
                      <span>Messages</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center justify-center h-24 text-center">
                      <CalendarIcon className="h-8 w-8 mb-2" />
                      <span>Calendar</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center justify-center h-24 text-center">
                      <Settings2Icon className="h-8 w-8 mb-2" />
                      <span>Settings</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>Your Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-500 py-12">
                    Full bookings view will be implemented in the next version.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-500 py-12">
                    Messaging center will be implemented in the next version.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="favorites">
              <Card>
                <CardHeader>
                  <CardTitle>Favorite Providers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-500 py-12">
                    Favorites management will be implemented in the next version.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-500 py-12">
                    Account settings will be implemented in the next version.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
