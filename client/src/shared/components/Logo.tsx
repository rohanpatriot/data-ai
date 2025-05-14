import React, { useState } from "react";
import { Box, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";
import brandmark from "@/assets/brandmark.svg";
// import brandKit from "@/assets/brand-kit.zip?url";

const Logo: React.FC = () => {
  const [anchor, setAnchor] = useState<null | {
    mouseX: number;
    mouseY: number;
  }>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setAnchor({ mouseX: event.clientX - 2, mouseY: event.clientY - 4 });
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleCopy = async (type: "full" | "brandmark") => {
    const svgPath = type === "full" ? logo : brandmark;
    const response = await fetch(svgPath);
    const svgText = await response.text();
    await navigator.clipboard.writeText(svgText);
    handleClose();
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    // link.href = brandKit;
    link.download = "Perplexigrid-BrandKit.zip";
    link.click();
    handleClose();
  };

  return (
    <>
      <Link
        to="/"
        onContextMenu={handleContextMenu}
        style={{ textDecoration: "none" }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="Perplexigrid Logo"
            style={{ height: "34px", marginRight: "8px" }}
          />
        </Box>
      </Link>

      <Menu
        open={!!anchor}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          anchor ? { top: anchor.mouseY, left: anchor.mouseX } : undefined
        }
      >
        <MenuItem onClick={() => handleCopy("full")}>
          <svg
            width="23px"
            height="22px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M7 8L3 11.6923L7 16M17 8L21 11.6923L17 16M14 4L10 20"
                stroke="#A224F0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
          &nbsp;Copy Logo as SVG
        </MenuItem>
        <MenuItem onClick={() => handleCopy("brandmark")}>
          <img width="23px" height="22px" src={brandmark} />
          &nbsp;Copy Brandmark as SVG
        </MenuItem>
        <MenuItem onClick={handleDownload}>
          <svg
            width="23px"
            height="22px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#A224F0"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15"
                stroke="#A224F0"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
              <path
                d="M12 3V16M12 16L16 11.625M12 16L8 11.625"
                stroke="#A224F0"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
          &nbsp;Download Brand Kit
        </MenuItem>
      </Menu>
    </>
  );
};

export default Logo;
