import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import Index from "./pages/Index";
import Categories from "./pages/Categories";
import CategoryPage from "./pages/CategoryPage";
import SubcategoryPage from "./pages/SubcategoryPage";
import ProviderPage from "./pages/ProviderPage";
import ServicePage from "./pages/ServicePage";
import SearchResults from "./pages/SearchResults";
import BookingPage from "./pages/BookingPage";
import CustomerDashboard from "./pages/CustomerDashboard";
import ProviderOnboarding from "./pages/ProviderOnboarding";
import ProviderDashboard from "./pages/ProviderDashboard";
import SystemManagementPage from "./pages/SystemManagementPage";
import NewSystemDashboard from "./pages/NewSystemDashboard";
import SystemMigration from "./pages/admin/SystemMigration";
import MasterDashboard from "./pages/admin/MasterDashboard";
import ComprehensiveTestPage from "./pages/admin/ComprehensiveTestPage";
import GuidedSearchPage from "./pages/GuidedSearchPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:categoryId" element={<CategoryPage />} />
          <Route path="/subcategories/:subcategoryId" element={<SubcategoryPage />} />
          <Route path="/providers/:providerId" element={<ProviderPage />} />
          <Route path="/services/:serviceId" element={<ServicePage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/guided-search" element={<GuidedSearchPage />} />
          <Route path="/book/:serviceId" element={<BookingPage />} />
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/provider/onboarding" element={<ProviderOnboarding />} />
          <Route path="/provider/dashboard" element={<ProviderDashboard />} />
          <Route path="/admin/system-management" element={<SystemManagementPage />} />
          <Route path="/admin/new-system" element={<NewSystemDashboard />} />
          <Route path="/admin/migration" element={<SystemMigration />} />
          <Route path="/admin/master-dashboard" element={<MasterDashboard />} />
          <Route path="/admin/comprehensive-test" element={<ComprehensiveTestPage />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
