import {
  PopExitWrapper,
  PopExitContainer,
  PopExitBlock,
  PopExitTitle,
  PopExitForm,
  PopExitButtonYes,
  PopExitButtonNo,
} from "./PopExit.styled";
import { Link } from "react-router-dom";

export default function PopExit() {

  return (
    <PopExitWrapper id="popExit">
      <PopExitContainer>
        <PopExitBlock>
          <PopExitTitle>
            <h2>Выйти из аккаунта?</h2>
          </PopExitTitle>
          <PopExitForm id="formExit" action="#">
            <PopExitButtonYes id="exitYes">
              <Link to="/register">Да, выйти</Link>
            </PopExitButtonYes>
            <PopExitButtonNo id="exitNo">
              <Link to="/">Нет, остаться</Link>
            </PopExitButtonNo>
          </PopExitForm>
        </PopExitBlock>
      </PopExitContainer>
    </PopExitWrapper>
  );
}
