import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import theme, { darkTheme } from "./theme";
import { Theme } from "@mui/material";

export type AppThemeMode = "light" | "dark" | "system";

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
  // Get system preference
  const getSystemMode = () =>
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  const getInitialMode = (): AppThemeMode => {
    const stored = localStorage.getItem("appThemeMode") as AppThemeMode | null;
    return stored || "system";
  };

  const [mode, setModeState] = useState<AppThemeMode>(getInitialMode());
  const [systemMode, setSystemMode] = useState<"light" | "dark">(getSystemMode());

  // Listen to system changes
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setSystemMode(mq.matches ? "dark" : "light");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Persist mode
  const setMode = (newMode: AppThemeMode) => {
    setModeState(newMode);
    localStorage.setItem("appThemeMode", newMode);
  };

  // Compute theme
  const muiTheme = useMemo(() => {
    const effectiveMode = mode === "system" ? systemMode : mode;
    return effectiveMode === "dark" ? darkTheme : theme;
  }, [mode, systemMode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode, muiTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext); 