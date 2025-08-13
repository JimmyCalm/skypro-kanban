import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFoundWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f1f1;
`;

const NotFoundMessage = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export default function NotFoundPage() {
  return (
    <NotFoundWrapper>
      <NotFoundMessage>
        <h2>404 - Страница не найдена</h2>
        <p>К сожалению, запрошенная страница не существует.</p>
        <Link to="/">Вернуться на главную</Link>
      </NotFoundMessage>
    </NotFoundWrapper>
  );
}
