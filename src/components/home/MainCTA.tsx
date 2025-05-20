
import { Button } from "@/components/ui/button";
import { Search, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const MainCTA = () => {
  const navigate = useNavigate();
  
  const goToSearch = () => {
    navigate('/search');
  };

  return (
    <section className="py-16 bg-gradient-to-r from-brand-600 to-accent1-600 text-white" dir="rtl">
      <div className="container px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">מוכנים ליצור אירוע מדהים?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          הצטרפו לאלפי מארגני אירועים שמצאו את האמנים, המרצים ונותני השירות המושלמים עבור האירועים המיוחדים שלהם.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            size="lg" 
            variant="default" 
            className="bg-white text-brand-600 hover:bg-gray-100 flex items-center"
            onClick={goToSearch}
          >
            <Search className="ml-2 h-5 w-5" />
            חיפוש שירותים
          </Button>
          <Button size="lg" variant="secondary" className="bg-accent1-500 text-white hover:bg-accent1-600 border-2 border-white" asChild>
            <Link to="/provider-onboarding" className="flex items-center">
              <UserPlus className="h-5 w-5 ml-2" />
              ספק חדש
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MainCTA;
