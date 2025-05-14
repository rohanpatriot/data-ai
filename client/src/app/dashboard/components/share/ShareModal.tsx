import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface EmailItem {
  id: string;
  email: string;
}

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const [email, setEmail] = useState("");
  const [collaborators, setCollaborators] = useState<EmailItem[]>([
  ]);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({ open: false, message: "", severity: "success" });

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "info" | "warning" = "success"
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleAddCollaborator = () => {
    if (!email.trim() || !email.includes("@")) {
      showSnackbar("Please enter a valid email address.", "error");
      return;
    }

    if (collaborators.some((c) => c.email === email)) {
      showSnackbar("This user has already been invited.", "error");
      return;
    }

    setCollaborators([...collaborators, { id: Date.now().toString(), email }]);
    setEmail("");
    showSnackbar(`${email} has been invited to collaborate.`, "success");
  };

  const handleRemoveCollaborator = (id: string) => {
    setCollaborators(collaborators.filter((c) => c.id !== id));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    showSnackbar("Board link has been copied to clipboard", "info");
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "16px",
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        <DialogTitle sx={{ pb: 0, position: "relative" }}>
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: "bold", fontSize: "24px" }}
          >
            Share Board
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Invite others to view and collaborate on this board.
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
            <TextField
              fullWidth
              placeholder="Enter an email address"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddCollaborator()}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "28px",
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleAddCollaborator}
              sx={{
                borderRadius: "28px",
                textTransform: "none",
                backgroundColor: "#9871F5",
                fontWeight: "500",
                "&:hover": {
                  backgroundColor: "#8761E5",
                },
                minWidth: "120px",
              }}
            >
              Invite
            </Button>
          </Box>

          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Shared with:
          </Typography>

          <Box
            sx={{
              maxHeight: "300px",
              overflowY: "auto",
              mb: 3,
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#E0E0E0",
                borderRadius: "4px",
              },
            }}
          >
            <List disablePadding>
              {collaborators.map((collaborator) => (
                <ListItem
                  key={collaborator.id}
                  sx={{
                    borderRadius: "4px",
                    mb: 1,
                    backgroundColor: "#f5f5f5",
                    p: 1,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  disablePadding
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="remove"
                      onClick={() => handleRemoveCollaborator(collaborator.id)}
                    >
                      <CloseIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={collaborator.email} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Button
            variant="text"
            startIcon={<ContentCopyIcon />}
            onClick={handleCopyLink}
            sx={{
              backgroundColor: "#f5f5f5",
              color: "#000",
              borderRadius: "28px",
              textTransform: "none",
              p: "10px 20px",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            Copy Link
          </Button>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="standard"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}