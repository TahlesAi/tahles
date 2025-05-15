
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

type DashboardHeaderProps = {
  userName: string;
};

const DashboardHeader = ({ userName }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8" dir="rtl">
      <div>
        <h1 className="text-3xl font-bold">לוח בקרה</h1>
        <p className="text-gray-600">ברוכים הבאים, {userName}</p>
      </div>
      <div className="mt-4 md:mt-0">
        <Button>
          <CalendarIcon className="h-4 w-4 ml-2" />
          צפייה בלוח שנה
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
