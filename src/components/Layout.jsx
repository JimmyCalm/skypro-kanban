import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header/Header";
import PopBrowse from "./Popups/PopBrowse";
import PopNewCard from "./Popups/PopNewCard";

function Layout() {
  const location = useLocation();
  const hideHeader =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="wrapper">
      {!hideHeader && <Header />}
      <PopBrowse />
      <PopNewCard />
      <Outlet />
    </div>
  );
}

export default Layout;
