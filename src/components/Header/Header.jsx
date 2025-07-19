import { useState } from "react";
import PopUser from "../Popups/PopUser";

export default function Header() {
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);

  const toggleUserPopup = () => {
    setIsUserPopupOpen(!isUserPopupOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__block">
          <div className="header__logo _show _light">
            <a href="" target="_self">
              <img src="../public/images/logo.png" alt="logo"></img>
            </a>
          </div>
          <div className="header__logo _dark">
            <a href="" target="_self">
              <img src="../public/images/logo_dark.png" alt="logo"></img>
            </a>
          </div>
          <nav className="header__nav">
            <button className="header__btn-main-new _hover01" id="btnMainNew">
              <a href="#popNewCard">Создать новую задачу</a>
            </button>
            <a 
              href="#user-set-target" 
              className="header__user _hover02"
              onClick={(e) => {
                e.preventDefault();
                toggleUserPopup();
              }}
            >
              Ivan Ivanov
            </a>
            {isUserPopupOpen && <PopUser onClose={toggleUserPopup} />}
          </nav>
        </div>
      </div>
    </header>
  );
}