import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme"; // Import the new theme
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import { AnimatePresence } from "motion/react";
import Projects from "./pages/Projects";
import { useEffect, useState } from "react";
import { supabase } from "./supabase-client";
import { Session } from "@supabase/supabase-js";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import UpdateUser from "./pages/UpdateUser";
import AuthConfirm from "./pages/AuthConfirm"; // Add this import
import Loading from "./pages/Loading";
import ProtectedRoute from "./components/ProtectedRoute";

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

  console.log("Current state:", { session, loading });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AnimatePresence>
          <Routes>
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
