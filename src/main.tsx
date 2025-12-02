import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { useThemeStore } from "./store/themeStore";

// Root wrapper to sync Zustand theme with HTML class
const Root = () => {
  const theme = useThemeStore((state) => state.theme);

  React.useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") html.classList.add("dark");
    else html.classList.remove("dark");
  }, [theme]);

  return <App />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);
