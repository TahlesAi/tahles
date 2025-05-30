
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
              <Route path="/service/:id" element={<ServiceDetails />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/:categoryId" element={<CategorySubcategories />} />
              <Route path="/subcategories/:subcategoryId" element={<SubcategoryServiceTypes />} />
              <Route path="/providers/:providerId" element={<ProviderServices />} />
              <Route path="/enhanced-providers/:providerId" element={<EnhancedProviderProfile />} />
              
              {/* נתיבים נוספים לשירותים */}
              <Route path="/enhanced-services/:serviceId" element={<ServiceDetails />} />
              
              {/* דף מחולל ספקים */}
              <Route path="/admin/provider-generator" element={<ProviderGenerator />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </EventProvider>
    </QueryClientProvider>
  );
}

export default App;
