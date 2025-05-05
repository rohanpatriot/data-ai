import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Link as MuiLink,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import SharedImage from "../components/SharedImage";
import { motion } from "motion/react";
import { supabase } from "../supabase-client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log(error.message);
    }
    // TODO Authentication logic here
    // For now, just navigate to projects page if email and password are provided
    // do we use oauth? what do you suggest? let's talk monday.
    if (email && password) {
      navigate("/projects");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container
        maxWidth="xl"
        disableGutters
        sx={{ minHeight: "100vh", display: "flex" }}
      >
        {/* Left Section */}
        <Box
          sx={{
            width: "50%",
            p: 4,
            display: "flex",
            flexDirection: "column",
            "@media (max-width: 900px)": {
              width: "100%",
            },
          }}
        >
          <Box sx={{ mb: 5, mt: 2, display: "flex", justifyContent: "center" }}>
            <Logo />
          </Box>

          <Box sx={{ maxWidth: 480, width: "100%", mx: "auto" }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{ fontWeight: "none", mb: 1, textAlign: "start" }}
            >
              Log in
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", mb: 4, textAlign: "start" }}
            >
              Enter your credentials to access your account.
            </Typography>

            <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={
                  <Box
                    component="span"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <svg width="18" height="18" viewBox="0 0 48 48">
                      <path
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                      />
                      <path
                        fill="#4285F4"
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                      />
                      <path
                        fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                      />
                      <path fill="none" d="M0 0h48v48H0z" />
                    </svg>
                  </Box>
                }
                sx={{
                  textTransform: "none",
                  borderColor: "divider",
                  color: "#000",

                  borderRadius: 2,
                  py: 1.5,
                  "&:hover": {
                    borderColor: "text.secondary",
                    backgroundColor: "transparent",
                  },
                }}
                onClick={() => {
                  supabase.auth.signInWithOAuth({
                    provider: "google",
                  });
                }}
              >
                Log in with Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={
                  <Box
                    component="span"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 170 170"
                      fill="black"
                    >
                      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929 0.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.378 0-10.857 2.346-20.221 7.045-28.068 3.693-6.303 8.606-11.275 14.755-14.925s12.793-5.51 19.948-5.629c3.915 0 9.049 1.211 15.429 3.591 6.362 2.388 10.447 3.599 12.238 3.599 1.339 0 5.877-1.416 13.57-4.239 7.275-2.618 13.415-3.702 18.445-3.275 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.386-18.22 17.731-18.1 31.002 0.11 10.337 3.86 18.939 11.23 25.769 3.34 3.17 7.07 5.62 11.22 7.36-0.9 2.61-1.85 5.11-2.86 7.51zM119.11 7.24c0 8.102-2.96 15.667-8.86 22.669-7.12 8.324-15.732 13.134-25.071 12.375-0.119-0.972-0.188-1.995-0.188-3.07 0-7.778 3.386-16.102 9.399-22.908 3.002-3.446 6.82-6.311 11.45-8.597 4.62-2.252 8.99-3.497 13.1-3.71 0.12 1.083 0.17 2.166 0.17 3.24z" />
                    </svg>
                  </Box>
                }
                sx={{
                  textTransform: "none",
                  color: "#000",
                  borderColor: "divider",
                  borderRadius: 2,
                  py: 1.5,
                  "&:hover": {
                    borderColor: "text.secondary",
                    backgroundColor: "transparent",
                  },
                }}
              >
                Log in with Apple
              </Button>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
              <Divider sx={{ flex: 1 }} />
              <Typography
                variant="body2"
                component="span"
                sx={{ px: 2, color: "text.secondary" }}
              >
                or log in with email
              </Typography>
              <Divider sx={{ flex: 1 }} />
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Box sx={{ mb: 2.5 }}>
                <Typography
                  variant="body1"
                  component="label"
                  htmlFor="email"
                  sx={{
                    display: "block",
                    mb: 1,
                    fontWeight: 500,
                    textAlign: "start",
                  }}
                >
                  Email
                </Typography>
                <TextField
                  fullWidth
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  InputProps={{
                    sx: {
                      borderRadius: 2,
                    },
                  }}
                />
              </Box>
              <Box sx={{ mb: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    component="label"
                    htmlFor="password"
                    sx={{ fontWeight: 500, textAlign: "start" }}
                  >
                    Password
                  </Typography>
                  <MuiLink
                    component={Link}
                    to="/forgot-password"
                    underline="none"
                    sx={{ color: "hsl(var(--primary))", fontSize: "0.875rem" }}
                  >
                    Forgot password?
                  </MuiLink>
                </Box>
                <TextField
                  fullWidth
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"
                  InputProps={{
                    sx: {
                      borderRadius: 2,
                    },
                  }}
                />
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 4,
                  mb: 2,
                  py: 1.5,
                  borderRadius: 2,
                  backgroundColor: "hsl(var(--primary))",
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "1rem",
                  "&:hover": {
                    backgroundColor: "#8200FF",
                  },
                }}
              >
                Log in
              </Button>
              <Box sx={{ textAlign: "start", mt: 2 }}>
                <Typography variant="body2" sx={{ display: "inline" }}>
                  Don't have an account?
                </Typography>
                <MuiLink
                  component={Link}
                  to="/signup"
                  underline="none"
                  sx={{
                    ml: 0.5,
                    color: "hsl(var(--primary))",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                  }}
                >
                  Sign up
                </MuiLink>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Right Section - Background Image */}
        <Box
          sx={{
            width: "50%",
            position: "relative",
            display: { xs: "none", md: "block" },
            padding: "2.5%",
          }}
        >
          <motion.div
            initial={{ x: -500 }}
            animate={{ x: 0 }}
            exit={{ x: 500 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <SharedImage />
          </motion.div>
        </Box>
      </Container>
    </motion.div>
  );
};
export default Login;
