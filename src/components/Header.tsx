import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const activeStyle = () => `bg-gray-300`;
const inactiveStyle = () =>
  `text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700`;

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-20 transition-colors">
      <div className="max-w-8xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between flex-wrap gap-4">
        <Link to="/" className="">
          <img src="/src/assets/scholar_logo.png" className="inline-block w-5 h-5 mr-2" />
          <h2 className="inline-block text-1xl font-bold">CA MONK</h2>
        </Link>

        <nav className="flex gap-2">
          <NavLink to="/tools" className={({ isActive }) =>
            `px-3 py-2 rounded-md text-sm font-medium ${isActive ? activeStyle() : inactiveStyle()}`
          }>Tools</NavLink>

          <NavLink to="/practice" className={({ isActive }) =>
            `px-3 py-2 rounded-md text-sm font-medium ${isActive ? activeStyle() : inactiveStyle()}`
          }>Practice</NavLink>

          <NavLink to="/events" className={({ isActive }) =>
            `px-3 py-2 rounded-md text-sm font-medium ${isActive ? activeStyle() : inactiveStyle()}`
          }>Events</NavLink>

          <NavLink to="/job" className={({ isActive }) =>
            `px-3 py-2 rounded-md text-sm font-medium ${isActive ? activeStyle() : inactiveStyle()}`
          }>Job Board</NavLink>

          <NavLink to="/points" className={({ isActive }) =>
            `px-3 py-2 rounded-md text-sm font-medium ${isActive ? activeStyle() : inactiveStyle()}`
          }>Points</NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-md bg-indigo-600 text-white">
            Profile
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </header>
  );
}
