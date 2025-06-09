
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import SearchResults from "./pages/SearchResults";
import ServiceDetails from "./pages/ServiceDetails";
import ProviderProfile from "./pages/ProviderProfile";
import MasterDashboardPage from "./pages/admin/MasterDashboardPage";
import SystemInitializationPage from "./pages/SystemInitializationPage";
import SystemMigration from "./pages/admin/SystemMigration";
import WishlistPage from "./pages/WishlistPage";
import ComparisonPage from "./pages/ComparisonPage";
import BookingPage from "./pages/BookingPage";
import CategoriesPage from "./pages/CategoriesPage";
import ProvidersPage from "./pages/ProvidersPage";
import AboutPage from "./pages/AboutPage";
import CategoriesManagementPage from "./pages/admin/CategoriesManagementPage";
import ServicesPage from "./pages/ServicesPage";
import LocationsPage from "./pages/LocationsPage";

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
              <Route path="/admin/master-dashboard" element={<MasterDashboardPage />} />
              <Route path="/admin/system-migration" element={<SystemMigration />} />
              <Route path="/admin/categories" element={<CategoriesManagementPage />} />
              <Route path="/system/initialize" element={<SystemInitializationPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/comparison" element={<ComparisonPage />} />
              <Route path="/booking/:id" element={<BookingPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/categories/locations" element={<LocationsPage />} />
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
