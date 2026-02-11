import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Suspense, lazy, useEffect } from "react";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Individual = lazy(() => import("./pages/Individual"));
const Business = lazy(() => import("./pages/Business"));
const Portrait = lazy(() => import("./pages/Portrait"));

const queryClient = new QueryClient();

// Component to signal prerender readiness after hydration
const PrerenderReady = () => {
  useEffect(() => {
    // Dispatch event for prerenderer after initial render
    const timer = setTimeout(() => {
      document.dispatchEvent(new Event('prerender-ready'));
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <PrerenderReady />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/individual" element={<Individual />} />
            <Route path="/business" element={<Business />} />
            <Route path="/portrait" element={<Portrait />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
