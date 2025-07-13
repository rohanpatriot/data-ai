import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
  Card,
} from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../../../shared/components/Logo";
import SharedImage from "../components/SharedImage";
import { motion } from "motion/react";
import { supabase } from "../../../supabase-client";
import { CheckEmail } from "../../../shared/components/Icons";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        setLoading(true);
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) {
          console.error("Error sending reset password email:", error);
        } else {
          setSubmitted(true);
        }
      } catch (err) {
        console.error("Exception when sending reset password email:", err);
      }
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
        {/* Left Section - Background Image */}
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
        {/* Right Section */}
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
          <Box sx={{ mb: 8, mt: 2 }}>
            <Logo />
          </Box>

          <Box
            sx={{
              maxWidth: 480,
              width: "100%",
              marginRight: "auto",
              marginLeft: "0",
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{ fontWeight: "bold", mb: 1, textAlign: "start" }}
            >
              Reset your password
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", mb: 4, textAlign: "start" }}
            >
              Enter your email and we'll send you instructions to reset your
              password.
            </Typography>

            {!submitted ? (
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
                  />
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{ mb: 2 }}
                >
                  {loading ? "Sending..." : "Send reset link"}
                </Button>

                <MuiLink component={Link} to="/login">
                  Back to login
                </MuiLink>
              </Box>
            ) : (
              <Card sx={{ textAlign: "center" }}>
                <CheckEmail />
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                  Check your email
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", mb: 4 }}
                >
                  We've sent a password reset link to {email}
                </Typography>
                <MuiLink component={Link} to="/login" underline="none">
                  Back to login
                </MuiLink>
              </Card>
            )}
          </Box>
        </Box>
      </Container>
    </motion.div>
  );
};

export default ForgotPasswordPage;
