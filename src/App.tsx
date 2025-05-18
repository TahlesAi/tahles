
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <Router>
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
