import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Card,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import RateReviewIcon from "@mui/icons-material/RateReview";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";

interface WidgetBaseProps {
  children: React.ReactNode;
  onDelete?: () => void;
  title?: string;
  showMoreMenu?: boolean;
}

const WidgetBase: React.FC<WidgetBaseProps> = ({
  children,
  onDelete,
  title,
  showMoreMenu = true,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showContent, setShowContent] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!widgetRef.current) return;

    const observer = new window.ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setShowContent(true);
        }
      }
    });

    observer.observe(widgetRef.current);
    if (widgetRef.current.offsetWidth > 0) {
      setShowContent(true);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        widgetRef.current &&
        !widgetRef.current.contains(event.target as Node)
      ) {
        setAnchorEl(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClose = () => setAnchorEl(null);

  return (
    <Card
      ref={widgetRef}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
      sx={{
        p: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        width: "inherit",
        minWidth: "200px",
      }}
    >
      {title && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="body1" fontWeight="bold">
            {title}
          </Typography>
          {showMoreMenu && (
            <IconButton
              size="small"
              className="no-drag"
              onClick={(e) => {
                e.stopPropagation();
                setAnchorEl(e.currentTarget);
              }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      )}

      <Box flexGrow={1} minHeight={100}>
        {showContent && children}
      </Box>

      <Menu
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            onDelete?.();
          }}
        >
          <Box display="flex" alignItems="center">
            <DeleteIcon fontSize="small" />
            <Box ml={1}>Delete</Box>
          </Box>
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
          }}
        >
          <Box display="flex" alignItems="center">
            <RateReviewIcon fontSize="small" />
            <Box ml={1}>Reference in Chat</Box>
          </Box>
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
          }}
        >
          <Box display="flex" alignItems="center">
            <FormatPaintIcon fontSize="small" />
            <Box ml={1}>Customize</Box>
          </Box>
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default WidgetBase;
