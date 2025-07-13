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

const darkPalette = {
  primary: {
    main: "#A224F0",
    dark: "#8200FF",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#A224F0", // or any color you want for the button in dark mode
    light: "#34343a",
    dark: "#adb5bd",
    contrastText: "#FFFFFF",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#B0B3B8",
  },
  background: {
    default: "#18181b",
    paper: "#202020",
  },
  divider: "#232329",
};

const customStyles = {
  dataSourceCard: {
    bgcolor: "#f0e6ff",
    color: "#A224F0",
  },
  // Add more custom styles as needed
};

const darkCustomStyles = {
  dataSourceCard: {
    bgcolor: "#2a223a", // Example: a dark purple/grey background
    color: "#A224F0",
  },
  // Add more custom styles as needed
};

// Create the light theme
const theme = createTheme({
  palette,
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: "1.4rem", // Reduced from 2rem
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
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          borderBottom: "none",
          padding: 16,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          border: "none",
          padding: 16,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          borderTop: "none",
          padding: 16,
        },
      },
    },
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
          borderRadius: 10,
          backgroundColor: "#fff",
          "& .MuiInputBase-root": {
            borderRadius: 10,
            padding: "2px 8px",
          },
        },
      },
      defaultProps: {
        variant: "outlined",
        size: "small",
        fullWidth: true,
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
            backgroundColor: palette.background.paper,
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        ".react-grid-item": {
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
        },
        ".react-resizable-handle": {
          backgrounColor: "transparent",
        },
        ".react-resizable-handle::after": {
          borderColor: `${palette.primary.main}`,
        },
        ".react-grid-item.react-grid-placeholder": {
          background: `${palette.primary.main}`,
          borderRadius: 4,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8, // or 2 if you prefer
          alignItems: "flex-start",
        },
        input: {
          padding: "8.5px 14px",
        },
        inputMultiline: {
          padding: "8.5px 14px",
          lineHeight: 1.5,
        },
      },
    },
  },
});
(theme as any).customStyles = customStyles;

const darkTheme = createTheme({
  palette: {
    ...darkPalette,
    mode: "dark",
  },
  typography: theme.typography,
  components: {
    ...theme.components,
    MuiCard: {
      ...theme.components?.MuiCard,
      styleOverrides: {
        ...theme.components?.MuiCard?.styleOverrides,
        root: {
          ...((theme.components?.MuiCard?.styleOverrides?.root as object) || {}),
          backgroundColor: darkPalette.background.paper,
          border: `1px solid ${darkPalette.divider}`,
        },
      },
    },
    MuiTextField: {
      ...theme.components?.MuiTextField,
      styleOverrides: {
        ...theme.components?.MuiTextField?.styleOverrides,
        root: {
          ...((theme.components?.MuiTextField?.styleOverrides?.root as object) || {}),
          backgroundColor: darkPalette.background.paper,
        },
      },
    },
    MuiButton: {
      ...theme.components?.MuiButton,
      styleOverrides: {
        ...theme.components?.MuiButton?.styleOverrides,
        outlinedSecondary: {
          color: "#FFFFFF", // or your preferred color
          borderColor: "#FFFFFF",
          "&:hover": {
            backgroundColor: "rgba(162,36,240,0.08)",
            borderColor: "#A224F0",
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: darkPalette.background.default,
          color: darkPalette.text.primary,
        },
        '.react-grid-item.react-grid-placeholder': {
          background: darkPalette.primary.main,
        },
        "*::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
          backgroundColor: "transparent",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "#A224E0", // Or use theme.palette.primary.main
          borderRadius: "8px",
        },
        "*::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
        // For Firefox
        "*": {
          scrollbarWidth: "thin",
          scrollbarColor: "#A224F0 transparent",
        },
      },
    },
    MuiDialog: {
      defaultProps: {
        PaperProps: {
          sx: {
            backgroundColor: darkPalette.background.paper,
          },
        },
      },
    },
  },
});
(darkTheme as any).customStyles = darkCustomStyles;

export default theme;
export { darkTheme };
