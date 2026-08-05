import * as React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    backgroundColor: tokens.colorNeutralBackground2,
    overflow: "hidden",
  },
  sidebarContainer: {
    flexShrink: 0,
    height: "100%",
  },
  mainContainer: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflow: "hidden",
  },
  headerContainer: {
    height: "60px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    alignItems: "center",
    padding: `0 ${tokens.spacingHorizontalL}`,
    flexShrink: 0,
  },
  contentContainer: {
    flexGrow: 1,
    overflowY: "auto",
    padding: tokens.spacingVerticalXL,
    boxSizing: "border-box",
  },
});

export interface DashboardLayoutProps {
  sidebar: React.ReactNode;
  header: React.ReactNode;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  sidebar,
  header,
  children,
}) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.sidebarContainer}>{sidebar}</div>
      <div className={styles.mainContainer}>
        <header className={styles.headerContainer}>{header}</header>
        <main className={styles.contentContainer}>{children}</main>
      </div>
    </div>
  );
};
