import React from "react";
import { Menu, MenuItem } from "@mui/material";

interface MoreMenuProps {
    setIsShareModalOpen: (open: boolean) => void;
    setEditProjectModalOpen: () => void;
    moreMenuAnchor: null | HTMLElement;
    moreMenuOpen: boolean;
    setMoreMenuOpen: (open: boolean) => void;
}

const MoreMenu: React.FC<MoreMenuProps> = ({ 
    setIsShareModalOpen, 
    setEditProjectModalOpen, 
    moreMenuAnchor, 
    moreMenuOpen, 
    setMoreMenuOpen
}) => {
    
      const handleMoreMenuClose = () => {
        setMoreMenuOpen(false);
      };
    
      const handleInviteUsers = () => {
        setIsShareModalOpen(true);
        handleMoreMenuClose();
      };

      const handleEditProject = () => {
        setEditProjectModalOpen();
        handleMoreMenuClose();
    };


    return (
        <Menu
        anchorEl={moreMenuAnchor}
        open={moreMenuOpen}
        onClose={() => setMoreMenuOpen(false)}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "8px",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
            width: "220px"
          }
        }}
      >
        <MenuItem onClick={handleInviteUsers} sx={{ gap: 2 }}>
          Invite users
        </MenuItem>
        <MenuItem onClick={handleEditProject} sx={{ gap: 2 }}>
          Project Settings
        </MenuItem>
      </Menu>
    );
};

export default MoreMenu;