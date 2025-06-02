
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Search from './pages/Search';
import ServiceDetails from './pages/ServiceDetails';
import EnhancedProviderProfile from './pages/EnhancedProviderProfile';
import BookingPage from './pages/BookingPage';
import Dashboard from './pages/Dashboard';
import RecommendedResultsPage from './pages/RecommendedResultsPage';
import AdminDashboardPage from "./pages/AdminDashboardPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/search" element={<Search />} />
        <Route path="/service/:id" element={<ServiceDetails />} />
        <Route path="/provider/:id" element={<EnhancedProviderProfile />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Dashboard />} />
        <Route path="/recommended" element={<RecommendedResultsPage />} />
        
        {/* נתיב חדש לדשבורד אדמין */}
        <Route path="/admin" element={<AdminDashboardPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
