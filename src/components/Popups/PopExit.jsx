import { useNavigate } from "react-router-dom";
import {
  PopExitWrapper,
  PopExitContainer,
  PopExitBlock,
  PopExitTitle,
  PopExitForm,
  PopExitButtonYes,
  PopExitButtonNo,
} from "./PopExit.styled";

export default function PopExit({ setIsAuth, onClose }) {
  const navigate = useNavigate();

  const handleExit = () => {
    setIsAuth(false);
    navigate("/login", { replace: true });
  };

  const handleStay = (e) => {
    e.preventDefault();
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  return (
    <PopExitWrapper id="popExit">
      <PopExitContainer>
        <PopExitBlock>
          <PopExitTitle>
            <h2>Выйти из аккаунта?</h2>
          </PopExitTitle>
          <PopExitForm id="formExit" action="#">
            <PopExitButtonYes id="exitYes" onClick={handleExit}>
              Да, выйти
            </PopExitButtonYes>
            <PopExitButtonNo id="exitNo" onClick={handleStay}>
              Нет, остаться
            </PopExitButtonNo>
          </PopExitForm>
        </PopExitBlock>
      </PopExitContainer>
    </PopExitWrapper>
  );
}