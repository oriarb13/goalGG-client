import { createUseStyles } from "react-jss";
import { useTheme } from "@/core/hooks";

const useStyle = () => {
  const { theme } = useTheme();

  const useStyles = createUseStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      background: "#FFF",
      zIndex: 10,
      height: "100vh",
      justifyContent: "space-between",
      position: "relative",
      transition: "width 0.3s ease",
    },
    desktopContainer: {
      display: "flex",
      background: "#FFF",
      zIndex: 10,
      height: "60px",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      padding: "0 20px",
      borderBottom: "1px solid #E5E7EB",
    },
    mobileContainer: {
      display: "flex",
      flexDirection: "column",
      background: "#FFF",
      zIndex: 10,
      height: "100vh",
      justifyContent: "space-between",
      width: "100%",
      transition: "transform 0.3s ease",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      gap: 16,
    },
    menuItemsContainer: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      overflow: "auto",
      flex: 1,
    },
    desktopMenuItems: {
      display: "flex",
      gap: 16,
      alignItems: "center",
    },
    profileContainer: {
      padding: "12px",
      borderTop: "1px solid #E5E7EB",
    },
    desktopProfileContainer: {
      display: "flex",
      alignItems: "center",
    },
  });

  const classes = useStyles();

  return {
    classes,
    theme,
  };
};

export { useStyle };
