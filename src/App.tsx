import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UnifiedEventProvider } from './context/UnifiedEventContext';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import { performanceMonitor } from './utils/performanceMonitor';

// Lazy loading של הקומפוננטים הקיימים בלבד
const Index = React.lazy(() => {
  performanceMonitor.start('Index-ComponentLoad');
  return import('./pages/Index').finally(() => {
    performanceMonitor.end('Index-ComponentLoad');
  });
});

const Search = React.lazy(() => {
  performanceMonitor.start('Search-ComponentLoad');
  return import('./pages/Search').finally(() => {
    performanceMonitor.end('Search-ComponentLoad');
  });
});

const ServiceDetails = React.lazy(() => {
  performanceMonitor.start('ServiceDetails-ComponentLoad');
  return import('./pages/ServiceDetails').finally(() => {
    performanceMonitor.end('ServiceDetails-ComponentLoad');
  });
});

const EnhancedProviderProfile = React.lazy(() => {
  performanceMonitor.start('ProviderProfile-ComponentLoad');
  return import('./pages/EnhancedProviderProfile').finally(() => {
    performanceMonitor.end('ProviderProfile-ComponentLoad');
  });
});

const BookingPage = React.lazy(() => {
  performanceMonitor.start('Booking-ComponentLoad');
  return import('./pages/BookingPage').finally(() => {
    performanceMonitor.end('Booking-ComponentLoad');
  });
});

const Dashboard = React.lazy(() => {
  performanceMonitor.start('Dashboard-ComponentLoad');
  return import('./pages/Dashboard').finally(() => {
    performanceMonitor.end('Dashboard-ComponentLoad');
  });
});

const RecommendedResultsPage = React.lazy(() => {
  performanceMonitor.start('Recommended-ComponentLoad');
  return import('./pages/RecommendedResultsPage').finally(() => {
    performanceMonitor.end('Recommended-ComponentLoad');
  });
});

const AdminDashboardPage = React.lazy(() => {
  performanceMonitor.start('Admin-ComponentLoad');
  return import('./pages/AdminDashboardPage').finally(() => {
    performanceMonitor.end('Admin-ComponentLoad');
  });
});

const SearchSubcategories = React.lazy(() => {
  performanceMonitor.start('SearchSubcategories-ComponentLoad');
  return import('./pages/SearchSubcategories').finally(() => {
    performanceMonitor.end('SearchSubcategories-ComponentLoad');
  });
});

const SubcategoryProviders = React.lazy(() => {
  performanceMonitor.start('SubcategoryProviders-ComponentLoad');
  return import('./pages/SubcategoryProviders').finally(() => {
    performanceMonitor.end('SubcategoryProviders-ComponentLoad');
  });
});

// קומפוננט טעינה מתקדם
const SuspenseFallback = () => (
  <div className="flex justify-center items-center min-h-screen bg-gray-50">
    <div className="text-center">
      <LoadingSpinner size="lg" text="טוען דף..." />
      <p className="text-sm text-gray-500 mt-4">
        אנא המתן, הדף נטען...
      </p>
    </div>
  </div>
);

function App() {
  // ניטור ביצועים של האפליקציה
  React.useEffect(() => {
    performanceMonitor.start('App-InitialLoad');
    
    // בדיקת ביצועים כל 30 שניות
    const performanceInterval = setInterval(() => {
      const stats = performanceMonitor.getStats();
      if (stats.slowMetrics > 0) {
        console.warn(`⚠️ Performance Alert: ${stats.slowMetrics} slow operations detected`);
      }
    }, 30000);

    return () => {
      clearInterval(performanceInterval);
      performanceMonitor.end('App-InitialLoad');
      
      // יצירת דוח ביצועים סופי
      console.log(performanceMonitor.generateReport());
    };
  }, []);

  return (
    <ErrorBoundary>
      <UnifiedEventProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Suspense fallback={<SuspenseFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/search" element={<Search />} />
                <Route path="/search/subcategories" element={<SearchSubcategories />} />
                <Route path="/subcategory/:subcategoryId/providers" element={<SubcategoryProviders />} />
                <Route path="/service/:id" element={<ServiceDetails />} />
                <Route path="/provider/:id" element={<EnhancedProviderProfile />} />
                <Route path="/booking/:id" element={<BookingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Dashboard />} />
                <Route path="/recommended" element={<RecommendedResultsPage />} />
                <Route path="/admin" element={<AdminDashboardPage />} />
                
                {/* Route של 404 */}
                <Route path="*" element={
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                      <p className="text-gray-600 mb-4">הדף שחיפשת לא נמצא</p>
                      <button 
                        onClick={() => window.location.href = '/'}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                      >
                        חזור לדף הבית
                      </button>
                    </div>
                  </div>
                } />
              </Routes>
            </Suspense>
          </div>
        </Router>
      </UnifiedEventProvider>
    </ErrorBoundary>
  );
}

export default App;
