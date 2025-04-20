
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AcademicProgress from "./pages/AcademicProgress";
import CoursePlanning from "./pages/CoursePlanning";
import StudentProfile from "./pages/StudentProfile";
import AdvisorProfile from "./pages/AdvisorProfile";
import MessagesPage from "./pages/MessagesPage";
import AdvisingSessionsPage from "./pages/AdvisingSessionsPage";
import { Layout } from "./components/layout/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/academic-progress" element={
            <Layout userRole="student">
              <AcademicProgress />
            </Layout>
          } />
          <Route path="/course-planning" element={
            <Layout userRole="student">
              <CoursePlanning />
            </Layout>
          } />
          <Route path="/profile" element={
            <Layout userRole="student">
              <StudentProfile />
            </Layout>
          } />
          <Route path="/advisor-profile" element={
            <Layout userRole="advisor">
              <AdvisorProfile />
            </Layout>
          } />
          <Route path="/messages" element={
            <Layout userRole="student">
              <MessagesPage />
            </Layout>
          } />
          <Route path="/advising-sessions" element={
            <Layout userRole="student">
              <AdvisingSessionsPage />
            </Layout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
