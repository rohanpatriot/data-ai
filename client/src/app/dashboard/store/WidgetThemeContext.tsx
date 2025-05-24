import React, { useState, useEffect, useCallback, ReactNode, useMemo } from 'react';
import { themePresets, WidgetThemeContext, WidgetThemePreset } from '../components/widgets/util/chartThemeUtil';
import { ProjectsAPI } from '../../api/projects';
import { Project } from '../../../types/project';

interface WidgetThemeProviderProps {
  children: ReactNode;
  initialThemePreset?: WidgetThemePreset; // Keep this for initial load or default
  project: Project | null; // Add project prop
}

export const WidgetThemeProvider: React.FC<WidgetThemeProviderProps> = ({
  children,
  initialThemePreset = "business",
  project, // Destructure project
}) => {
  const [themePreset, setInternalThemePreset] = useState<WidgetThemePreset>(
    (project?.theme as WidgetThemePreset) ||
    (localStorage.getItem("widgetThemePreset") as WidgetThemePreset) ||
    initialThemePreset
    );

    useEffect(() => {
      if (project?.theme) {
        setInternalThemePreset(project.theme as WidgetThemePreset);
      } else {
        setInternalThemePreset(initialThemePreset);
      }
    }, [project?.theme, initialThemePreset]);

    const setThemePreset = useCallback(
      async (preset: WidgetThemePreset) => {
        setInternalThemePreset(preset);
        // Update localStorage (optional, but good fallback)
        localStorage.setItem("widgetThemePreset", preset);
  
        // Save theme to Supabase if project is available
        if (project?.id) {
          try {
            await ProjectsAPI.updateTheme(project.id, preset);
          } catch (error) {
            console.error("Error saving theme to project:", error);
          }
        }
      },
      [project?.id] 
    );

    const contextValue = useMemo(
      () => ({
        themePreset,
        colors: themePresets[themePreset],
        setThemePreset,
      }),
      [themePreset, setThemePreset] // Include setThemePreset in dependencies
    );
  
    return (
      <WidgetThemeContext.Provider value={contextValue}>
        {children}
      </WidgetThemeContext.Provider>
    );
  };
