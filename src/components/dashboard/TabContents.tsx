
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardCards from "./DashboardCards";
import UpcomingBookings from "./UpcomingBookings";
import QuickActions from "./QuickActions";

type BookingType = {
  id: string;
  serviceName: string;
  providerName: string;
  date: string;
  time: string;
  status: "confirmed" | "pending";
};

interface TabContentsProps {
  activeTab: string;
  upcomingBookings: BookingType[];
}

const EmptyTabContent = ({ title }: { title: string }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-center text-gray-500 py-12">
        {title} will be implemented in the next version.
      </p>
    </CardContent>
  </Card>
);

const TabContents = ({ activeTab, upcomingBookings }: TabContentsProps) => {
  if (activeTab === "overview") {
    return (
      <div className="space-y-6">
        <DashboardCards upcomingBookings={upcomingBookings} />
        <UpcomingBookings bookings={upcomingBookings} />
        <QuickActions />
      </div>
    );
  }

  const tabTitles: Record<string, string> = {
    bookings: "Your Bookings",
    messages: "Messages",
    favorites: "Favorite Providers",
    settings: "Account Settings"
  };

  return <EmptyTabContent title={tabTitles[activeTab] || "Content"} />;
};

export default TabContents;
