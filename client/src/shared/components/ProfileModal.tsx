import React from "react";
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Avatar,
  Typography,
} from "@mui/material";
import { ResponsiveDialog } from "./ResponsiveDialog";

interface ProfileProps {
  open: boolean;
  onClose: () => void;
  user: {
    email: string;
    avatar_url: string;
  };
}

const ProfileModal: React.FC<ProfileProps> = ({ open, onClose, user }) => {
  if (!open) return null;

  return (
    <ResponsiveDialog open={open} onClose={onClose} title="My profile">
      <DialogTitle variant="h5">My profile</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={user.avatar_url}
              alt="User Avatar"
              sx={{ width: 40, height: 40, mr: 2 }}
            />
            <Box>
              <Typography
                sx={{ color: "black", fontWeight: 300 }}
                variant="body1"
              >
                {user.email}
              </Typography>
            </Box>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Close
        </Button>
      </DialogActions>
    </ResponsiveDialog>
  );
};

export default ProfileModal;
