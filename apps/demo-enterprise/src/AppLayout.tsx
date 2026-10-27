import { Outlet } from "@tanstack/react-router";
import { DashboardLayout } from "@eaf/layout";
import { Sidebar } from "@eaf/navigation";
import { useTheme } from "@eaf/theme";
import { Button } from "@fluentui/react-components";

export const AppLayout = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navItems = [
    { id: "1", label: "Dashboard" },
    { id: "2", label: "Users" },
    { id: "3", label: "Settings" },
  ];

  return (
    <DashboardLayout
      sidebar={<Sidebar items={navItems} title="EAF Demo" />}
      header={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <span>Enterprise Application Framework</span>
          <Button onClick={toggleTheme}>Toggle Theme (Current: {theme})</Button>
        </div>
      }
    >
      <Outlet />
    </DashboardLayout>
  );
};
