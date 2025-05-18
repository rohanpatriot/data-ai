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
import { motion } from "motion/react";
import { supabase } from "../../../supabase-client";

import Logo from "../../../shared/components/Logo";
import GoogleLoginButton from "../components/GoogleLoginButton";
import SignupDialog from "../components/SignupDialog";
import SharedImage from "../components/SharedImage";

type SignupFormValues = {
  email: string;
  password: string;
};

const SignupPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signUp(form);

      if (error) throw new Error(error.message);
      if (data?.user) setShowConfirmation(true);
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.message || "An unexpected error occurred.");
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
        <SignupFormSection
          form={form}
          error={error}
          loading={loading}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <Box
          sx={{ width: "50%", display: { xs: "none", md: "block" }, p: "2.5%" }}
        >
          <SharedImage />
        </Box>
      </Container>

      <SignupDialog
        showConfirmation={showConfirmation}
        setShowConfirmation={setShowConfirmation}
        email={form.email}
      />
    </motion.div>
  );
};

type SignupFormSectionProps = {
  form: SignupFormValues;
  error: string;
  loading: boolean;
  onChange: (
    field: keyof SignupFormValues
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const SignupFormSection: React.FC<SignupFormSectionProps> = ({
  form,
  error,
  loading,
  onChange,
  onSubmit,
}) => (
  <Box
    sx={{
      width: "50%",
      p: 4,
      mx: "auto",
      display: "flex",
      flexDirection: "column",
      "@media (max-width: 900px)": { width: "100%" },
    }}
  >
    <Box sx={{ mb: 5, mt: 2, display: "flex", justifyContent: "center" }}>
      <Logo />
    </Box>

    <Box sx={{ width: "100%", maxWidth: 420, mx: "auto" }}>
      <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
        Sign up
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Enter your credentials to create your account.
      </Typography>

      <GoogleLoginButton supabase={supabase} signup />

      <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
        <Divider sx={{ flex: 1 }} />
        <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
          or sign up with email
        </Typography>
        <Divider sx={{ flex: 1 }} />
      </Box>

      <Box component="form" onSubmit={onSubmit}>
        <FormField
          id="email"
          label="Email"
          value={form.email}
          onChange={onChange("email")}
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          value={form.password}
          onChange={onChange("password")}
          error={error}
        />

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

        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?
          <MuiLink
            component={Link}
            to="/login"
            color="primary"
            sx={{ ml: 0.5 }}
          >
            Log in
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  </Box>
);

const FormField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  error = "",
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) => (
  <Box sx={{ mb: 2.5 }}>
    <Typography
      variant="body1"
      component="label"
      htmlFor={id}
      sx={{ display: "block", mb: 1, fontWeight: 500 }}
    >
      {label}
    </Typography>
    <TextField
      fullWidth
      id={id}
      type={type}
      placeholder={label}
      value={value}
      onChange={onChange}
      variant="outlined"
    />
    {id === "password" && error && (
      <Typography variant="caption" color="error" sx={{ mt: 1 }}>
        {error}
      </Typography>
    )}
  </Box>
);

export default SignupPage;
