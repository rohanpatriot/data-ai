import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  SwipeableDrawer,
  useMediaQuery,
  useTheme,
  Box,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useEffect, ReactNode } from "react";

interface ResponsiveDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  actions?: ReactNode;
  children: ReactNode;
}

export const ResponsiveDialog = ({
  open,
  onClose,
  title,
  actions,
  children,
}: ResponsiveDialogProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (open && typeof document !== "undefined") {
      (document.activeElement as HTMLElement)?.blur?.();
    }
  }, [open]);

  return isMobile ? (
    <MobileDialogView
      open={open}
      onClose={onClose}
      title={title}
      actions={actions}
      children={children}
    />
  ) : (
    <DesktopDialogView
      open={open}
      onClose={onClose}
      title={title}
      actions={actions}
      children={children}
    />
  );
};

// ----- Mobile View (SwipeableDrawer) -----
const MobileDialogView = ({
  open,
  onClose,
  title,
  actions,
  children,
}: ResponsiveDialogProps) => (
  <SwipeableDrawer
    anchor="bottom"
    open={open}
    onClose={onClose}
    onOpen={() => {}}
    PaperProps={{
      sx: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        maxHeight: "80vh",
      },
    }}
  >
    <Box px={2} py={2}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography variant="h6">{title}</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseRoundedIcon />
        </IconButton>
      </Stack>

      <Box>{children}</Box>

      {actions && (
        <Stack direction="row" spacing={1} justifyContent="flex-end" mt={2}>
          {actions}
        </Stack>
      )}
    </Box>
  </SwipeableDrawer>
);

// ----- Desktop View (Dialog) -----
const DesktopDialogView = ({
  open,
  onClose,
  title,
  actions,
  children,
}: ResponsiveDialogProps) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle>{title}</DialogTitle>
    <DialogContent dividers>{children}</DialogContent>
    {actions && <DialogActions>{actions}</DialogActions>}
  </Dialog>
);
