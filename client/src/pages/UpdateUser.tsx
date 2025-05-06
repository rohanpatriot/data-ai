import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import SharedImage from "../components/SharedImage";
import { supabase } from "../supabase-client";
import { motion } from "motion/react";

const UpdateUser = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // Get the user's email from the session when the component mounts
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user?.email) {
        setEmail(data.session.user.email);
      } else {
        // If no session is found, redirect to login
        navigate("/login");
      }
    };

    getUser();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
        // Redirect to projects after 3 seconds
        setTimeout(() => {
          navigate("/projects");
        }, 3000);
      }
    } catch (err) {
      console.error("Error updating password:", err);
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
            position: "relative",
            background: "#fff",
            display: { xs: "none", md: "block" },
            padding: "2.5%",
          }}
        >
          <motion.div
            initial={{ x: 500 }}
            animate={{ x: 0 }}
            exit={{ x: -500 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <SharedImage />
          </motion.div>
        </Box>
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
              Update your password
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", mb: 4, textAlign: "start" }}
            >
              {email
                ? `Create a new password for ${email}`
                : "Create a new password for your account"}
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {success ? (
              <Box sx={{ mt: 4, textAlign: "center" }}>
                <Box
                  component="div"
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    bgcolor: "#f0e6ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    mb: 3,
                  }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="#B066FF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                  Password updated
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", mb: 4 }}
                >
                  Your password has been updated successfully. Redirecting...
                </Typography>
                <MuiLink
                  component={Link}
                  to="/projects"
                  underline="none"
                  sx={{
                    color: "hsl(var(--primary))",
                    fontSize: "0.875rem",
                  }}
                >
                  Go to projects
                </MuiLink>
              </Box>
            ) : (
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Box sx={{ mb: 2.5 }}>
                  <Typography
                    variant="body1"
                    component="label"
                    htmlFor="password"
                    sx={{
                      display: "block",
                      mb: 1,
                      fontWeight: 500,
                      textAlign: "start",
                    }}
                  >
                    New Password
                  </Typography>
                  <TextField
                    fullWidth
                    id="password"
                    type="password"
                    placeholder="Enter new password"
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

                <Box sx={{ mb: 2.5 }}>
                  <Typography
                    variant="body1"
                    component="label"
                    htmlFor="confirmPassword"
                    sx={{
                      display: "block",
                      mb: 1,
                      fontWeight: 500,
                      textAlign: "start",
                    }}
                  >
                    Confirm Password
                  </Typography>
                  <TextField
                    fullWidth
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                  disabled={loading}
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
                  {loading ? "Updating..." : "Update Password"}
                </Button>

                <Box sx={{ textAlign: "start", mt: 1 }}>
                  <MuiLink component={Link} to="/projects" underline="none">
                    Cancel
                  </MuiLink>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </motion.div>
  );
};

export default UpdateUser;
