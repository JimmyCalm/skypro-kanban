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
  const [error, setError] = useState("");

  useEffect(() => {
    if (task) {
      setEditedStatus(task.status || "БЕЗ СТАТУСА");
      setEditedDescription(task.description || "");
      setEditedDate(task.date ? formatDateForDisplay(task.date) : "");
      setError("");
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

  const handleCancel = () => {
    setEditedStatus(task.status || "БЕЗ СТАТУСА");
    setEditedDescription(task.description || "");
    setEditedDate(task.date ? formatDateForDisplay(task.date) : "");
    setIsEditMode(false);
    setError("");
  };

  const handleSave = async () => {
    if (!editedDescription.trim()) {
      setError("Введите описание задачи");
      return;
    }

    setError("");

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
      setError("Не удалось обновить задачу: " + error.message);
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
      setError("Не удалось удалить задачу: " + error.message);
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
                    onChange={(e) => setEditedDescription(e.target.value)}
                  />
                </FormBrowseBlock>
              </PopBrowseForm>
              <Calendar
                value={editedDate}
                onChange={setEditedDate}
                isDisabled={!isEditMode || isLoading}
              />
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
                    disabled={isLoading}
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