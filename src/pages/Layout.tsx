import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";

function Layout() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
