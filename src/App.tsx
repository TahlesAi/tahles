import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import CategorySubcategories from './pages/CategorySubcategories';
import ServiceDetails from './pages/ServiceDetails';
import ProviderDetails from './pages/ProviderDetails';
import Categories from './pages/Categories';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Booking from './pages/Booking';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import FAQ from './pages/FAQ';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import SubcategoryServices from './pages/SubcategoryServices';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './components/ScrollToTop';
import { SiteMeta } from './components/SiteMeta';
import CateringSearch from "./pages/CateringSearch";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <SiteMeta />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:categoryId" element={<CategorySubcategories />} />
          <Route path="/subcategories/:subcategoryId" element={<SubcategoryServices />} />
          <Route path="/services/:serviceId" element={<ServiceDetails />} />
          <Route path="/providers/:providerId" element={<ProviderDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/catering-search" element={<CateringSearch />} />
        </Routes>
        <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl pauseOnFocusLoss draggable pauseOnHover />
      </Router>
    </AuthProvider>
  );
}

export default App;
