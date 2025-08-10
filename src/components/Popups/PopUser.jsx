import {
  PopUserWrapper,
  PopUserName,
  PopUserMail,
  PopUserTheme,
  PopUserButton,
} from './PopUser.styled';
import { useLocation, Link } from 'react-router-dom';

export default function PopUser({ onClose }) {
  const location = useLocation();

  return (
    <PopUserWrapper id="user-set-target">
      <Link
        to="#"
        onClick={(e) => {
          e.preventDefault();
          onClose();
        }}
        state={{ backgroundLocation: location }}
      >
        x
      </Link>
      <PopUserName>Ivan Ivanov</PopUserName>
      <PopUserMail>ivan.ivanov@gmail.com</PopUserMail>
      <PopUserTheme>
        <p>Темная тема</p>
        <input type="checkbox" name="checkbox" />
      </PopUserTheme>
      <PopUserButton
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onClose();
        }}
      >
        <Link to="/exit"
              state={{ backgroundLocation: location }}>
          Выйти
        </Link>
      </PopUserButton>
    </PopUserWrapper>
  );
}