
import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Categories from './pages/Categories';
import CategorySubcategories from './pages/CategorySubcategories';
import ServiceDetails from './pages/ServiceDetails';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from './pages/Search';
import CateringSearch from "./pages/CateringSearch";
import Index from './pages/Index';
import HowItWorks from './pages/HowItWorks';
import ProviderOnboarding from './pages/ProviderOnboarding';
import SubcategoryServiceTypes from './pages/SubcategoryServiceTypes';
import ServiceTypeProviders from './pages/ServiceTypeProviders';
import ProviderServices from './pages/ProviderServices';
import Contact from './pages/Contact';
import { Button } from './components/ui/button';
import { ArrowRight } from 'lucide-react';

// Create a context for navigation history
interface NavigationContextProps {
  canGoBack: boolean;
  goBack: () => void;
}

const NavigationContext = createContext<NavigationContextProps | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

// Back button component that uses the navigation context
const BackButton: React.FC = () => {
  const { canGoBack, goBack } = useNavigation();
  
  if (!canGoBack) return null;
  
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="fixed bottom-4 right-4 z-50 bg-white/80 backdrop-blur-sm shadow-md"
      onClick={goBack}
    >
      <ArrowRight className="h-4 w-4 ml-1" />
      חזרה
    </Button>
  );
};

// Navigation provider component
const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine if we can go back (not on the home page)
  const canGoBack = location.pathname !== '/';
  
  const goBack = () => {
    navigate(-1);
  };
  
  return (
    <NavigationContext.Provider value={{ canGoBack, goBack }}>
      {children}
      <BackButton />
    </NavigationContext.Provider>
  );
};

function AppRoutes() {
  return (
    <NavigationProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/search" element={<Search />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:categoryId" element={<CategorySubcategories />} />
        <Route path="/subcategories/:subcategoryId" element={<SubcategoryServiceTypes />} />
        <Route path="/service-types/:serviceTypeId" element={<ServiceTypeProviders />} />
        <Route path="/providers/:providerId" element={<ProviderServices />} />
        <Route path="/services/:serviceId" element={<ServiceDetails />} />
        <Route path="/catering-search" element={<CateringSearch />} />
        <Route path="/provider-onboarding" element={<ProviderOnboarding />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </NavigationProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <Router>
          <AppRoutes />
          <ToastContainer 
            position="bottom-right" 
            autoClose={5000} 
            hideProgressBar={false} 
            newestOnTop 
            closeOnClick 
            rtl 
            pauseOnFocusLoss 
            draggable 
            pauseOnHover 
          />
        </Router>
      </EventProvider>
    </AuthProvider>
  );
}

export default App;
