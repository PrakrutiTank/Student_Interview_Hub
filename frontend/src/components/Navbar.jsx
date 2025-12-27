import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-700 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo / Brand */}
        <Link
          to="/"
          className="text-xl font-bold text-white tracking-wide"
        >
          InterviewClub
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium transition ${
                isActive
                  ? "text-blue-400"
                  : "text-slate-300 hover:text-white"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/opportunities"
            className={({ isActive }) =>
              `text-sm font-medium transition ${
                isActive
                  ? "text-blue-400"
                  : "text-slate-300 hover:text-white"
              }`
            }
          >
            Opportunities
          </NavLink>

          <NavLink
            to="/apply-executive"
            className={({ isActive }) =>
              `text-sm font-medium transition ${
                isActive
                  ? "text-blue-400"
                  : "text-slate-300 hover:text-white"
              }`
            }
          >
            Apply Executive
          </NavLink>

          <NavLink
            to="/book-slot"
            className={({ isActive }) =>
              `text-sm font-medium transition ${
                isActive
                  ? "text-blue-400"
                  : "text-slate-300 hover:text-white"
              }`
            }
          >
            Book Interview
          </NavLink>
        </div>

      </div>
    </nav>
  );
}
