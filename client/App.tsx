import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

import Index from "./pages/Index";
import ChooseTemplate from "./pages/ChooseTemplate";
import FormBuilder from "./pages/FormBuilder";
import DocumentVerification from "./pages/DocumentVerification";
import BiometricVerification from "./pages/BiometricVerification";
import Preview from "./pages/Preview";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />

          <Route path="/home" element={<Index />} />
          <Route path="/choose-template" element={<ChooseTemplate />} />
          <Route path="/form-builder" element={<FormBuilder />} />
          <Route
            path="/document-verification"
            element={<DocumentVerification />}
          />
          <Route
            path="/biometric-verification"
            element={<BiometricVerification />}
          />
          <Route path="/preview" element={<Preview />} />


        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
