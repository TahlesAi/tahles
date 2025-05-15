
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, GlobeIcon, MessageSquareIcon, Settings2Icon } from "lucide-react";

const QuickActions = () => {
  return (
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
  );
};

export default QuickActions;
