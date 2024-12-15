import { Outlet } from "react-router";

function Layout() {
  return (
    <div>
      <header>
        <nav></nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
