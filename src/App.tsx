
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Categories from "./pages/Categories";
import SearchSubcategories from "./pages/SearchSubcategories";
import SubcategoryProviders from "./pages/SubcategoryProviders";
import ServiceDetails from "./pages/ServiceDetails";
import HierarchyManagement from "./pages/admin/HierarchyManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/search/subcategories" element={<SearchSubcategories />} />
          <Route path="/subcategory/:subcategoryId/providers" element={<SubcategoryProviders />} />
          <Route path="/service/:serviceId" element={<ServiceDetails />} />
          <Route path="/admin/hierarchy" element={<HierarchyManagement />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
