import React, { useEffect, useRef } from "react";
import {
  Box,
  Card,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import RateReviewIcon from "@mui/icons-material/RateReview";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import DeleteWidgetDialog from "./dialogs/DeleteWidgetDialog";
import { useWidgetDialogs } from "../hooks/useWidgetDialogs";
import EditWidgetDialog from "./dialogs/EditWidgetDialog";
import ImageIcon from '@mui/icons-material/Image';
import { exportWidgetToPng } from "./util/exportWidget";

interface WidgetBaseProps {
  children: React.ReactNode;
  widgetId: string;
  onDelete?: () => void;
  onReference?: (widgetId: string) => void;
  title?: string;
  showMoreMenu?: boolean;
  refresh?: () => void;
}

const WidgetBase: React.FC<WidgetBaseProps> = ({
  children,
  widgetId,
  onDelete,
  onReference,
  title,
  showMoreMenu = true,
  refresh,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { edit, del } = useWidgetDialogs({ widgetId, refresh: refresh || (() => {}) });

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

  const handleDeleteClick = () => {
    handleClose();
    if (widgetId) {
      del.open(widgetId);
    } else if (onDelete) {
      onDelete();
    }
  };

  const handleExportWidget = () => {
    const widgetElement = widgetRef.current;
    if (widgetElement) {
      exportWidgetToPng(widgetElement, title || 'My Widget');
    }
  }

  const handleEditClick = () => {
    handleClose();
    edit.open(widgetId, title || '');
  };

  return (
    <Card
      ref={widgetRef}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
      className={isMobile ? "no-drag" : ""}
      sx={{
        p: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        width: "inherit",
        minWidth: "150px",
      }}
    >
      {title && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
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

      <Box flexGrow={1} minHeight={50}>
        {children}
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
            handleDeleteClick();
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
            onReference?.(widgetId);
            handleClose();
          }}
          disabled={true}
        >
          <Box display="flex" alignItems="center">
            <RateReviewIcon fontSize="small" />
            <Box ml={1}>Reference in Chat</Box>
          </Box>
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleEditClick();
            handleClose();
          }}
        >
          <Box display="flex" alignItems="center">
            <FormatPaintIcon fontSize="small" />
            <Box ml={1}>Edit</Box>
          </Box>
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleExportWidget();
            handleClose();
          }}
        >
          <Box display="flex" alignItems="center">
          <ImageIcon fontSize="small" />
          <Box ml={1}>Export Widget to PNG</Box>
          </Box>
        </MenuItem>
      </Menu>

      {widgetId && (
        <DeleteWidgetDialog
          open={del.isOpen}
          onClose={del.close}
          onDelete={del.confirm}
        />
      )}

      {edit.isOpen && 
        <EditWidgetDialog
          open={edit.isOpen}
          onClose={edit.close}
          onSave={edit.confirm}
          name={edit.name}
          setName={edit.setName}
          loading={edit.loading}
          error={edit.error}
        />
      }
    </Card>
  );
};

export default WidgetBase;
