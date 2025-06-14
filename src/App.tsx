
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
  console.log('🚀 App component is initializing...');
  console.log('🚀 Available routes:');
  console.log('  - /admin/system-migration');
  console.log('  - /admin/tests');
  console.log('  - /admin/system-dashboard');
  console.log('  - /admin/master-dashboard');
  
  React.useEffect(() => {
    console.log('🚀 App component mounted');
    console.log('🚀 Current location:', window.location.pathname);
    console.log('🚀 Current search:', window.location.search);
    console.log('🚀 Current hash:', window.location.hash);
    console.log('🚀 Full URL:', window.location.href);
    
    // בדיקה אם יש בעיה עם הראוטר
    const handleLocationChange = () => {
      console.log('🚀 Location changed to:', window.location.pathname);
    };
    
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

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
              
              {/* Admin Routes with detailed logging */}
              <Route 
                path="/admin/tests" 
                element={(() => {
                  console.log('🔧 TestsManagementPage route matched!');
                  return <TestsManagementPage />;
                })()} 
              />
              <Route 
                path="/admin/system-migration" 
                element={(() => {
                  console.log('🔧 SystemMigration route matched!');
                  console.log('🔧 About to render SystemMigration component');
                  try {
                    const component = <SystemMigration />;
                    console.log('🔧 SystemMigration component created successfully');
                    return component;
                  } catch (error) {
                    console.error('🔧 Error creating SystemMigration component:', error);
                    return <div>Error loading SystemMigration: {String(error)}</div>;
                  }
                })()} 
              />
              <Route 
                path="/admin/system-dashboard" 
                element={(() => {
                  console.log('🔧 SystemDashboardPage route matched!');
                  return <SystemDashboardPage />;
                })()} 
              />
              <Route 
                path="/admin/master-dashboard" 
                element={(() => {
                  console.log('🔧 MasterDashboardPage route matched!');
                  return <MasterDashboardPage />;
                })()} 
              />
              
              {/* System Management Routes */}
              <Route path="/system-management" element={<SystemManagementPage />} />
              <Route path="/new-system-dashboard" element={<NewSystemDashboard />} />
              
              {/* Catch-all route for 404 */}
              <Route path="*" element={(() => {
                console.log('🔧 404 route matched for path:', window.location.pathname);
                return <NotFound />;
              })()} />
            </Routes>
            <Toaster />
          </Router>
        </EventProvider>
      </UnifiedEventProvider>
    </QueryClientProvider>
  );
}

export default App;
