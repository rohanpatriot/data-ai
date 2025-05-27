import Login from "./app/auth/pages/LoginPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme/theme"; // Import the new theme
import NotFound from "./shared/pages/NotFoundPage";
import ForgotPassword from "./app/auth/pages/ForgotPasswordPage";
import { AnimatePresence } from "motion/react";
import Projects from "./app/projects/pages/ProjectsPage";
import { useEffect, useState } from "react";
import { supabase } from "./supabase-client";
import { Session } from "@supabase/supabase-js";
import Dashboard from "./app/dashboard/pages/DashboardPage";
import Signup from "./app/auth/pages/SignupPage";
import UpdateUser from "./app/auth/pages/UpdateUserPage";
import AuthConfirm from "./app/auth/pages/AuthConfirmPage";
import Loading from "./shared/pages/LoadingPage";
import ProtectedRoute from "./app/auth/components/ProtectedRoute";
import SharedProject from "./app/projects/pages/SharedProjectPage";

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    initAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setLoading(true);
        setSession(session);
        setLoading(false);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AnimatePresence>
          <Routes>
            <Route path="/share/:token" element={<SharedProject />} />
            <Route path="/auth/confirm" element={<AuthConfirm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/account/update-password" element={<UpdateUser />} />
            <Route path="/loading" element={<Loading />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                loading ? (
                  <Loading />
                ) : (
                  <ProtectedRoute session={session}>
                      <Dashboard />
                  </ProtectedRoute>
                )
              }
            />
            <Route
              path="/projects"
              element={
                loading ? (
                  <Loading />
                ) : (
                  <ProtectedRoute session={session}>
                    <Projects />
                  </ProtectedRoute>
                )
              }
            />
            <Route
              path="/"
              element={
                loading ? (
                  <Loading />
                ) : session ? (
                  <Navigate to="/projects" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
