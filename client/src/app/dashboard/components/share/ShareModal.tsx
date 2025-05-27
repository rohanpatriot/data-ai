import { useEffect, useState } from "react";
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
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useProjectShare } from "../../hooks/useProjectShares";
import { supabase } from "../../../../supabase-client";
import { shareInvitationTemplate } from "../../util/emailUtil";
import { useProjects } from "../../../projects/hooks/useProjects";


interface EmailItem {
  id: string;
  email: string;
}

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

export default function ShareModal({ isOpen, onClose, projectId }: ShareModalProps) {
  const [email, setEmail] = useState("");
  const { createShareLink } = useProjectShare(projectId);
  const { getSharedWith, updateSharedWith } = useProjects();
  const [collaborators, setCollaborators] = useState<EmailItem[]>([
  ]);
  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
          const sharedEmails = await getSharedWith(projectId);
          setCollaborators(sharedEmails.map((email: string) => ({ id: Date.now().toString(), email })));
        } catch (error) {
        console.error("Failed to fetch collaborators:", error);
        showSnackbar("Failed to load collaborators", "error");
      }
    };
    if (isOpen && projectId) {
      fetchCollaborators();
    }
  }, [isOpen, projectId]);

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

  const handleAddCollaborator = async () => {
    if (!email.trim() || !email.includes("@")) {
      showSnackbar("Please enter a valid email address.", "error");
      return;
    }

    if (collaborators.some((c) => c.email === email)) {
      showSnackbar("This user has already been invited.", "error");
      return;
    }

    const newCollaborators = [...collaborators, { id: email, email }];
    setCollaborators(newCollaborators);
    try {
      await updateSharedWith(projectId, newCollaborators.map(c => c.email));
      showSnackbar(`${email} has been invited to collaborate.`, "success");
      handleSendEmail(email);
      setEmail("");
    } catch (error) {
      console.error("Failed to add collaborator:", error);
      showSnackbar("Failed to add collaborator", "error");
      // Revert state if update fails
      setCollaborators(collaborators);
    }
  };

  const handleRemoveCollaborator = async (id: string) => {
    const updatedCollaborators = collaborators.filter((c) => c.id !== id);
    setCollaborators(updatedCollaborators);
    try {
      await updateSharedWith(projectId, updatedCollaborators.map(c => c.email));
      showSnackbar(`Collaborator ${id} removed.`, "success");
    } catch (error) {
      console.error("Failed to remove collaborator:", error);
      showSnackbar("Failed to remove collaborator", "error");
      // Revert state if update fails
      setCollaborators(collaborators);
    }
  };

  const handleSendEmail = async (email: string) => {
    try {
      const url = await createShareLink();
      if (!url) {
        showSnackbar("Failed to create share link", "error");
        return;
      }
      
      const { data, error } = await supabase
        .functions
        .invoke('send-share-email', { 
          body: {
            email: email,
            subject: 'You\'ve been invited to view a PerplexiGrid project!',
            html: shareInvitationTemplate(url)
          }
        });
      
      console.debug(data); 
      if (error) throw error;
      showSnackbar(`Share link sent to ${email}`, "success");
    } catch (err) {
      console.error("Failed to send email:", err);
      showSnackbar("Failed to send email", "error");
    }
  };

  const handleCopyLink = async () => {
    const url = await createShareLink();
    if(url === null) {
      showSnackbar("Failed to create share link", "error");
      return;
    }
    navigator.clipboard.writeText(url);
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
            Invite Collaborators <Chip
                      label="Coming Soon!"
                      size="small"
                      color="primary"
                      icon={<AutoAwesomeIcon />}
                      sx={{
                        ml: 1,
                        mb: 1,
                        bgcolor: "#f0e6ff",
                        color: "#A224F0",
                        fontWeight: 500,
                        fontSize: "0.7rem",
                        height: 32,
                        borderRadius: 2,
                      }}
                    />
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
            Invite others to view and collaborate on this board. Is coming soon!
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Invite to readonly access for now:
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
            <TextField
              fullWidth
              placeholder="Enter an email address to"
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