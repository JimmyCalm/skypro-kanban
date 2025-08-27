import { Link } from "react-router-dom";
import { useState } from "react";
import PopUser from "../Popups/PopUser";
import {
  HeaderWrapper,
  HeaderBlock,
  HeaderLogo,
  HeaderNav,
  HeaderButtonNew,
  HeaderUser,
} from "./Header.styled";

export default function Header() {
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const toggleUserPopup = () => {
    setIsUserPopupOpen(!isUserPopupOpen);
  };

  return (
    <HeaderWrapper className="header">
      <div className="container">
        <HeaderBlock>
          <HeaderLogo className="_show _light">
            <Link to="/">
              <img src="../public/images/logo.png" alt="logo" />
            </Link>
          </HeaderLogo>
          <HeaderLogo className="_dark">
            <Link to="/">
              <img src="../public/images/logo_dark.png" alt="logo" />
            </Link>
          </HeaderLogo>
          <HeaderNav>
            <HeaderButtonNew id="btnMainNew">
              <Link to="/new">Создать новую задачу</Link>
            </HeaderButtonNew>
            <HeaderUser
              href="#user-set-target"
              onClick={(e) => {
                e.preventDefault();
                toggleUserPopup();
              }}
            >
              Ivan Ivanov
            </HeaderUser>
            {isUserPopupOpen && <PopUser onClose={toggleUserPopup} />}
          </HeaderNav>
        </HeaderBlock>
      </div>
    </HeaderWrapper>
  );
}
