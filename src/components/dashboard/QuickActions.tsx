
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, GlobeIcon, MessageSquareIcon, Settings2Icon } from "lucide-react";
import { Link } from "react-router-dom";

const QuickActions = () => {
  return (
    <Card dir="rtl">
      <CardHeader>
        <CardTitle>פעולות מהירות</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" asChild className="flex flex-col items-center justify-center h-24 text-center">
            <Link to="/search">
              <GlobeIcon className="h-8 w-8 mb-2" />
              <span>חיפוש שירותים</span>
            </Link>
          </Button>
          <Button variant="outline" asChild className="flex flex-col items-center justify-center h-24 text-center">
            <Link to="/messages">
              <MessageSquareIcon className="h-8 w-8 mb-2" />
              <span>הודעות</span>
            </Link>
          </Button>
          <Button variant="outline" asChild className="flex flex-col items-center justify-center h-24 text-center">
            <Link to="/bookings">
              <CalendarIcon className="h-8 w-8 mb-2" />
              <span>לוח שנה</span>
            </Link>
          </Button>
          <Button variant="outline" asChild className="flex flex-col items-center justify-center h-24 text-center">
            <Link to="/settings">
              <Settings2Icon className="h-8 w-8 mb-2" />
              <span>הגדרות</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
