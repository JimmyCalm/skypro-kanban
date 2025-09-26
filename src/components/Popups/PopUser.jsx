import {
  PopUserWrapper,
  PopUserName,
  PopUserMail,
  PopUserTheme,
  PopUserButton,
} from "./PopUser.styled";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function PopUser({ onClose, userName, userEmail }) {
  const [isDarkTheme, setIsDarkTheme] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Сохранение темы в localStorage
  const handleThemeChange = (e) => {
    const isDark = e.target.checked;
    setIsDarkTheme(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
    document.body.className = isDark ? "dark" : "light"; // Пример смены темы
  };

  return (
    <PopUserWrapper id="user-set-target" className="pop-user">
      <Link
        to="#"
        onClick={(e) => {
          e.preventDefault();
          onClose();
        }}
      >
        x
      </Link>
      <PopUserName>{userName}</PopUserName>
      <PopUserMail>{userEmail}</PopUserMail>
      <PopUserTheme>
        <p>Темная тема</p>
        <input
          type="checkbox"
          name="checkbox"
          checked={isDarkTheme}
          onChange={handleThemeChange}
        />
      </PopUserTheme>
      <PopUserButton type="button">
        <Link to="/exit">Выйти</Link>
      </PopUserButton>
    </PopUserWrapper>
  );
}