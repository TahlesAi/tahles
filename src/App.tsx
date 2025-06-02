
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EventProvider } from '@/context/EventContext';
import Index from '@/pages/Index';
import Categories from '@/pages/Categories';
import ServiceDetails from '@/pages/ServiceDetails';
import EnhancedProviderProfile from '@/pages/EnhancedProviderProfile';
import Search from '@/pages/Search';
import BookingPage from '@/pages/BookingPage';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import AssistancePopupManager from '@/components/assistance/AssistancePopupManager';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <EventProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50" dir="rtl">
            <Toaster />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/service/:serviceId" element={<ServiceDetails />} />
              <Route path="/provider/:providerId" element={<EnhancedProviderProfile />} />
              <Route path="/search" element={<Search />} />
              <Route path="/booking/:serviceId" element={<BookingPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <AssistancePopupManager />
          </div>
        </BrowserRouter>
      </EventProvider>
    </QueryClientProvider>
  );
}

export default App;
