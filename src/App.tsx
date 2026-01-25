import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { HelmetProvider } from "react-helmet-async";
import { Suspense, lazy, useEffect } from "react";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PublicCourses = lazy(() => import("./pages/PublicCourses"));
const CorporateWellness = lazy(() => import("./pages/CorporateWellness"));
const PortraitPhotography = lazy(() => import("./pages/PortraitPhotography"));

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
  <HelmetProvider>
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
              <Route path="/individual" element={<PublicCourses />} />
              <Route path="/business" element={<CorporateWellness />} />
              <Route path="/portrait" element={<PortraitPhotography />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
