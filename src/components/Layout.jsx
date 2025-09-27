import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header/Header";

function Layout({ setIsAuth }) {
  const location = useLocation();
  const hideHeader =
    location.pathname === "/login" || location.pathname === "/register";

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    if (setIsAuth) setIsAuth(false);
  };

  return (
    <div className="wrapper">
      {!hideHeader && <Header onLogout={handleLogout} />}
      <Outlet />
    </div>
  );
}

export default Layout;