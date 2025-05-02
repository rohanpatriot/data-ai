import './App.css'
//pages
import Login from './pages/Login'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import NotFound from './pages/NotFound';
import ForgotPassword from './pages/ForgotPassword';
import { AnimatePresence } from 'motion/react';
import Projects from './pages/Projects';

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
    <AnimatePresence>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/projects" element={<Projects />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}

         <Route path="/" element={<Navigate to="/login" replace />} />
         <Route path="*" element={<NotFound />} />
      </Routes>
      </AnimatePresence>
    </BrowserRouter>
  </ThemeProvider>
  )
}

export default App
