import { Link, Outlet } from "react-router";
import { useState } from "react";

function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { to: "/", label: "Home" },
    { to: "/bookshelf", label: "Bookshelf" },
    { to: "/about", label: "About" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-800">
      <header className="bg-white dark:bg-gray-800 border-b-2 text-gray-900 dark:text-white sticky top-0 z-50">
        <nav
          aria-label="Personal Website"
          className="max-w-screen-lg mx-auto w-full px-4"
        >
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-semibold">
              Chromatacia
            </Link>

            <div className="hidden md:flex space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="hover:text-blue-500 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
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

          <div
            className={`md:hidden ${
              isMenuOpen
                ? "max-h-48 opacity-100"
                : "max-h-0 opacity-0 pointer-events-none"
            } overflow-hidden transition-all duration-200 ease-in-out`}
          >
            <div className="py-2 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-1 text-gray-900 dark:text-white">
        <div className="max-w-screen-lg mx-auto w-full px-4 py-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
