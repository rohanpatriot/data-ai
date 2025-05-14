import {
  Box,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";

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
    <Box sx={{ mb: 2.5 }}>
      <Typography
        variant="body1"
        component="label"
        htmlFor="email"
        sx={{ display: "block", mb: 1, fontWeight: 500 }}
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
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography
          variant="body1"
          component="label"
          htmlFor="password"
          sx={{ fontWeight: 500 }}
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
        <Typography variant="caption" color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </Box>

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
