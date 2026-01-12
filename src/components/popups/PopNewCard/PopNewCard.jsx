import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Calendar from "../../Calendar/Calendar";
import {
  PopNewCardStyled,
  PopNewCardContainer,
  PopNewCardBlock,
  PopNewCardContent,
  PopNewCardTitle,
  PopNewCardClose,
  PopNewCardWrap,
  PopNewCardForm,
  FormNewBlock,
  FormNewInput,
  FormNewArea,
  FormNewCreate,
  Categories,
  CategoriesP,
  CategoriesThemes,
  CategoriesTheme,
  Subtitle,
} from "./PopNewCard.styled";
import { useTasks } from "../../../contexts/TaskContext";

const formatDateForServer = (dateString) => {
  if (!dateString) {
    return new Date().toISOString();
  }

  if (typeof dateString === "string") {
    // Если дата в формате "дд.мм.гггг", конвертируем в ISO
    if (/^\d{2}\.\d{2}\.\d{4}$/.test(dateString)) {
      const [day, month, year] = dateString.split(".");
      const date = new Date(year, month - 1, day);
      return date.toISOString();
    }

    // Если уже ISO строка, возвращаем как есть
    if (dateString.includes("T")) {
      return dateString;
    }
  }

  // Если объект Date
  if (dateString instanceof Date) {
    return dateString.toISOString();
  }

  return new Date().toISOString();
};

function PopNewCard({ onClose }) {
  const [category, setCategory] = useState("Web Design");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const { createTask, operationLoading } = useTasks();
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  const handleCreate = async () => {
    if (!title.trim()) {
      setError("Введите название задачи");
      return;
    }

    setError("");

    try {
      const newTask = {
        title: title.trim(),
        description: description.trim() || "",
        topic: category,
        status: "БЕЗ СТАТУСА",
        date: formatDateForServer(date),
      };

      console.log("Создание задачи:", newTask);

      // Задача добавится в UI моментально (оптимистичное обновление)
      await createTask(newTask);

      // Очищаем форму
      setTitle("");
      setDescription("");
      setDate("");
      setCategory("Web Design");

      // Закрываем попап
      handleClose();
    } catch (error) {
      console.error("Ошибка создания задачи:", error);
      setError(
        "Не удалось создать задачу: " + (error.message || "Неизвестная ошибка")
      );
    }
  };

  const isLoading = operationLoading;

  // Получаем класс для стилизации категории
  const getCategoryClass = (cat) => {
    switch (cat) {
      case "Web Design":
        return "_web-design";
      case "Research":
        return "_research";
      case "Copywriting":
        return "_copywriting";
      default:
        return "";
    }
  };

  return (
    <PopNewCardStyled id="popNewCard">
      <PopNewCardContainer>
        <PopNewCardBlock onClick={(e) => e.stopPropagation()}>
          <PopNewCardContent>
            <PopNewCardTitle>Создание задачи</PopNewCardTitle>
            <PopNewCardClose onClick={handleClose}>&#10006;</PopNewCardClose>

            {error && (
              <div
                style={{
                  color: "#ff4444",
                  backgroundColor: "#ffeeee",
                  padding: "10px",
                  borderRadius: "5px",
                  marginBottom: "15px",
                  fontSize: "14px",
                }}
              >
                {error}
              </div>
            )}

            <PopNewCardWrap>
              <PopNewCardForm id="formNewCard" action="#">
                <FormNewBlock>
                  <Subtitle htmlFor="formTitle">Название задачи</Subtitle>
                  <FormNewInput
                    type="text"
                    name="name"
                    id="formTitle"
                    placeholder="Введите название задачи..."
                    autoFocus
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isLoading}
                  />
                </FormNewBlock>
                <FormNewBlock>
                  <Subtitle htmlFor="textArea">Описание задачи</Subtitle>
                  <FormNewArea
                    name="text"
                    id="textArea"
                    placeholder="Введите описание задачи..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={isLoading}
                  />
                </FormNewBlock>
              </PopNewCardForm>
              <Calendar value={date} onChange={setDate} disabled={isLoading} />
            </PopNewCardWrap>
            <Categories>
              <CategoriesP>Выберите категорию</CategoriesP>
              <CategoriesThemes>
                <CategoriesTheme
                  className={`${getCategoryClass("Web Design")} ${
                    category === "Web Design" ? "_active-category" : ""
                  }`}
                  onClick={() => !isLoading && setCategory("Web Design")}
                  style={{
                    cursor: isLoading ? "not-allowed" : "pointer",
                    opacity: category === "Web Design" ? 1 : 0.4,
                  }}
                >
                  <p>Web Design</p>
                </CategoriesTheme>
                <CategoriesTheme
                  className={`${getCategoryClass("Research")} ${
                    category === "Research" ? "_active-category" : ""
                  }`}
                  onClick={() => !isLoading && setCategory("Research")}
                  style={{
                    cursor: isLoading ? "not-allowed" : "pointer",
                    opacity: category === "Research" ? 1 : 0.4,
                  }}
                >
                  <p>Research</p>
                </CategoriesTheme>
                <CategoriesTheme
                  className={`${getCategoryClass("Copywriting")} ${
                    category === "Copywriting" ? "_active-category" : ""
                  }`}
                  onClick={() => !isLoading && setCategory("Copywriting")}
                  style={{
                    cursor: isLoading ? "not-allowed" : "pointer",
                    opacity: category === "Copywriting" ? 1 : 0.4,
                  }}
                >
                  <p>Copywriting</p>
                </CategoriesTheme>
              </CategoriesThemes>
            </Categories>
            <FormNewCreate
              className="_hover01"
              id="btnCreate"
              onClick={handleCreate}
              disabled={isLoading || !title.trim()}
              style={{ opacity: isLoading ? 0.7 : 1 }}
            >
              {isLoading ? "Создание..." : "Создать задачу"}
            </FormNewCreate>
          </PopNewCardContent>
        </PopNewCardBlock>
      </PopNewCardContainer>
    </PopNewCardStyled>
  );
}

export default PopNewCard;