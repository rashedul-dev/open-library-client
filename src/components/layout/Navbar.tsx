import  { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-blue-900 shadow-xl shadow-blue-900/40 text-white backdrop-blur-md bg-opacity-80">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={"/"}>
            <div className="flex items-center gap-2 hover:cursor-pointer">
              <img className="w-14 h-14" src="/logo.png" alt="home_logo" />
              <span className="font-bold text-2xl text-white">
                Open Library
              </span>
            </div>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-10 gap-4 text-xl">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 underline underline-offset-4"
                  : "text-white hover:text-blue-400 transition"
              }
            >
              All Books
            </NavLink>
            <NavLink
              to="/create-books"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 underline underline-offset-4"
                  : "text-white hover:text-blue-400 transition"
              }
            >
              Add Books
            </NavLink>
            <NavLink
              to="/borrow-summary"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 underline underline-offset-4"
                  : "text-white hover:text-blue-400 transition"
              }
            >
              Borrow Books
            </NavLink>
          </div>

          {/* Mode Toggle */}
          <div className="hidden md:flex">
            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden ">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-blue-300 transition"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 mb-4 pb-4 space-y-2 text-base font-medium ">
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block text-blue-400 underline underline-offset-4"
                  : "block text-white hover:text-blue-400 transition"
              }
            >
              All Books
            </NavLink>
            <NavLink
              to="/create-books"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block text-blue-400 underline underline-offset-4"
                  : "block text-white hover:text-blue-400 transition"
              }
            >
              Add Books
            </NavLink>
            <NavLink
              to="/borrow-summary"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block text-blue-400 underline underline-offset-4"
                  : "block text-white hover:text-blue-400 transition"
              }
            >
              Borrow Books
            </NavLink>
            <div className="pt-2">
              <ModeToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
