import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import TodayPage from "./pages/Today";
import TasksPage from "./pages/Tasks";
import HabitsPage from "./pages/Habits";
import WeeklyReviewPage from "./pages/WeeklyReview";
import WeeklyArchivePage from "./pages/WeeklyArchive";
import WeeklyArchiveDetailPage from "./pages/WeeklyArchiveDetail";
import AccountPage from "./pages/Account";
import LoginPage from "./pages/Login";
import PaywallPage from "./pages/Paywall";
import NotFound from "./pages/NotFound";
import { seedDemoData } from "./lib/seedData";

// Seed demo data for archive preview
seedDemoData();

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/pricing" element={<PaywallPage />} />
          <Route element={<AppLayout />}>
            <Route path="/app" element={<TodayPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/habits" element={<HabitsPage />} />
            <Route path="/weekly" element={<WeeklyReviewPage />} />
            <Route path="/weekly/archive" element={<WeeklyArchivePage />} />
            <Route path="/weekly/archive/:weekStart" element={<WeeklyArchiveDetailPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Route>
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
