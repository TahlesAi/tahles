
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StatsCardProps = {
  title: string;
  count: number;
  subtitle: string;
  linkText: string;
  linkUrl: string;
};

const StatsCard = ({ title, count, subtitle, linkText, linkUrl }: StatsCardProps) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-lg font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold">{count}</div>
      <p className="text-sm text-gray-500">{subtitle}</p>
      <Button variant="link" asChild className="p-0 mt-2">
        <Link to={linkUrl}>{linkText}</Link>
      </Button>
    </CardContent>
  </Card>
);

type DashboardCardsProps = {
  upcomingBookings: Array<{
    id: string;
    date: string;
    serviceName: string;
    providerName: string;
    time: string;
    status: string;
  }>;
};

const DashboardCards = ({ upcomingBookings }: DashboardCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatsCard
        title="Upcoming Events"
        count={upcomingBookings.length}
        subtitle={`Next event on ${upcomingBookings[0]?.date || "N/A"}`}
        linkText="View all bookings"
        linkUrl="/bookings"
      />
      
      <StatsCard
        title="Recent Messages"
        count={2}
        subtitle="2 unread messages"
        linkText="View all messages"
        linkUrl="/messages"
      />
      
      <StatsCard
        title="Favorite Providers"
        count={4}
        subtitle="Saved for future reference"
        linkText="View favorites"
        linkUrl="/favorites"
      />
    </div>
  );
};

export default DashboardCards;
