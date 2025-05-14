import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase-client";
import ProfileModal from "./ProfileModal";
import user from '@/assets/dev/user.webp'

const UserMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userImage, setUserImage] = useState(user);
  const [userEmail, setUserEmail] = useState();
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    supabase.auth.signOut();
    navigate("/login");
    handleCloseMenu();
  };

  const handleProfile = () => {
    setProfileOpen(true);
    handleCloseMenu();
  };
  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      setUserImage(data.user?.user_metadata.avatar_url); // Avatar URL from Google profile
      setUserEmail(data.user?.user_metadata?.email); // Email from Google profile
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
        <Avatar
          alt="User Avatar"
          src={userImage}
          sx={{ width: 36, height: 36 }}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "16px",
            minWidth: "200px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
            mt: 1.5,
          },
        }}
      >
        <MenuItem onClick={handleProfile} sx={{ py: 1.5 }}>
          <Box display="flex" alignItems="center">
            <Box
              sx={{
                mr: 2,
                width: 24,
                height: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z"
                  fill="black"
                />
              </svg>
            </Box>
            <Typography variant="body1">My profile</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
          <Box display="flex" alignItems="center">
            <Box
              sx={{
                mr: 2,
                width: 24,
                height: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 17L21 12L16 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 12H9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>
            <Typography variant="body1">Logout</Typography>
          </Box>
        </MenuItem>
      </Menu>
      <ProfileModal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={{
          email: userEmail || "",
          avatar_url: userImage,
        }}
      />
    </>
  );
};

export default UserMenu;
