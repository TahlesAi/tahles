import { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotificationSystem } from '@/components/notifications/NotificationSystem';
import { UnifiedEventProvider } from '@/context/UnifiedEventContext';
import ErrorBoundary from '@/components/ErrorBoundary';

// Pages
const HomePage = lazy(() => import("./pages/HomePage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const ConceptPage = lazy(() => import("./pages/ConceptPage"));
const ProviderPage = lazy(() => import("./pages/ProviderPage"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const ProviderCalendar = lazy(() => import("./pages/ProviderCalendar"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const AdminDashboardPage = lazy(() => import("./pages/admin/AdminDashboardPage"));
const DataExportPage = lazy(() => import("./pages/admin/DataExportPage"));
const HierarchyManagement = lazy(() => import("./pages/admin/HierarchyManagement"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UnifiedEventProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <NotificationSystem />
        <BrowserRouter>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Suspense fallback={<div>טוען...</div>}><HomePage /></Suspense>} />
              <Route path="/categories/:categoryId" element={<Suspense fallback={<div>טוען...</div>}><CategoryPage /></Suspense>} />
              <Route path="/concepts/:conceptId" element={<Suspense fallback={<div>טוען...</div>}><ConceptPage /></Suspense>} />
              <Route path="/providers/:providerId" element={<Suspense fallback={<div>טוען...</div>}><ProviderPage /></Suspense>} />
              <Route path="/services/:serviceId" element={<Suspense fallback={<div>טוען...</div>}><ServicePage /></Suspense>} />
              <Route path="/search" element={<Suspense fallback={<div>טוען...</div>}><SearchPage /></Suspense>} />
              <Route path="/calendar" element={<Suspense fallback={<div>טוען...</div>}><ProviderCalendar /></Suspense>} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<Suspense fallback={<div>טוען...</div>}><AdminDashboardPage /></Suspense>} />
              <Route path="/admin/data-export" element={<Suspense fallback={<div>טוען...</div>}><DataExportPage /></Suspense>} />
              <Route path="/admin/readable-export" element={<Suspense fallback={<div>טוען...</div>}><ReadableExportPage /></Suspense>} />
              <Route path="/admin/hierarchy" element={<Suspense fallback={<div>טוען...</div>}><HierarchyManagement /></Suspense>} />
              
              <Route path="*" element={<Suspense fallback={<div>טוען...</div>}><NotFoundPage /></Suspense>} />
            </Routes>
          </ErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </UnifiedEventProvider>
  </QueryClientProvider>
);

const ReadableExportPage = lazy(() => import("./pages/admin/ReadableExportPage"));

export default App;
