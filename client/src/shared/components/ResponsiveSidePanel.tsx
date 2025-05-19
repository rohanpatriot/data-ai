import React, { ReactNode } from "react";
import {
  Box,
  SwipeableDrawer,
  Drawer,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";

interface ResponsiveSidePanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  rightSideContent?: ReactNode;
  children: ReactNode;
}

export const ResponsiveSidePanel: React.FC<ResponsiveSidePanelProps> = ({
  open,
  onClose,
  title,
  rightSideContent,
  children,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Styles
  const drawerPaperStyles = {
    width: isMobile ? "100%" : "510px",
    boxSizing: "border-box" as const,
    borderRadius: isMobile ? "16px 16px 0 0" : "20px 0 0 20px",
    maxHeight: isMobile ? "80vh" : "100%",
  };

  const containerStyles = {
    height: "100%",
    padding: isMobile ? 1.5 : 3,
    pt: isMobile ? 0 : 3,
    display: "flex",
    flexDirection: "column" as const,
  };

  const dragHandleStyles = {
    width: 40,
    height: 5,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 2.5,
    margin: "8px auto",
  };

  const contentAreaStyles = {
    overflowY: "auto" as const,
    flex: 1,
    mt: 1,
  };

  // Component to render based on screen size
  const DrawerComponent = isMobile ? SwipeableDrawer : Drawer;

  return (
    <DrawerComponent
      anchor={isMobile ? "bottom" : "right"}
      open={open}
      onClose={onClose}
      onOpen={() => {}}
      disableSwipeToOpen={false}
      swipeAreaWidth={isMobile ? 56 : 0}
      ModalProps={{
        keepMounted: true,
      }}
      PaperProps={{
        sx: drawerPaperStyles,
      }}
    >
      <Box sx={containerStyles}>
        {isMobile && <Box sx={dragHandleStyles} />}

        <Box
          sx={{
            p: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">{title}</Typography>
          {rightSideContent}
        </Box>

        <Box sx={contentAreaStyles}>{children}</Box>
      </Box>
    </DrawerComponent>
  );
};

export default ResponsiveSidePanel;
