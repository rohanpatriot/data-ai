import React, { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import {
  useWidgetTheme,
  WidgetThemePreset,
  themePresets,
} from "../widgets/util/chartThemeUtil";

const DashboardThemeSelector: React.FC = () => {
  const { themePreset, setThemePreset } = useWidgetTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const themes: { label: string; value: WidgetThemePreset }[] = [
    { label: "Business", value: "business" },
    { label: "Modern", value: "modern" },
    { label: "Legacy", value: "legacy" },
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (preset: WidgetThemePreset) => {
    setThemePreset(preset);
    handleClose();
  };

  const ThemeCircle = ({
    preset,
    size = 32,
    onClick,
  }: {
    preset: WidgetThemePreset;
    size?: number;
    onClick?: () => void;
  }) => {
    const colors = themePresets[preset].primary.slice(0, 3);

    return (
      <Box
        sx={{
          width: size,
          height: size,
          borderRadius: "10px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
          cursor: onClick ? "pointer" : "default",
          border: "1px solid #e0e0e0",
          "&:hover": onClick ? { boxShadow: "0 0 5px rgba(0,0,0,0.2)" } : {},
        }}
        onClick={onClick}
      >
        {colors.map((color, index) => (
          <Box
            key={index}
            sx={{
              flex: 1,
              backgroundColor: color,
              width: "100%",
            }}
          />
        ))}
      </Box>
    );
  };

  return (
    <Box>
      <Tooltip title="Widget Theme">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ p: 0.5, borderRadius: "4px" }}
          key={`theme-selector-button-${themePreset}`}
        >
          <ThemeCircle preset={themePreset} />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={1}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {themes.map((theme) => (
          <MenuItem
            key={theme.value}
            onClick={() => {
              console.log("MenuItem clicked for theme:", theme.value);
              handleThemeChange(theme.value);
            }}
            selected={themePreset === theme.value}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              minWidth: 150,
              py: 1,
            }}
          >
            <ThemeCircle preset={theme.value} size={24} />
            {theme.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default DashboardThemeSelector;
