import React, { createContext, useContext, useMemo, useState } from "react";
import theme, { darkTheme } from "./theme";
import { Theme } from "@mui/material";

export type AppThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: AppThemeMode;
  setMode: (mode: AppThemeMode) => void;
  muiTheme: Theme;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  setMode: () => {},
  muiTheme: theme,
});

export const ThemeProviderContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get system preference (only used on first load if no user preference)
  const getSystemMode = () =>
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  const getInitialMode = (): AppThemeMode => {
    const stored = localStorage.getItem("appThemeMode") as AppThemeMode | null;
    if (stored === "light" || stored === "dark") return stored;
    return getSystemMode();
  };

  const [mode, setModeState] = useState<AppThemeMode>(getInitialMode());

  // Persist mode
  const setMode = (newMode: AppThemeMode) => {
    setModeState(newMode);
    localStorage.setItem("appThemeMode", newMode);
  };

  // Compute theme
  const muiTheme = useMemo(() => {
    return mode === "dark" ? darkTheme : theme;
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode, muiTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext); 