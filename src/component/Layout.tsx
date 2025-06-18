// for page navigation
import NavigationBar from "./NavigationBar";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <>
      <h1>
        City<em>Hex</em>Scope
      </h1>
      <NavigationBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
