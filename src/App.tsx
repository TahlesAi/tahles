
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { useEffect } from "react";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import ProviderProfile from "./pages/ProviderProfile";
import Search from "./pages/Search";
import ProviderOnboarding from "./pages/ProviderOnboarding";
import HowItWorks from "./pages/HowItWorks";
import Categories from "./pages/Categories";
import CategorySubcategories from "./pages/CategorySubcategories";
import SubcategoryProviders from "./pages/SubcategoryProviders";
import Contact from "./pages/Contact";

// Components
import SavedServicesReminder from "./components/provider/SavedServicesReminder";

const queryClient = new QueryClient();

// Create an AuthWrapper component to handle navigation after auth events
const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const handleNavigation = (path: string) => navigate(path);
  
  return (
    <AuthProvider>
      {/* Here we could add code to handle navigation based on auth state if needed */}
      {children}
      <SavedServicesReminder />
    </AuthProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthWrapper>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/providers/:id" element={<ProviderProfile />} />
            <Route path="/search" element={<Search />} />
            <Route path="/provider-onboarding" element={<ProviderOnboarding />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:categoryId" element={<CategorySubcategories />} />
            <Route path="/subcategories/:subcategoryId" element={<SubcategoryProviders />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthWrapper>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
