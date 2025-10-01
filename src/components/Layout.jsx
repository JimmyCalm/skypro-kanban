import { Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Header from "./Header/Header";

function Layout() {
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  
  const hideHeader =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="wrapper">
      {!hideHeader && <Header onLogout={logout} />}
      <Outlet />
    </div>
  );
}

export default Layout;