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
import { Link } from "react-router-dom";
import Logo from "../../../shared/components/Logo";
import { motion } from "motion/react";
import { supabase } from "../../../supabase-client";
import GoogleLoginButton from "../components/GoogleLoginButton";
import SignupDialog from "../components/SignupDialog";
import SharedImage from "../components/SharedImage";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("Signup error:", error.message);
        setError(error.message);
      } else if (data.user) {
        setShowConfirmation(true);
      }
    } catch (err) {
      console.error("Exception during signup:", err);
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
        <Box
          sx={{
            width: "50%",
            p: 4,
            marginLeft: "auto",
            marginRight: "auto",
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

          <Box sx={{ width: "100%", maxWidth: "420px", mx: "auto" }}>
            <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
              Sign up
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, textAlign: "start" }}
            >
              Enter your credentials to access your account.
            </Typography>

            <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
              <GoogleLoginButton supabase={supabase} signup={true} />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
              <Divider sx={{ flex: 1 }} />
              <Typography
                variant="body2"
                component="span"
                color="text.secondary"
                sx={{ px: 2 }}
              >
                or sign up with email
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
                {loading ? "Signing up..." : "Sign up"}
              </Button>
              <Box sx={{ textAlign: "start", mt: 2 }}>
                <Typography variant="body2" sx={{ display: "inline" }}>
                  Already have an account?
                </Typography>
                <MuiLink
                  component={Link}
                  to="/login"
                  color="primary"
                  sx={{ ml: 0.5 }}
                >
                  Log in
                </MuiLink>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{ width: "50%", display: { xs: "none", md: "block" }, p: "2.5%" }}
        >
          <SharedImage />
        </Box>
      </Container>
      <SignupDialog
        showConfirmation={showConfirmation}
        setShowConfirmation={setShowConfirmation}
        email={email}
      />
    </motion.div>
  );
};

export default SignupPage;
