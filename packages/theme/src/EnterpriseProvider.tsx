import * as React from "react";
import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  teamsHighContrastTheme,
  Theme,
} from "@fluentui/react-components";

export type EnterpriseTheme = "light" | "dark" | "high-contrast" | "system";

interface ThemeContextValue {
  theme: EnterpriseTheme;
  setTheme: (theme: EnterpriseTheme) => void;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined,
);

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within an EnterpriseProvider");
  }
  return context;
};

export interface EnterpriseProviderProps {
  children: React.ReactNode;
  defaultTheme?: EnterpriseTheme;
}

export const EnterpriseProvider: React.FC<EnterpriseProviderProps> = ({
  children,
  defaultTheme = "system",
}) => {
  const [themeName, setThemeName] =
    React.useState<EnterpriseTheme>(defaultTheme);
  const [fluentTheme, setFluentTheme] = React.useState<Theme>(webLightTheme);

  React.useEffect(() => {
    let resolvedTheme = themeName;

    if (themeName === "system") {
      const isDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      // High contrast detection is complex in web, typically fallback to light/dark based on system setting.
      // Assuming system maps to light/dark primarily.
      resolvedTheme = isDark ? "dark" : "light";
    }

    switch (resolvedTheme) {
      case "dark":
        setFluentTheme(webDarkTheme);
        break;
      case "high-contrast":
        setFluentTheme(teamsHighContrastTheme);
        break;
      case "light":
      default:
        setFluentTheme(webLightTheme);
        break;
    }
  }, [themeName]);

  const value = React.useMemo(
    () => ({ theme: themeName, setTheme: setThemeName }),
    [themeName],
  );

  return (
    <ThemeContext.Provider value={value}>
      <FluentProvider theme={fluentTheme}>{children}</FluentProvider>
    </ThemeContext.Provider>
  );
};
