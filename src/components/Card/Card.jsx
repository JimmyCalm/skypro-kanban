import { useNavigate } from "react-router-dom";
import {
  CardItem,
  CardWrapper,
  CardGroup,
  CardTheme,
  CardButton,
  CardTitle,
  CardContent,
  CardDate,
} from "./Card.styled";

export const formatDisplayDate = (date) => {
  if (!date) return "";
  if (typeof date === "string" && /^\d{2}\.\d{2}\.\d{4}$/.test(date)) {
    return date;
  }

  try {
    const dateObj = new Date(date);
    if (isNaN(dateObj)) return "";
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day}.${month}.${year}`;
  } catch (error) {
    console.error("Ошибка форматирования даты:", error);
    return "";
  }
};

function Card({ card }) {
  const getTheme = () => {
    if (!card.topic) return "gray";

    const topicLower = card.topic.toLowerCase();
    if (topicLower.includes("web") || topicLower.includes("design")) {
      return "webdesign";
    }
    if (topicLower.includes("research")) {
      return "research";
    }
    if (topicLower.includes("copywriting")) {
      return "copywriting";
    }
    return "gray";
  };

  const theme = getTheme();
  const navigate = useNavigate();

  if (!card) return null;

  const handleCardClick = (event) => {
    event.stopPropagation();
    
    const cardId = card._id || card.id;
    
    if (!cardId) {
      console.warn("Карточка без id:", card);
      return;
    }
    
    navigate(`/card/${cardId}`);
  };

  return (
    <CardItem>
      <CardWrapper>
        <CardGroup>
          <CardTheme theme={theme}>
            <p>{card.topic || "Без категории"}</p>
          </CardTheme>
          <CardButton onClick={handleCardClick}>
            <div></div>
            <div></div>
            <div></div>
          </CardButton>
        </CardGroup>
        <CardContent>
          <CardTitle>{card.title || "Без названия"}</CardTitle>
          <CardDate>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
            >
              <g clipPath="url(#clip0_1_415)">
                <path
                  d="M10.5625 2.03125H2.4375C1.7644 2.03125 1.21875 2.5769 1.21875 3.25V10.5625C1.21875 11.2356 1.7644 11.7812 2.4375 11.7812H10.5625C11.2356 11.7812 11.7812 11.2356 11.7812 10.5625V3.25C11.7812 2.5769 11.2356 2.03125 10.5625 2.03125Z"
                  stroke="#94A6BE"
                  strokeWidth="0.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.7812 4.0625H1.21875 M3.25 1.21875V2.03125 M9.75 1.21875V2.03125"
                  stroke="#94A6BE"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_415">
                  <rect width="13" height="13" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p>{formatDisplayDate(card.date)}</p>
          </CardDate>
        </CardContent>
      </CardWrapper>
    </CardItem>
  );
}

export default Card;