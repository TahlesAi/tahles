
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/toaster"
import { EventProvider } from '@/context/EventContext';

// Pages
import Index from './pages/Index';
import Search from './pages/Search';
import ServiceDetails from './pages/ServiceDetails';
import CategorySubcategories from './pages/CategorySubcategories';
import SubcategoryServiceTypes from './pages/SubcategoryServiceTypes';
import ProviderServices from './pages/ProviderServices';
import EnhancedProviderProfile from './pages/EnhancedProviderProfile';
import Categories from './pages/Categories';
import ProviderGenerator from './pages/ProviderGenerator';
import BookingPage from './pages/BookingPage';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <EventProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              {/* עמודים קיימים */}
              <Route path="/" element={<Index />} />
              <Route path="/search" element={<Search />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/:categoryId" element={<CategorySubcategories />} />
              <Route path="/subcategories/:subcategoryId" element={<SubcategoryServiceTypes />} />
              
              {/* נתיבי ספקים - נתיבים חדשים וקיימים */}
              <Route path="/provider/:providerId" element={<EnhancedProviderProfile />} />
              <Route path="/providers/:providerId" element={<ProviderServices />} />
              <Route path="/enhanced-providers/:providerId" element={<EnhancedProviderProfile />} />
              
              {/* נתיבי מוצרים ושירותים */}
              <Route path="/product/:productId" element={<ServiceDetails />} />
              <Route path="/service/:id" element={<ServiceDetails />} />
              <Route path="/enhanced-services/:serviceId" element={<ServiceDetails />} />
              
              {/* נתיב הזמנה */}
              <Route path="/booking/:serviceId" element={<BookingPage />} />
              
              {/* דף מחולל ספקים */}
              <Route path="/admin/provider-generator" element={<ProviderGenerator />} />
              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </EventProvider>
    </QueryClientProvider>
  );
}

export default App;
