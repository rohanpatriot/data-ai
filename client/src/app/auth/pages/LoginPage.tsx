import {
  Container,
  Box,
  Typography,
  Divider,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Logo from "../../../shared/components/Logo";
import SharedImage from "../components/SharedImage";
import GoogleLoginButton from "../components/GoogleLoginButton";
import EmailPasswordForm from "../components/EmailPasswordForm";
import { useLogin } from "../hooks/useLogin";
import { supabase } from "../../../supabase-client";

const LoginPage = () => {
  const {
    email,
    password,
    setEmail,
    setPassword,
    handleSubmit,
    loading,
    error,
  } = useLogin();

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
            width: { xs: "100%", md: "50%" },
            p: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ mb: 5, mt: 2, display: "flex", justifyContent: "center" }}>
            <Logo />
          </Box>

          <Box sx={{ width: "100%", maxWidth: "420px", mx: "auto" }}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Log in
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Enter your credentials to access your account.
            </Typography>

            <GoogleLoginButton supabase={supabase} />

            <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
              <Divider sx={{ flex: 1 }} />
              <Typography variant="body2" sx={{ px: 2 }} color="text.secondary">
                or log in with email
              </Typography>
              <Divider sx={{ flex: 1 }} />
            </Box>

            <EmailPasswordForm
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              handleSubmit={handleSubmit}
              loading={loading}
              error={error}
            />

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ display: "inline" }}>
                Don’t have an account?
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

        <Box
          sx={{ width: "50%", display: { xs: "none", md: "block" }, p: "2.5%" }}
        >
          <SharedImage />
        </Box>
      </Container>
    </motion.div>
  );
};

export default LoginPage;
