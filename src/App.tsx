import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EventProvider } from '@/context/EventContext';
import Home from '@/pages/Home';
import CategoryPage from '@/pages/CategoryPage';
import ServicePage from '@/pages/ServicePage';
import ProviderProfilePage from '@/pages/ProviderProfilePage';
import SearchResultsPage from '@/pages/SearchResultsPage';
import BookingPage from '@/pages/BookingPage';
import TermsOfServicePage from '@/pages/TermsOfServicePage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import ContactUsPage from '@/pages/ContactUsPage';
import AboutUsPage from '@/pages/AboutUsPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import DashboardPage from '@/pages/DashboardPage';
import ProviderDashboard from '@/pages/ProviderDashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import NotFoundPage from '@/pages/NotFoundPage';
import { useAuth } from '@/hooks/useAuth';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { ProviderRoute } from '@/components/auth/ProviderRoute';
import { AdminRoute } from '@/components/auth/AdminRoute';
import ScrollToTop from '@/components/utils/ScrollToTop';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/ModeToggle';
import { Button } from '@/components/ui/button';
import AssistancePopupManager from '@/components/assistance/AssistancePopupManager';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <EventProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50" dir="rtl">
            <Toaster />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/service/:serviceId" element={<ServicePage />} />
              <Route path="/provider/:providerId" element={<ProviderProfilePage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/booking/:serviceId" element={<BookingPage />} />
              <Route path="/terms" element={<TermsOfServicePage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/contact" element={<ContactUsPage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="*" element={<NotFoundPage />} />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Provider Routes */}
              <Route
                path="/provider-dashboard"
                element={
                  <ProviderRoute>
                    <ProviderDashboard />
                  </ProviderRoute>
                }
              />
              
              {/* Admin Routes */}
              <Route
                path="/admin-dashboard"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
            </Routes>
            <AssistancePopupManager />
          </div>
        </BrowserRouter>
      </EventProvider>
    </QueryClientProvider>
  );
}

export default App;
