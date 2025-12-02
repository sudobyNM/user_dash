import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useEffect } from "react";
import useDashboardStore from "./store/dashboardStore";
import { useThemeStore } from "./store/themeStore";

export default function App() {
  const { fetchUsers } = useDashboardStore();
  const { theme } = useThemeStore();

  // Fetch initial users
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Sync theme with Tailwind's dark mode
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-ui-bg text-ui-text dark:bg-[var(--bg)] dark:text-[var(--text)] transition-colors">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900/50">
            <div className="max-w-7xl mx-auto">
              <AppRouter />
            </div>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
