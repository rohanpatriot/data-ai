import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Box,
  CircularProgress,
} from "@mui/material";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import { AnimatePresence } from "motion/react";
import Projects from "./pages/Projects";
import { useEffect, useState } from "react";
import { supabase } from "./supabase-client";
import { Session } from "@supabase/supabase-js";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

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
        setSession(session);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // For debugging
  console.log("Current state:", { session, loading });

  // Loading component
  const LoadingScreen = () => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress sx={{ color: "hsl(var(--primary))" }} />
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AnimatePresence>
          {loading ? (
            <LoadingScreen />
          ) : (
            <Routes>
              {/* Always include both sets of routes, but use Navigate to redirect */}
              <Route
                path="/dashboard"
                element={
                  session ? <Dashboard /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/projects"
                element={
                  session ? <Projects /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/login"
                element={
                  !session ? <Login /> : <Navigate to="/projects" replace />
                }
              />
              <Route
                path="/signup"
                element={
                  !session ? <Signup /> : <Navigate to="/projects" replace />
                }
              />
              <Route
                path="/forgot-password"
                element={
                  !session ? (
                    <ForgotPassword />
                  ) : (
                    <Navigate to="/projects" replace />
                  )
                }
              />
              <Route
                path="/"
                element={
                  <Navigate to={session ? "/projects" : "/login"} replace />
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </AnimatePresence>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
