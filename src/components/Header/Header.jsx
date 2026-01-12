import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import PopUser from "../popups/PopUser/PopUser";
import { ThemeContext } from "../../contexts/ThemeContext";
import {
  HeaderBlock,
  HeaderContent,
  HeaderLogo,
  HeaderNav,
  HeaderButton,
  HeaderUser,
} from "./Header.styled";

function Header() {
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const toggleUserPopup = () => {
    setIsUserPopupOpen((prev) => !prev);
  };

  const userName =
    JSON.parse(localStorage.getItem("userInfo") || "{}").name || "Пользователь";

  const logoSrc =
    theme === "dark" ? "/assets/logo_dark.png" : "/assets/logo.png";

  return (
    <HeaderBlock>
      <div className="container">
        <HeaderContent>
          <HeaderLogo>
            <Link to="/" target="_self">
              <img src={logoSrc} alt="logo" />
            </Link>
          </HeaderLogo>
          <HeaderNav>
            <HeaderButton
              className="_hover01"
              id="btnMainNew"
              onClick={() => navigate("new-card")}
            >
              Создать новую задачу
            </HeaderButton>
            <HeaderUser
              href="#user-set-target"
              className="_hover02"
              onClick={(e) => {
                e.preventDefault();
                toggleUserPopup();
              }}
            >
              {userName}
            </HeaderUser>
            <PopUser $isVisible={isUserPopupOpen} onClose={toggleUserPopup} />
          </HeaderNav>
        </HeaderContent>
      </div>
    </HeaderBlock>
  );
}

export default Header;