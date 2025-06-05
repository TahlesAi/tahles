
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UnifiedEventProvider } from "@/context/UnifiedEventContext";
import Index from "./pages/Index";
import AdminDashboard from "./components/admin/AdminDashboard";

// Lazy loading for better performance
const LegacyDataFreeze = lazy(() => import("./pages/admin/LegacyDataFreeze"));
const SystemMigration = lazy(() => import("./pages/admin/SystemMigration"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <UnifiedEventProvider>
          <Toaster />
          <BrowserRouter>
            <div className="min-h-screen">
              <Suspense fallback={<div className="flex items-center justify-center h-screen">טוען...</div>}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/legacy-freeze" element={<LegacyDataFreeze />} />
                  <Route path="/admin/system-migration" element={<SystemMigration />} />
                </Routes>
              </Suspense>
            </div>
          </BrowserRouter>
        </UnifiedEventProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
