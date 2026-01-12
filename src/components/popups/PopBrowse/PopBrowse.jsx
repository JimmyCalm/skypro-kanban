import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../../Calendar/Calendar.jsx";
import {
  PopBrowseStyled,
  PopBrowseContainer,
  PopBrowseBlock,
  PopBrowseContent,
  PopBrowseTopBlock,
  PopBrowseTitle,
  PopBrowseWrap,
  PopBrowseForm,
  FormBrowseBlock,
  FormBrowseArea,
  Status,
  StatusP,
  StatusThemes,
  StatusTheme,
  PopBrowseButtons,
  CategoryTheme,
} from "./PopBrowse.styled";
import { statusList } from "../../../data.js";
import { useTasks } from "../../../contexts/TaskContext";

const formatDateForServer = (dateString) => {
  if (!dateString) {
    return new Date().toISOString();
  }

  if (typeof dateString === "string") {
    if (/^\d{2}\.\d{2}\.\d{4}$/.test(dateString)) {
      const [day, month, year] = dateString.split(".");
      const date = new Date(year, month - 1, day);
      return date.toISOString();
    }

    if (dateString.includes("T")) {
      return dateString;
    }
  }

  if (dateString instanceof Date) {
    return dateString.toISOString();
  }

  return new Date().toISOString();
};

const formatDateForDisplay = (dateString) => {
  if (!dateString) return "";

  if (
    typeof dateString === "string" &&
    /^\d{2}\.\d{2}\.\d{4}$/.test(dateString)
  ) {
    return dateString;
  }

  try {
    const date = new Date(dateString);
    if (isNaN(date)) return "";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  } catch (error) {
    console.error("Ошибка форматирования даты для отображения:", error);
    return "";
  }
};

function PopBrowse({ task, onClose }) {
  const navigate = useNavigate();
  const { updateTask, deleteTask, operationLoading } = useTasks();

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedStatus, setEditedStatus] = useState(
    task?.status || "БЕЗ СТАТУСА"
  );
  const [editedDescription, setEditedDescription] = useState(
    task?.description || ""
  );
  const [editedDate, setEditedDate] = useState(
    task?.date ? formatDateForDisplay(task.date) : ""
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setEditedStatus(task.status || "БЕЗ СТАТУСА");
      setEditedDescription(task.description || "");
      setEditedDate(task.date ? formatDateForDisplay(task.date) : "");
      setErrors({});
    }
  }, [task]);

  if (!task) {
    onClose && onClose();
    return null;
  }

  const getThemeClass = (topic) => {
    const topicLower = (topic || "").toLowerCase();
    if (topicLower.includes("web") || topicLower.includes("design")) {
      return "_web-design";
    }
    if (topicLower.includes("research")) {
      return "_research";
    }
    if (topicLower.includes("copywriting")) {
      return "_copywriting";
    }
    return "";
  };

  const themeClass = getThemeClass(task.topic);

  const validateEditForm = () => {
    const newErrors = {};
    
    if (!editedDescription.trim()) {
      newErrors.description = "Введите описание задачи";
    }
    
    if (!editedDate.trim()) {
      newErrors.date = "Выберите дату";
    } else {
      const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
      if (!dateRegex.test(editedDate)) {
        newErrors.date = "Неверный формат даты. Используйте ДД.ММ.ГГГГ";
      } else {
        const [day, month, year] = editedDate.split('.');
        const dateObj = new Date(year, month - 1, day);
        if (isNaN(dateObj.getTime())) {
          newErrors.date = "Неверная дата";
        } else {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          dateObj.setHours(0, 0, 0, 0);
          if (dateObj < today) {
            newErrors.date = "Дата не может быть в прошлом";
          }
        }
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () => {
    setEditedStatus(task.status || "БЕЗ СТАТУСА");
    setEditedDescription(task.description || "");
    setEditedDate(task.date ? formatDateForDisplay(task.date) : "");
    setIsEditMode(false);
    setErrors({});
  };

  const handleSave = async () => {
    if (!validateEditForm()) {
      return;
    }

    setErrors({});

    try {
      const serverId = task._id || task.id;
      if (!serverId) {
        throw new Error("Не найден ID задачи");
      }

      const updatedTask = {
        title: task.title,
        description: editedDescription.trim(),
        status: editedStatus,
        date: formatDateForServer(editedDate),
        topic: task.topic || "Web Design",
      };

      console.log("Обновление задачи:", updatedTask);

      await updateTask(serverId, updatedTask);

      setIsEditMode(false);
    } catch (error) {
      setErrors({ 
        general: "Не удалось обновить задачу: " + error.message 
      });
      console.error("Ошибка обновления задачи:", error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Вы уверены, что хотите удалить эту задачу?")) return;

    try {
      const serverId = task._id || task.id;
      if (!serverId) {
        throw new Error("Не найден ID задачи");
      }

      await deleteTask(serverId);

      navigate("/");
    } catch (error) {
      setErrors({ 
        general: "Не удалось удалить задачу: " + error.message 
      });
      console.error("Ошибка удаления задачи:", error);
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  const isLoading = operationLoading;

  return (
    <PopBrowseStyled id="popBrowse">
      <PopBrowseContainer onClick={handleClose}>
        <PopBrowseBlock onClick={(e) => e.stopPropagation()}>
          <PopBrowseContent>
            <PopBrowseTopBlock>
              <PopBrowseTitle>{task.title || "Без названия"}</PopBrowseTitle>
              <CategoryTheme className={`${themeClass} _active-category`}>
                <p className={themeClass}>{task.topic || "Без категории"}</p>
              </CategoryTheme>
            </PopBrowseTopBlock>

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

            <Status>
              <StatusP>Статус</StatusP>
              <StatusThemes>
                {isEditMode ? (
                  statusList.map((status) => (
                    <StatusTheme
                      key={status}
                      onClick={() => !isLoading && setEditedStatus(status)}
                      style={{
                        backgroundColor:
                          editedStatus === status ? "#94A6BE" : "#ffffff",
                        borderColor: "#94A6BE",
                        color: editedStatus === status ? "#ffffff" : "#94A6BE",
                        cursor: isLoading ? "not-allowed" : "pointer",
                        opacity: isLoading ? 0.5 : 1,
                      }}
                    >
                      <p>{status}</p>
                    </StatusTheme>
                  ))
                ) : (
                  <StatusTheme
                    style={{
                      backgroundColor: "#94A6BE",
                      borderColor: "#94A6BE",
                      color: "#ffffff",
                    }}
                  >
                    <p>{task.status || "БЕЗ СТАТУСА"}</p>
                  </StatusTheme>
                )}
              </StatusThemes>
            </Status>

            <PopBrowseWrap>
              <PopBrowseForm id="formBrowseCard" action="#">
                <FormBrowseBlock>
                  <label htmlFor="textArea01" className="subttl">
                    Описание задачи
                  </label>
                  <FormBrowseArea
                    name="text"
                    id="textArea01"
                    readOnly={!isEditMode || isLoading}
                    placeholder="Введите описание задачи..."
                    value={editedDescription}
                    onChange={(e) => {
                      setEditedDescription(e.target.value);
                      if (errors.description) {
                        setErrors(prev => ({ ...prev, description: undefined }));
                      }
                    }}
                    style={{ 
                      borderColor: errors.description ? "#ff4444" : "",
                      marginBottom: errors.description ? "5px" : "0"
                    }}
                  />
                  {errors.description && (
                    <div style={{ 
                      color: "#ff4444", 
                      fontSize: "12px", 
                      marginTop: "5px",
                      marginBottom: "10px"
                    }}>
                      {errors.description}
                    </div>
                  )}
                </FormBrowseBlock>
              </PopBrowseForm>
              
              <div style={{ flex: 1, marginLeft: "20px" }}>
                <label className="subttl" style={{ 
                  marginBottom: "10px", 
                  display: "block",
                  color: "var(--text)",
                  fontSize: "14px",
                  fontWeight: "600",
                  lineHeight: "1"
                }}>
                  Дата завершения
                </label>
                <Calendar
                  value={editedDate}
                  onChange={(value) => {
                    setEditedDate(value);
                    if (errors.date) {
                      setErrors(prev => ({ ...prev, date: undefined }));
                    }
                  }}
                  isDisabled={!isEditMode || isLoading}
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
            </PopBrowseWrap>

            {!isEditMode ? (
              <PopBrowseButtons className="pop-browse__btn-browse">
                <div className="btn-group">
                  <button
                    className="btn-browse__edit _btn-bor _hover03"
                    onClick={() => setIsEditMode(true)}
                    disabled={isLoading}
                  >
                    Редактировать задачу
                  </button>
                  <button
                    className="btn-browse__delete _btn-bor _hover03"
                    onClick={handleDelete}
                    disabled={isLoading}
                  >
                    Удалить задачу
                  </button>
                </div>
                <button
                  className="btn-edit__edit _btn-bg _hover01"
                  onClick={handleClose}
                  disabled={isLoading}
                >
                  Закрыть
                </button>
              </PopBrowseButtons>
            ) : (
              <PopBrowseButtons className="pop-browse__btn-edit">
                <div className="btn-group">
                  <button
                    className="btn-edit__edit _btn-bg _hover01"
                    onClick={handleSave}
                    disabled={isLoading || !editedDescription.trim() || !editedDate.trim()}
                    style={{
                      opacity: (isLoading || !editedDescription.trim() || !editedDate.trim()) ? 0.7 : 1,
                      cursor: (isLoading || !editedDescription.trim() || !editedDate.trim()) ? "not-allowed" : "pointer"
                    }}
                  >
                    {isLoading ? "Сохранение..." : "Сохранить"}
                  </button>
                  <button
                    className="btn-edit__edit _btn-bor _hover03"
                    onClick={handleCancel}
                    disabled={isLoading}
                  >
                    Отменить
                  </button>
                  <button
                    className="btn-edit__delete _btn-bor _hover03"
                    id="btnDelete"
                    onClick={handleDelete}
                    disabled={isLoading}
                  >
                    Удалить задачу
                  </button>
                </div>
                <button
                  onClick={handleClose}
                  className="btn-edit__close _btn-bg _hover01"
                  disabled={isLoading}
                >
                  Закрыть
                </button>
              </PopBrowseButtons>
            )}
          </PopBrowseContent>
        </PopBrowseBlock>
      </PopBrowseContainer>
    </PopBrowseStyled>
  );
}

export default PopBrowse;