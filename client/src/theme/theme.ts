import { createTheme } from "@mui/material/styles";

// Define your color palette
const palette = {
  primary: {
    main: "#A224F0",
    dark: "#8200FF",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#6C757D", // Grey color
    light: "#E9ECEF",
    dark: "#495057",
    contrastText: "#212529", // Black text for secondary buttons
  },
  text: {
    primary: "#212529",
    secondary: "#6C757D",
  },
  background: {
    default: "#FFFFFF",
    paper: "#FFFFFF",
  },
  divider: "#E9ECEF",
};

// Create the theme
const theme = createTheme({
  palette,
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: "1.75rem", // Reduced from 2rem
    },
    body1: {
      fontSize: "0.9rem", // Reduced from 1rem
    },
    body2: {
      fontSize: "0.8rem", // Reduced from 0.875rem
    },
    caption: {
      fontSize: "0.7rem", // Reduced from 0.75rem
    },
  },
  // Add the MuiDialog component styling to the components section
  components: {
    // Add Card component styling
    MuiCard: {
      defaultProps: {
        elevation: 0, // Default elevation of 0
      },
      styleOverrides: {
        root: {
          border: `1px solid ${palette.divider}`, // Border color matching divider
          borderRadius: 10, // Matching your theme's border radius
          padding: 10, // Padding of 2 (16px)
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          border: "none",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "150px",
          styleOverrides: {
            root: {
              border: "none",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 10,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        // Add styles for the secondary outlined button
        outlinedSecondary: {
          color: "#212529", // Black/very dark grey text color
          borderColor: "#ced4da", // Light grey border color
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)", // Standard light grey hover background
            borderColor: "#adb5bd", // Slightly darker border on hover (optional)
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10, // Reduced from 8
            fontSize: "0.9rem", // Smaller text in fields
          },
          "& .MuiInputBase-input": {
            padding: "10px 14px", // Reduced padding inside text fields
          },
          "& .MuiInputLabel-root": {
            fontSize: "0.9rem", // Smaller label text
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#E9ECEF",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
        },
      },
    },
    MuiDialog: {
      defaultProps: {
        PaperProps: {
          sx: {
            borderRadius: 4,
            py: 0.5,
            px: 0.5,
          },
        },
      },
    },
  },
});

export default theme;
