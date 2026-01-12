
import {
  NotFoundContainer,
  NotFoundTitle,
  NotFoundText,
  NotFoundLink,
} from "./NotFoundPage.styled";

function NotFoundPage() {
  return (
    <NotFoundContainer>
      <NotFoundTitle>404</NotFoundTitle>
      <NotFoundText>Страница не найдена</NotFoundText>
      <NotFoundLink to="/">Вернуться на главную</NotFoundLink>
    </NotFoundContainer>
  );
}
export default NotFoundPage;
