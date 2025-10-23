import { Link, Outlet } from "react-router";
import { useState } from "react";
import ThemeToggle from "../components/ThemeToggle";

function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { to: "/", label: "Home" },
    // { to: "/bookshelf", label: "Bookshelf" },
    { to: "/about", label: "About" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950">
      {/* Skip link for keyboard navigation */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className="glass sticky top-0 z-50 border-b border-neutral-200/50 dark:border-neutral-800/50">
        <nav
          aria-label="Personal Website"
          className="max-w-7xl mx-auto w-full px-6"
        >
          <div className="flex justify-between items-center h-16">
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent hover:from-primary-500 hover:to-accent-500 transition-all duration-200"
            >
              Chromatacia
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <nav aria-label="Main navigation">
                <ul className="flex items-center space-x-8">
                  {menuItems.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200 relative group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md px-2 py-1"
                      >
                        {item.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-200"></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <ThemeToggle />
            </div>

            <div className="md:hidden flex items-center space-x-3">
              <ThemeToggle />
              <button
                onClick={toggleMenu}
                className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-expanded={isMenuOpen}
                aria-label="Toggle menu"
                aria-controls="mobile-menu"
              >
                <svg
                  className="w-6 h-6 text-neutral-700 dark:text-neutral-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          <div
            id="mobile-menu"
            className={`md:hidden ${
              isMenuOpen
                ? "max-h-64 opacity-100"
                : "max-h-0 opacity-0 pointer-events-none"
            } overflow-hidden transition-all duration-300 ease-in-out`}
            aria-hidden={!isMenuOpen}
          >
            <nav aria-label="Mobile navigation">
              <ul className="py-4 space-y-2">
                {menuItems.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="block px-4 py-3 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary-600 dark:hover:text-primary-400 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </nav>
      </header>

      <main id="main-content" className="flex-1" role="main">
        <div className="max-w-7xl mx-auto w-full px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
