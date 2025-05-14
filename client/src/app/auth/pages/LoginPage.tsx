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
import Logo from "../../../shared/components/Logo";
import SharedImage from "../components/SharedImage";
import { motion } from "motion/react";
import { supabase } from "../../../supabase-client";
import GoogleLoginButton from "../components/GoogleLoginButton";
import AppleLoginButton from "../components/AppleLoginButton";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error.message);
        setError(error.message);
      } else if (data.user) {
        navigate("/projects");
      }
    } catch (err) {
      console.error("Exception during login:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
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
              sx={{ mb: 1, textAlign: "start" }}
            >
              Log in
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, textAlign: "start" }}
            >
              Enter your credentials to access your account.
            </Typography>

            <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
              <GoogleLoginButton supabase={supabase} />
              <AppleLoginButton supabase={supabase} />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
              <Divider sx={{ flex: 1 }} />
              <Typography
                variant="body2"
                component="span"
                color="text.secondary"
                sx={{ px: 2 }}
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
                    color="primary"
                    sx={{ fontSize: "0.875rem" }}
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
                />
                {error && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ display: "block", mt: 1, textAlign: "start" }}
                  >
                    {error}
                  </Typography>
                )}
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ mt: 4 }}
              >
                {loading ? "Logging in..." : "Log in"}
              </Button>
              <Box sx={{ textAlign: "start", mt: 2 }}>
                <Typography variant="body2" sx={{ display: "inline" }}>
                  Don't have an account?
                </Typography>
                <MuiLink
                  component={Link}
                  to="/signup"
                  color="primary"
                  sx={{ ml: 0.5 }}
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
          <SharedImage />
        </Box>
      </Container>
    </motion.div>
  );
};

export default LoginPage;
