
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TeacherProfile from "./components/teacher/TeacherProfile";
import AssignmentManagement from "./pages/AssignmentManagement";
import BulkAssignmentHub from './pages/BulkAssignmentHub';
import AnalyticsDashboard from "./pages/AnalyticsDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/teacher/:id" element={<TeacherProfile />} />
          <Route path="/assignment-management" element={<AssignmentManagement />} />
          <Route path="/assignments" element={<AssignmentManagement />} />
          <Route path="/bulk-assignment" element={<BulkAssignmentHub />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
