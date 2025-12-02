import { Link, NavLink } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../store/themeStore";

export default function Navbar() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <nav className="w-full border-b border-ui-border bg-ui-card/80 backdrop-blur dark:bg-slate-900/80 dark:border-slate-800 px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-between">
      <Link to="/" className="text-base sm:text-lg font-semibold text-ui-text dark:text-slate-100 tracking-tight whitespace-nowrap">
        Dashboard
      </Link>

      <div className="flex items-center gap-3 sm:gap-6">
        <NavLink
          to="/users"
          className={({ isActive }) =>
            `text-sm font-medium transition-colors ${
              isActive
                ? "text-blue-600 dark:text-blue-400"
                : "text-ui-textLight hover:text-ui-text dark:text-slate-300 dark:hover:text-white"
            }`
          }
        >
          Users
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `text-sm font-medium transition-colors ${
              isActive
                ? "text-blue-600 dark:text-blue-400"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            }`
          }
        >
          Analytics
        </NavLink>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-ui-border bg-ui-card text-ui-textLight shadow-sm hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 transition-colors flex-shrink-0"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </nav>
  );
}
