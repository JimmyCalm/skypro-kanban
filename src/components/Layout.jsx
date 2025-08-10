import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header/Header";

function Layout() {
  const location = useLocation();
  const hideHeader =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="wrapper">
      {!hideHeader && <Header />}
      <Outlet />
    </div>
  );
}

export default Layout;
