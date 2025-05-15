
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Music, Camera, Utensils, MapPin, Mic2, Monitor, 
  Gift, Sparkles, Calendar, Wand2, PartyPopper, 
  TentTree, User, PlusCircle, Users, Headphones
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  count: number;
}

const performersCategories: Category[] = [
  { 
    id: "musicians", 
    name: "מוזיקאים ולהקות", 
    icon: <Music className="h-8 w-8" />, 
    description: "זמרים, להקות, נגנים וDJ",
    count: 248
  },
  { 
    id: "magicians", 
    name: "אומני חושים", 
    icon: <Wand2 className="h-8 w-8" />, 
    description: "קוסמים, מנטליסטים ואמני אשליות",
    count: 73 
  },
  { 
    id: "hosts", 
    name: "מנחים", 
    icon: <User className="h-8 w-8" />, 
    description: "מנחי אירועים, קריינים ומנחי טקסים",
    count: 86 
  },
  { 
    id: "singers", 
    name: "זמרים", 
    icon: <Mic2 className="h-8 w-8" />, 
    description: "זמרים סולו, להקות ומקהלות",
    count: 132 
  },
  { 
    id: "comedians", 
    name: "סטנדאפיסטים", 
    icon: <PartyPopper className="h-8 w-8" />, 
    description: "מופעי סטנדאפ והומור",
    count: 67 
  },
  { 
    id: "actors", 
    name: "שחקנים", 
    icon: <Users className="h-8 w-8" />, 
    description: "תיאטרון, הצגות ומשחק",
    count: 95 
  },
];

const producersCategories: Category[] = [
  { 
    id: "locations", 
    name: "לוקיישנים", 
    icon: <MapPin className="h-8 w-8" />, 
    description: "אולמות, גנים, מתחמים לאירועים",
    count: 124 
  },
  { 
    id: "catering", 
    name: "שירותי קייטרינג", 
    icon: <Utensils className="h-8 w-8" />, 
    description: "קייטרינג לאירועים וכיבוד",
    count: 108 
  },
  { 
    id: "sound", 
    name: "שירותי סאונד", 
    icon: <Headphones className="h-8 w-8" />, 
    description: "ציוד הגברה וסאונד לאירועים",
    count: 74 
  },
  { 
    id: "equipment", 
    name: "ציוד אודיו-ויזואלי", 
    icon: <Monitor className="h-8 w-8" />, 
    description: "הקרנות, תאורה וציוד טכני",
    count: 98
  },
  { 
    id: "photography", 
    name: "צלמים", 
    icon: <Camera className="h-8 w-8" />, 
    description: "צילום סטילס, וידאו וסרטונים",
    count: 157 
  },
  { 
    id: "decor", 
    name: "עיצוב ודקורציה", 
    icon: <Sparkles className="h-8 w-8" />, 
    description: "עיצוב אירועים ותפאורה",
    count: 112 
  },
];

const activitiesCategories: Category[] = [
  { 
    id: "lectures", 
    name: "הרצאות", 
    icon: <Users className="h-8 w-8" />, 
    description: "הרצאות מרתקות בכל הנושאים",
    count: 88 
  },
  { 
    id: "workshops", 
    name: "סדנאות", 
    icon: <PlusCircle className="h-8 w-8" />, 
    description: "סדנאות חווייתיות, ODT וגיבוש",
    count: 93 
  },
  { 
    id: "attractions", 
    name: "אטרקציות", 
    icon: <PartyPopper className="h-8 w-8" />, 
    description: "אטרקציות לאירועים ומסיבות",
    count: 76 
  },
  { 
    id: "tours", 
    name: "טיולים וימי גיבוש", 
    icon: <TentTree className="h-8 w-8" />, 
    description: "סיורים, טיולי שטח וימי כיף",
    count: 68 
  },
  { 
    id: "tickets", 
    name: "כרטיסים לאטרקציות", 
    icon: <Calendar className="h-8 w-8" />, 
    description: "כרטיסים למופעים ואטרקציות",
    count: 45 
  },
  { 
    id: "gifts", 
    name: "מתנות ומזכרות", 
    icon: <Gift className="h-8 w-8" />, 
    description: "מתנות לאורחים ומזכרות",
    count: 63
  },
];

const Categories = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-brand-600 to-accent1-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">קטגוריות שירותים</h1>
              <p className="text-xl mb-8">
                מצאו את השירותים המושלמים לכל אירוע - מבחר רחב ומגוון
              </p>
            </div>
          </div>
        </section>

        {/* Performers Categories */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">אמנים ומופעים</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {performersCategories.map((category) => (
                <Link 
                  key={category.id} 
                  to={`/categories/${category.id}`}
                  className="block"
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                        <div className="text-brand-600">{category.icon}</div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-center">{category.name}</h3>
                      <p className="text-gray-500 text-center mb-4">{category.description}</p>
                      <div className="mt-auto text-sm text-gray-400">{category.count} נותני שירות</div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Producers Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">שירותי הפקה ולוגיסטיקה</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {producersCategories.map((category) => (
                <Link 
                  key={category.id} 
                  to={`/categories/${category.id}`}
                  className="block"
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-accent1-100 flex items-center justify-center mb-4">
                        <div className="text-accent1-600">{category.icon}</div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-center">{category.name}</h3>
                      <p className="text-gray-500 text-center mb-4">{category.description}</p>
                      <div className="mt-auto text-sm text-gray-400">{category.count} נותני שירות</div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Activities Categories */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">פעילויות וחוויות</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {activitiesCategories.map((category) => (
                <Link 
                  key={category.id} 
                  to={`/categories/${category.id}`}
                  className="block"
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                        <div className="text-brand-600">{category.icon}</div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-center">{category.name}</h3>
                      <p className="text-gray-500 text-center mb-4">{category.description}</p>
                      <div className="mt-auto text-sm text-gray-400">{category.count} נותני שירות</div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">לא מוצאים את מה שחיפשתם?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              צרו קשר עם צוות השירות שלנו ונשמח לסייע לכם למצוא את השירות המושלם לאירוע שלכם
            </p>
            <Link 
              to="/contact" 
              className="bg-white text-brand-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              דברו איתנו
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Categories;
