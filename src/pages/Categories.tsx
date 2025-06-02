
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useUnifiedEventContext } from "@/context/UnifiedEventContext";
import { 
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { ArrowRight } from "lucide-react";

const Categories = () => {
  const { 
    isLoading, 
    error, 
    hebrewCategories,
  } = useUnifiedEventContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // מצב של טעינה
  if (isLoading) {
    return (
      <SidebarProvider>
        <div className="flex flex-col min-h-screen w-full">
          <Header />
          <div className="flex flex-1">
            <main className="flex-1">
              <div className="container mx-auto px-4 py-6">
                <Skeleton className="h-8 w-48 mb-6" />
                <div className="grid grid-cols-1 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-20" />
                  ))}
                </div>
              </div>
            </main>
          </div>
          <Footer />
        </div>
      </SidebarProvider>
    );
  }

  if (error || !hebrewCategories || hebrewCategories.length === 0) {
    return (
      <SidebarProvider>
        <div className="flex flex-col min-h-screen w-full">
          <Header />
          <div className="flex flex-1">
            <main className="flex-1">
              <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-xl font-bold mb-4">שגיאה בטעינת הקטגוריות</h1>
                <p className="mb-6">{error || "לא נמצאו קטגוריות במערכת"}</p>
                <Button asChild size="sm">
                  <Link to="/">חזרה לדף הבית</Link>
                </Button>
              </div>
            </main>
          </div>
          <Footer />
        </div>
      </SidebarProvider>
    );
  }

  const AppSidebar = () => (
    <Sidebar className="border-l border-gray-200">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold text-gray-900 mb-4">
            קטגוריות שירותים
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {hebrewCategories.map((category) => (
                <SidebarMenuItem key={category.id}>
                  <SidebarMenuButton
                    asChild
                    className="w-full justify-between p-3 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <Link 
                      to={`/search/subcategories?categoryId=${category.id}`}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <span className="text-xl ml-3">{category.icon || "🎯"}</span>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{category.subcategories?.length || 0}</span>
                        <ArrowRight className="h-4 w-4 mr-1" />
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );

  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-full">
        <Header />
        <div className="flex flex-1" dir="rtl">
          <AppSidebar />
          <main className="flex-1">
            <div className="p-6">
              <SidebarTrigger className="mb-4" />
              
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">קטגוריות שירותים</h1>
                <p className="text-gray-600">
                  בחר קטגוריה מהתפריט בצד לצפייה בתתי הקטגוריות והספקים הזמינים
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  מחפש שירות ספציפי?
                </h2>
                <p className="text-gray-600 mb-6">
                  השתמש בתפריט הצדדי לניווט מהיר בין הקטגוריות או חזור לדף הבית לחיפוש מונחה
                </p>
                <div className="flex gap-4 justify-center">
                  <Button asChild>
                    <Link to="/">חזרה לדף הבית</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/search">חיפוש מתקדם</Link>
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default Categories;
