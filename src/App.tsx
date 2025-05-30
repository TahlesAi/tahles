import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/toaster"

// Pages
import Index from './pages/Index';
import Search from './pages/Search';
import ServiceDetails from './pages/ServiceDetails';
import CategorySubcategories from './pages/CategorySubcategories';
import SubcategoryServiceTypes from './pages/SubcategoryServiceTypes';
import CategoryServices from './pages/CategoryServices';
import SubcategoryServices from './pages/SubcategoryServices';
import ServiceTypeServices from './pages/ServiceTypeServices';
import ProviderServices from './pages/ProviderServices';
import EnhancedProviderProfile from './pages/EnhancedProviderProfile';
import Categories from './pages/Categories';
import ProviderGenerator from './pages/ProviderGenerator';

// Context
import { EventContextProvider } from './context/EventContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <EventContextProvider>
            <Routes>
              {/* עמודים קיימים */}
              <Route path="/" element={<Index />} />
              <Route path="/search" element={<Search />} />
              <Route path="/service/:id" element={<ServiceDetails />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/:categoryId" element={<CategorySubcategories />} />
              <Route path="/subcategories/:subcategoryId" element={<SubcategoryServiceTypes />} />
              <Route path="/category-services/:categoryId" element={<CategoryServices />} />
              <Route path="/subcategory-services/:subcategoryId" element={<SubcategoryServices />} />
              <Route path="/service-type-services/:serviceTypeId" element={<ServiceTypeServices />} />
              <Route path="/providers/:providerId" element={<ProviderServices />} />
              <Route path="/enhanced-providers/:providerId" element={<EnhancedProviderProfile />} />
              
              {/* דף מחולל ספקים */}
              <Route path="/admin/provider-generator" element={<ProviderGenerator />} />
            </Routes>
          </EventContextProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
