import React, { useEffect, useState, useRef } from "react";
import { Box, Card, IconButton, Menu, MenuItem } from "@mui/material";
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
  showMoreMenu = false,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | {
    x: number;
    y: number;
  }>(null);
  const [showContent, setShowContent] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Add click event listener to close menu when clicking outside
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

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setAnchorEl({ x: event.clientX, y: event.clientY });
  };

  const handleClose = () => setAnchorEl(null);

  const isMenuOpen = Boolean(anchorEl);

  return (
    <Card
      ref={widgetRef}
      onContextMenu={handleContextMenu}
      sx={{
        p: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        width: "inherit",
        minWidth: "200px",
        //border: isMenuOpen ? '2px solid #1976d2' : '2px solid transparent', // Highlight when menu is open
      }}
    >
      {showMoreMenu && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Box fontWeight="bold">{title}</Box>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              setAnchorEl({ x: e.clientX, y: e.clientY });
            }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      <Box flexGrow={1} minHeight={0}>
        {showContent && children}
      </Box>

      <Menu
        open={isMenuOpen}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          anchorEl !== null ? { top: anchorEl.y, left: anchorEl.x } : undefined
        }
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
