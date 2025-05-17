import React, { useEffect, useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Paper } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from "@mui/icons-material/Delete";
import RateReviewIcon from '@mui/icons-material/RateReview';

interface WidgetBaseProps {
  children: React.ReactNode;
  onDelete?: () => void;
  title?: string;
  showMoreMenu?: boolean;
}

const WidgetBase: React.FC<WidgetBaseProps> = ({ children, onDelete, title, showMoreMenu = false }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | { x: number; y: number }>(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100); 

    return () => clearTimeout(timer);
  }, []);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setAnchorEl({ x: event.clientX, y: event.clientY });
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <Paper
      elevation={0}
      onContextMenu={handleContextMenu}
      sx={{ 
        p: 1, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        width: 'inherit',
        minWidth: '200px',
    }}
    >
      {showMoreMenu && (
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Box fontWeight="bold">{title}</Box>
          <IconButton 
            size="small" 
            onClick={(e) => setAnchorEl({ x: e.clientX, y: e.clientY })}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      <Box flexGrow={1} minHeight={0}>
      {showContent && children}
      </Box>

      <Menu 
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          anchorEl !== null
            ? { top: anchorEl.y, left: anchorEl.x }
            : undefined
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
      </Menu>
    </Paper>
  );
};

export default WidgetBase;