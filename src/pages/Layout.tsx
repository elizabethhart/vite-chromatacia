import { Link, Outlet } from "react-router";

function Layout() {
  return (
    <>
      <header className="flex justify-center border-b-2 bg-slate-200">
        <nav
          aria-label="Personal Website"
          className="max-w-screen-lg w-full flex justify-between py-4"
        >
          <div>
            <Link to="/">Home</Link>
          </div>
          <div>
            <ul className="flex gap-4" role="menu" aria-label="Navigation Menu">
              <li>
                <Link role="menu-item" to="">
                  Home
                </Link>
              </li>
              <li>
                <Link role="menu-item" to="about">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <main className="flex justify-center h-full py-4 ">
        <div className="max-w-screen-lg w-full">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default Layout;
