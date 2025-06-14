
import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { EventProvider } from "@/context/EventContext";
import { UnifiedEventProvider } from "@/context/UnifiedEventContext";
import AccessibilityEnhancer from "@/components/accessibility/AccessibilityEnhancer";
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
import TestsManagementPage from './pages/admin/TestsManagementPage';
import ProviderOnboarding from './pages/ProviderOnboarding';
import SystemMigration from './pages/admin/SystemMigration';
import SystemManagementPage from './pages/SystemManagementPage';
import NewSystemDashboard from './pages/NewSystemDashboard';
import SystemDashboardPage from './pages/admin/SystemDashboardPage';
import MasterDashboardPage from './pages/admin/MasterDashboardPage';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UnifiedEventProvider>
        <EventProvider>
          <AccessibilityEnhancer />
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
              <Route path="/provider-onboarding" element={<ProviderOnboarding />} />
              
              {/* Admin Routes */}
              <Route path="/admin/tests" element={<TestsManagementPage />} />
              <Route path="/admin/system-migration" element={<SystemMigration />} />
              <Route path="/admin/system-dashboard" element={<SystemDashboardPage />} />
              <Route path="/admin/master-dashboard" element={<MasterDashboardPage />} />
              
              {/* System Management Routes */}
              <Route path="/system-management" element={<SystemManagementPage />} />
              <Route path="/new-system-dashboard" element={<NewSystemDashboard />} />
              
              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </Router>
        </EventProvider>
      </UnifiedEventProvider>
    </QueryClientProvider>
  );
}

export default App;
