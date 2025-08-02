import { useState } from 'react';
import PopUser from '../Popups/PopUser';
import {
  HeaderWrapper,
  HeaderBlock,
  HeaderLogo,
  HeaderNav,
  HeaderButtonNew,
  HeaderUser,
} from './Header.styled';

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
            <a href="" target="_self">
              <img src="../public/images/logo.png" alt="logo" />
            </a>
          </HeaderLogo>
          <HeaderLogo className="_dark">
            <a href="" target="_self">
              <img src="../public/images/logo_dark.png" alt="logo" />
            </a>
          </HeaderLogo>
          <HeaderNav>
            <HeaderButtonNew id="btnMainNew">
              <a href="#popNewCard">Создать новую задачу</a>
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