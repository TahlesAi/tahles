
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

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
  unreadMessages?: number;
  favoriteProviders?: number;
};

const DashboardCards = ({ 
  upcomingBookings, 
  unreadMessages = 2, 
  favoriteProviders = 4 
}: DashboardCardsProps) => {
  // Format the next event date for display
  let nextEventText = "N/A";
  
  if (upcomingBookings.length > 0) {
    try {
      const nextEvent = upcomingBookings[0];
      const dateObj = new Date(nextEvent.date);
      nextEventText = format(dateObj, "dd/MM/yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatsCard
        title="אירועים הקרובים"
        count={upcomingBookings.length}
        subtitle={`האירוע הבא: ${nextEventText}`}
        linkText="צפייה בכל ההזמנות"
        linkUrl="/bookings"
      />
      
      <StatsCard
        title="הודעות חדשות"
        count={unreadMessages}
        subtitle="2 הודעות שלא נקראו"
        linkText="צפייה בכל ההודעות"
        linkUrl="/messages"
      />
      
      <StatsCard
        title="ספקים מועדפים"
        count={favoriteProviders}
        subtitle="שמורים לשימוש עתידי"
        linkText="צפייה במועדפים"
        linkUrl="/favorites"
      />
    </div>
  );
};

export default DashboardCards;
