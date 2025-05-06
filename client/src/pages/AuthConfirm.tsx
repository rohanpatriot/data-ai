import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../supabase-client";
import { Box, CircularProgress, Typography, Container, Alert } from "@mui/material";

const AuthConfirm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleTokenVerification = async () => {
      const tokenHash = searchParams.get("token_hash");
      const type = searchParams.get("type");
      const next = searchParams.get("next") || "/";

      if (tokenHash && type) {
        try {
          const { error } = await supabase.auth.verifyOtp({
            type: type as any, // Type assertion needed since EmailOtpType is not directly imported
            token_hash: tokenHash,
          });

          if (error) {
            console.error("Error verifying OTP:", error);
            setError(error.message);
          } else {
            // Successfully verified, redirect to the next page
            navigate(next);
          }
        } catch (err) {
          console.error("Exception during OTP verification:", err);
          setError("An unexpected error occurred during verification.");
        }
      } else {
        setError("Missing verification parameters.");
      }
    };

    handleTokenVerification();
  }, [searchParams, navigate]);

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          Authentication Error
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          {error}
        </Typography>
        <Typography variant="body2">
          Please try resetting your password again or contact support if the problem persists.
        </Typography>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <CircularProgress sx={{ mb: 4 }} />
      <Typography variant="h6">Verifying your request...</Typography>
    </Box>
  );
};

export default AuthConfirm;
