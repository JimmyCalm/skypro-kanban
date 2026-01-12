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
  const [errors, setErrors] = useState({});
  
  const { createTask, operationLoading } = useTasks();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = "Введите название задачи";
    }
    
    if (!date.trim()) {
      newErrors.date = "Выберите дату";
    } else {
      const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
      if (!dateRegex.test(date)) {
        newErrors.date = "Неверный формат даты. Используйте ДД.ММ.ГГГГ";
      } else {
        const [day, month, year] = date.split('.');
        const dateObj = new Date(year, month - 1, day);
        if (isNaN(dateObj.getTime())) {
          newErrors.date = "Неверная дата";
        }
      }
    }
    
    if (!category.trim()) {
      newErrors.category = "Выберите категорию";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    if (!validateForm()) {
      return;
    }

    setErrors({});

    try {
      const newTask = {
        title: title.trim(),
        description: description.trim() || "",
        topic: category,
        status: "БЕЗ СТАТУСА",
        date: formatDateForServer(date),
      };

      console.log("Создание задачи:", newTask);

      await createTask(newTask);

      setTitle("");
      setDescription("");
      setDate("");
      setCategory("Web Design");
      setErrors({});

      handleClose();
    } catch (error) {
      console.error("Ошибка создания задачи:", error);
      setErrors({ 
        general: "Не удалось создать задачу: " + (error.message || "Неизвестная ошибка") 
      });
    }
  };

  const handleClose = () => {
    setErrors({});
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  const isLoading = operationLoading;
  const isFormValid = title.trim() && date.trim() && category.trim();

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

            {errors.general && (
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
                {errors.general}
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
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (errors.title) {
                        setErrors(prev => ({ ...prev, title: undefined }));
                      }
                    }}
                    disabled={isLoading}
                    style={{ 
                      borderColor: errors.title ? "#ff4444" : "",
                      marginBottom: errors.title ? "5px" : "20px"
                    }}
                  />
                  {errors.title && (
                    <div style={{ 
                      color: "#ff4444", 
                      fontSize: "12px", 
                      marginTop: "-15px",
                      marginBottom: "15px"
                    }}>
                      {errors.title}
                    </div>
                  )}
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
              
              <div style={{ flex: 1, marginLeft: "20px" }}>
                <Subtitle style={{ marginBottom: "10px" }}>Дата завершения</Subtitle>
                <Calendar 
                  value={date} 
                  onChange={(value) => {
                    setDate(value);
                    if (errors.date) {
                      setErrors(prev => ({ ...prev, date: undefined }));
                    }
                  }} 
                  disabled={isLoading}
                />
                {errors.date && (
                  <div style={{ 
                    color: "#ff4444", 
                    fontSize: "12px", 
                    marginTop: "10px"
                  }}>
                    {errors.date}
                  </div>
                )}
              </div>
            </PopNewCardWrap>
            
            <Categories>
              <CategoriesP>Выберите категорию</CategoriesP>
              {errors.category && (
                <div style={{ 
                  color: "#ff4444", 
                  fontSize: "12px", 
                  marginBottom: "5px"
                }}>
                  {errors.category}
                </div>
              )}
              <CategoriesThemes>
                <CategoriesTheme
                  className={`${getCategoryClass("Web Design")} ${
                    category === "Web Design" ? "_active-category" : ""
                  }`}
                  onClick={() => {
                    if (!isLoading) {
                      setCategory("Web Design");
                      if (errors.category) {
                        setErrors(prev => ({ ...prev, category: undefined }));
                      }
                    }
                  }}
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
                  onClick={() => {
                    if (!isLoading) {
                      setCategory("Research");
                      if (errors.category) {
                        setErrors(prev => ({ ...prev, category: undefined }));
                      }
                    }
                  }}
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
                  onClick={() => {
                    if (!isLoading) {
                      setCategory("Copywriting");
                      if (errors.category) {
                        setErrors(prev => ({ ...prev, category: undefined }));
                      }
                    }
                  }}
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
              disabled={isLoading || !isFormValid}
              style={{ 
                opacity: (isLoading || !isFormValid) ? 0.7 : 1,
                cursor: (isLoading || !isFormValid) ? "not-allowed" : "pointer"
              }}
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