import * as React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  sidebar: {
    width: "260px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: tokens.spacingVerticalM,
    boxSizing: "border-box",
  },
  header: {
    padding: tokens.spacingVerticalM,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase500,
    marginBottom: tokens.spacingVerticalL,
  },
  navList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  navItem: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    cursor: "pointer",
    borderRadius: tokens.borderRadiusMedium,
    color: tokens.colorNeutralForeground1,
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
});

export interface SidebarProps {
  items: Array<{ id: string; label: string; onClick?: () => void }>;
  title?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  title = "Navigation",
}) => {
  const styles = useStyles();

  return (
    <nav className={styles.sidebar}>
      <div className={styles.header}>{title}</div>
      <ul className={styles.navList}>
        {items.map((item) => (
          <li key={item.id} className={styles.navItem} onClick={item.onClick}>
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
  );
};
