import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PopUser from "../Popups/PopUser";
import {
  HeaderWrapper,
  HeaderBlock,
  HeaderLogo,
  HeaderNav,
  HeaderButtonNew,
  HeaderUser,
} from "./Header.styled";

export default function Header({ onLogout }) {
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const [userName, setUserName] = useState("Гость");
  const [userEmail, setUserEmail] = useState("");

  // Получение данных пользователя из localStorage
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setUserName(userInfo.name || "Гость");
      setUserEmail(userInfo.login || "");
    }
  }, []);

  // Переключение попапа
  const toggleUserPopup = () => {
    setIsUserPopupOpen(!isUserPopupOpen);
  };

  // Закрытие попапа при клике вне или по Esc
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isUserPopupOpen && !e.target.closest(".pop-user")) {
        setIsUserPopupOpen(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape" && isUserPopupOpen) {
        setIsUserPopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isUserPopupOpen]);

  // Проверка авторизации
  const isAuthenticated = !!localStorage.getItem("userInfo");

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
            {isAuthenticated && (
              <HeaderButtonNew id="btnMainNew">
                <Link to="/new">Создать новую задачу</Link>
              </HeaderButtonNew>
            )}
            {isAuthenticated && (
              <HeaderUser
                href="#user-set-target"
                onClick={(e) => {
                  e.preventDefault();
                  toggleUserPopup();
                }}
              >
                {userName}
              </HeaderUser>
            )}
            {isUserPopupOpen && (
              <PopUser
                onClose={toggleUserPopup}
                userName={userName}
                userEmail={userEmail}
                onLogout={onLogout}
              />
            )}
          </HeaderNav>
        </HeaderBlock>
      </div>
    </HeaderWrapper>
  );
}