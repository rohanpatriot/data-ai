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
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 10, // Reduced from 8
          padding: "6px 12px", // Reduced from 10px 16px
          fontWeight: 500,
          fontSize: "0.875rem", // Added smaller font size
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        outlined: {
          borderColor: "#E9ECEF",
          "&:hover": {
            backgroundColor: "transparent",
            borderColor: "#6C757D",
          },
        },
        outlinedSecondary: {
          color: "#212529", // Black text
          borderColor: "#6C757D", // Grey border
          "&:hover": {
            backgroundColor: "transparent",
            borderColor: "#495057", // Darker grey on hover
          },
        },
        // Add size variant for small buttons
        sizeSmall: {
          padding: "4px 10px",
          fontSize: "0.8125rem",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 6, // Reduced from 8
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
  },
});

export default theme;
