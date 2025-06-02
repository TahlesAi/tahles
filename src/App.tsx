import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Search from './pages/Search';
import ServiceDetailsPage from './pages/ServiceDetailsPage';
import ProviderDetailsPage from './pages/ProviderDetailsPage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import RecommendedResultsPage from './pages/RecommendedResultsPage';
import ComparisonPage from './pages/ComparisonPage';
import CateringInquiryPage from './pages/CateringInquiryPage';
import CateringResultsPage from './pages/CateringResultsPage';
import FavoritesPage from './pages/FavoritesPage';
import AdminDashboardPage from "@/pages/AdminDashboardPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/service/:id" element={<ServiceDetailsPage />} />
        <Route path="/provider/:id" element={<ProviderDetailsPage />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/recommended" element={<RecommendedResultsPage />} />
        <Route path="/compare" element={<ComparisonPage />} />
        <Route path="/catering-inquiry" element={<CateringInquiryPage />} />
        <Route path="/catering-results" element={<CateringResultsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        
        {/* נתיב חדש לדשבורד אדמין */}
        <Route path="/admin" element={<AdminDashboardPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
