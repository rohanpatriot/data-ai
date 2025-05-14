import React from "react";
import { Button, Box } from "@mui/material";
import { SupabaseClient } from "@supabase/supabase-js";
import { GoogleIcon } from "../../../shared/components/Icons";

interface GoogleLoginButtonProps {
  supabase: SupabaseClient;
  fullWidth?: boolean;
  signup?: boolean;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  supabase,
  fullWidth = true,
  signup = false,
}) => {
  return (
    <Button
      fullWidth={fullWidth}
      variant="outlined"
      color="secondary"
      startIcon={
        <Box sx={{ display: "flex" }}>
          <GoogleIcon />
        </Box>
      }
      onClick={() => {
        supabase.auth.signInWithOAuth({
          provider: "google",
        });
      }}
    >
      {signup ? "Sign up with Google" : "Log in with Google"}
    </Button>
  );
};

export default GoogleLoginButton;
