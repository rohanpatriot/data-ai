import { Box, Typography, Button, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import CustomTextField from "../../../shared/components/CustomTextField";

const EmailPasswordForm = ({
  email,
  password,
  setEmail,
  setPassword,
  handleSubmit,
  loading,
  error,
}: {
  email: string;
  password: string;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string;
}) => (
  <Box component="form" onSubmit={handleSubmit}>
    <CustomTextField
      id="email"
      label="Email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <CustomTextField
      id="password"
      type="password"
      label="Password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      helperLink={
        <MuiLink
          component={Link}
          to="/forgot-password"
          color="primary"
          sx={{ fontSize: "0.875rem" }}
        >
          Forgot password?
        </MuiLink>
      }
      sx={{ mb: 1 }}
    />

    {error && (
      <Typography variant="caption" color="error" sx={{ mt: 1 }}>
        {error}
      </Typography>
    )}

    <Button
      type="submit"
      fullWidth
      variant="contained"
      disabled={loading}
      sx={{ mt: 4 }}
    >
      {loading ? "Logging in..." : "Log in"}
    </Button>
  </Box>
);

export default EmailPasswordForm;
