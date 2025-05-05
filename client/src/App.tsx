import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AnimatePresence>
          <Routes>
            {loading ? null : session ? (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/" element={<Navigate to="/projects" replace />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </>
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </ThemeProvider>
  );
  //   <CssBaseline />
  //   <BrowserRouter>
  //   <AnimatePresence>
  //     <Routes>
  //       <Route path="/login" element={<Login />} />
  //       <Route path="/signup" element={<Signup />} />
  //       <Route path="/forgot-password" element={<ForgotPassword />} />
  //       <Route path="/projects" element={<Projects />} />
  //       <Route path="/dashboard" element={<Dashboard />} />
  //       <Route path="/" element={<Navigate to="/login" replace />} />
  //       <Route path="*" element={<NotFound />} />
  //     </Routes>
  //     </AnimatePresence>
  //   </BrowserRouter>
  // </ThemeProvider>
  // )
}

export default App;
