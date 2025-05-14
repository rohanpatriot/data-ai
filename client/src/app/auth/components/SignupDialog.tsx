import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface SignupDialogProps {
  showConfirmation: boolean;
  setShowConfirmation: (show: boolean) => void;
  email: string;
}

const SignupDialog: React.FC<SignupDialogProps> = ({
  showConfirmation,
  setShowConfirmation,
  email,
}) => {
  const navigate = useNavigate();

  return (
    <Dialog open={showConfirmation} onClose={() => setShowConfirmation(false)}>
      <DialogTitle>Check your email</DialogTitle>
      <DialogContent>
        <DialogContentText>
          A confirmation link has been sent to <strong>{email}</strong>. Please
          check your inbox to verify your account.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => navigate("/login")}
          color="primary"
          variant="contained"
        >
          Go to Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignupDialog;
