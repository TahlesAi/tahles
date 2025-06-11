import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import './App.css';

// Import mock calendar data to initialize Neta's availability
import '@/lib/mockCalendarData';

import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import ServiceDetails from './pages/ServiceDetails';
import ProviderDetails from './pages/ProviderDetails';
import BookingPage from './pages/BookingPage';
import RecommendedResultsPage from './pages/RecommendedResultsPage';
import CompareServicesPage from './pages/CompareServicesPage';
import EnhancedServiceDetails from './pages/EnhancedServiceDetails';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/service/:id" element={<ServiceDetails />} />
          <Route path="/enhanced-service/:serviceId" element={<EnhancedServiceDetails />} />
          <Route path="/provider/:id" element={<ProviderDetails />} />
          <Route path="/booking/:serviceId" element={<BookingPage />} />
          <Route path="/recommended" element={<RecommendedResultsPage />} />
          <Route path="/compare" element={<CompareServicesPage />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;

