
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UnifiedEventProvider } from './context/UnifiedEventContext';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy loading של הקומפוננטים
const Index = React.lazy(() => import('./pages/Index'));
const Search = React.lazy(() => import('./pages/Search'));
const ServiceDetails = React.lazy(() => import('./pages/ServiceDetails'));
const EnhancedProviderProfile = React.lazy(() => import('./pages/EnhancedProviderProfile'));
const BookingPage = React.lazy(() => import('./pages/BookingPage'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const RecommendedResultsPage = React.lazy(() => import('./pages/RecommendedResultsPage'));
const AdminDashboardPage = React.lazy(() => import('./pages/AdminDashboardPage'));

// קומפוננט טעינה
const SuspenseFallback = () => (
  <div className="flex justify-center items-center min-h-screen">
    <LoadingSpinner />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <UnifiedEventProvider>
        <Router>
          <Suspense fallback={<SuspenseFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/search" element={<Search />} />
              <Route path="/service/:id" element={<ServiceDetails />} />
              <Route path="/provider/:id" element={<EnhancedProviderProfile />} />
              <Route path="/booking/:id" element={<BookingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Dashboard />} />
              <Route path="/recommended" element={<RecommendedResultsPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
            </Routes>
          </Suspense>
        </Router>
      </UnifiedEventProvider>
    </ErrorBoundary>
  );
}

export default App;
