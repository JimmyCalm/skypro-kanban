import React, { useRef, useState, useContext } from "react";
import {
  PopUserContainer,
  PopUserName,
  PopUserMail,
  PopUserTheme,
  PopUserButton,
} from "../PopUser/PopUser.styled";
import PopExit from "../PopExit/PopExit";
import { ThemeContext } from "../../../contexts/ThemeContext";

function PopUser({ $isVisible, onClose }) {
  const [isExitOpen, setIsExitOpen] = useState(false);
  const ref = useRef();

  const { theme, toggleTheme } = useContext(ThemeContext);

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const userName = userInfo?.name || "Пользователь";
  const userLogin = userInfo?.login || "Эл. почта";

  if (!$isVisible) return null;

  return (
    <>
      <PopUserContainer ref={ref} $isVisible={$isVisible} id="user-set-target">
        <PopUserName>{userName}</PopUserName>
        <PopUserMail>{userLogin}</PopUserMail>
        <PopUserTheme>
          <p>Темная тема</p>
          <input
            type="checkbox"
            className="checkbox"
            name="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
        </PopUserTheme>
        <PopUserButton type="button" onClick={() => setIsExitOpen(true)}>
          Выйти
        </PopUserButton>
      </PopUserContainer>
      {isExitOpen && (
        <PopExit
          onClose={() => {
            setIsExitOpen(false);
            onClose && onClose();
          }}
        />
      )}
    </>
  );
}

export default PopUser;