
import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { EventProvider } from "@/context/EventContext";
import { UnifiedEventProvider } from "@/context/UnifiedEventContext";
import './App.css';

// Import mock calendar data to initialize Neta's availability
import '@/lib/mockCalendarData';

import Index from './pages/Index';
import { SearchResultsPage } from './pages/SearchResultsPage';
import ServiceDetails from './pages/ServiceDetails';
import ProviderProfile from './pages/ProviderProfile';
import BookingPage from './pages/BookingPage';
import RecommendedResultsPage from './pages/RecommendedResultsPage';
import ComparisonPage from './pages/ComparisonPage';
import EnhancedServiceDetails from './pages/EnhancedServiceDetails';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UnifiedEventProvider>
        <EventProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/service/:id" element={<ServiceDetails />} />
              <Route path="/enhanced-service/:serviceId" element={<EnhancedServiceDetails />} />
              <Route path="/provider/:id" element={<ProviderProfile />} />
              <Route path="/booking/:serviceId" element={<BookingPage />} />
              <Route path="/recommended" element={<RecommendedResultsPage />} />
              <Route path="/compare" element={<ComparisonPage />} />
            </Routes>
            <Toaster />
          </Router>
        </EventProvider>
      </UnifiedEventProvider>
    </QueryClientProvider>
  );
}

export default App;
