
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import SearchResults from "./pages/SearchResults";
import ServiceDetails from "./pages/ServiceDetails";
import ProviderProfile from "./pages/ProviderProfile";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import SystemDashboardPage from "./pages/admin/SystemDashboardPage";
import NewSystemDashboard from "./pages/NewSystemDashboard";
import UpdatedSystemPage from "./pages/UpdatedSystemPage";
import WishlistPage from "./pages/WishlistPage";
import ComparisonPage from "./pages/ComparisonPage";
import BookingPage from "./pages/BookingPage";
import CategoriesPage from "./pages/CategoriesPage";
import ProvidersPage from "./pages/ProvidersPage";
import AboutPage from "./pages/AboutPage";

function App() {
  console.log('App component rendered');
  
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/service/:id" element={<ServiceDetails />} />
              <Route path="/provider/:id" element={<ProviderProfile />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/system-dashboard" element={<SystemDashboardPage />} />
              <Route path="/admin/new-system" element={<NewSystemDashboard />} />
              <Route path="/admin/updated-system" element={<UpdatedSystemPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/comparison" element={<ComparisonPage />} />
              <Route path="/booking/:id" element={<BookingPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/providers" element={<ProvidersPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
            <Toaster position="top-right" />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
