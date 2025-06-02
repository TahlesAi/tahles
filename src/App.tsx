import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { EventProvider } from "@/context/EventContext";
import NotificationSystem from "@/components/notifications/NotificationSystem";
import Index from "./pages/Index";
import Search from "./pages/Search";
import ServiceDetails from "./pages/ServiceDetails";
import ProviderOnboarding from "./pages/ProviderOnboarding";
import Dashboard from "./pages/Dashboard";
import ProviderCalendar from "./pages/ProviderCalendar";
import ProviderServices from "./pages/ProviderServices";
import BookingPage from "./pages/BookingPage";
import Categories from "./pages/Categories";
import SubcategoryProviders from "./pages/SubcategoryProviders";
import ServiceTypeProviders from "./pages/ServiceTypeProviders";
import CategorySubcategories from "./pages/CategorySubcategories";
import SubcategoryServiceTypes from "./pages/SubcategoryServiceTypes";
import EnhancedProviderProfile from "./pages/EnhancedProviderProfile";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import CateringSearch from "./pages/CateringSearch";
import ProviderGenerator from "./pages/ProviderGenerator";
import HowItWorksAlternative from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";
import Chatbot from "@/components/chat/Chatbot";
import PersonalizationSearch from "./pages/PersonalizationSearch";
import RecommendedResultsPage from "./pages/RecommendedResults";
import AdvancedBookingPage from "./pages/AdvancedBookingPage";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <EventProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <NotificationSystem />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/search" element={<Search />} />
                <Route path="/service/:id" element={<ServiceDetails />} />
                <Route path="/provider/:id" element={<EnhancedProviderProfile />} />
                <Route path="/provider-onboarding" element={<ProviderOnboarding />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/provider-calendar" element={<ProviderCalendar />} />
                <Route path="/provider-services" element={<ProviderServices />} />
                <Route path="/booking/:serviceId" element={<BookingPage />} />
                <Route path="/advanced-booking/:serviceId" element={<AdvancedBookingPage />} />
                <Route path="/booking-confirmation/:bookingId" element={<BookingConfirmationPage />} />
                <Route path="/personalization-search" element={<PersonalizationSearch />} />
                <Route path="/recommended-results" element={<RecommendedResultsPage />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/category/:category" element={<CategorySubcategories />} />
                <Route path="/category/:category/:subcategory" element={<SubcategoryServiceTypes />} />
                <Route path="/category/:category/:subcategory/:serviceType" element={<ServiceTypeProviders />} />
                <Route path="/providers/:subcategory" element={<SubcategoryProviders />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/how-it-works-alt" element={<HowItWorksAlternative />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/catering" element={<CateringSearch />} />
                <Route path="/admin/provider-generator" element={<ProviderGenerator />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Chatbot />
            </BrowserRouter>
          </TooltipProvider>
        </EventProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
