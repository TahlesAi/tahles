
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Categories from './pages/Categories';
import CategorySubcategories from './pages/CategorySubcategories';
import ServiceDetails from './pages/ServiceDetails';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from './pages/Search';
import CateringSearch from "./pages/CateringSearch";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Categories />} />
          <Route path="/search" element={<Search />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:categoryId" element={<CategorySubcategories />} />
          <Route path="/services/:serviceId" element={<ServiceDetails />} />
          <Route path="/catering-search" element={<CateringSearch />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl pauseOnFocusLoss draggable pauseOnHover />
      </Router>
    </AuthProvider>
  );
}

export default App;
