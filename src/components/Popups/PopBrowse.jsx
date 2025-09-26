import Calendar from "../Calendar/Calendar";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getTaskById,
  updateTask,
  deleteTask,
} from "../../services/kanban";

export default function PopBrowse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    topic: "Web Design",
    description: "",
    status: "Без статуса",
    date: new Date().toISOString(),
  });
  const [error, setError] = useState("");

  const statuses = [
    "Без статуса",
    "Нужно сделать",
    "В работе",
    "Тестирование",
    "Готово",
  ];

  useEffect(() => {
    const fetchTask = async () => {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      if (!token) {
        setError("Токен отсутствует. Пожалуйста, войдите заново.");
        return;
      }
      try {
        const fetchedTask = await getTaskById(id, token);
        setTask(fetchedTask);
        setFormData({
          title: fetchedTask.title || "",
          topic: fetchedTask.topic || "Web Design",
          description: fetchedTask.description || "",
          status: fetchedTask.status || "Без статуса",
          date: fetchedTask.date || new Date().toISOString(),
        });
      } catch (err) {
        setError(err.message || "Не удалось загрузить задачу");
      }
    };
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (newDate) => {
    setFormData((prev) => ({ ...prev, date: newDate.toISOString() }));
  };

  const handleStatusChange = (newStatus) => {
    setFormData((prev) => ({ ...prev, status: newStatus }));
  };

  const handleSave = async () => {
    const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
    if (!token) {
      setError("Токен отсутствует. Пожалуйста, войдите заново.");
      return;
    }
    if (!formData.status) {
      setError("Выберите статус задачи");
      return;
    }
    try {
      await updateTask(id, formData, token);
      setTask({ ...task, ...formData });
      setIsEditing(false);
      setError("");
    } catch (err) {
      setError(err.message || "Не удалось обновить задачу");
    }
  };

  const handleDelete = async () => {
    const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
    if (!token) {
      setError("Токен отсутствует. Пожалуйста, войдите заново.");
      return;
    }
    if (window.confirm("Вы уверены, что хотите удалить эту задачу?")) {
      try {
        await deleteTask(id, token);
        navigate("/");
      } catch (err) {
        setError(err.message || "Не удалось удалить задачу");
      }
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  if (!task) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="pop-browse" id="popBrowse">
      <div className="pop-browse__container">
        <div className="pop-browse__block">
          <div className="pop-browse__content">
            <div className="pop-browse__top-block">
              <h3 className="pop-browse__ttl">Карточка №{id}</h3>
              <div className="categories__theme theme-top _web-design _active-category">
                <p className="_web-design">{formData.topic}</p>
              </div>
            </div>
            <div className="pop-browse__status status">
              <p className="status__p subttl">Статус</p>
              {isEditing ? (
                <div className="status__themes">
                  {statuses.map((status) => (
                    <div
                      key={status}
                      className={`status__theme ${
                        formData.status === status ? "_active-status" : ""
                      }`}
                      onClick={() => handleStatusChange(status)}
                    >
                      <p>{status}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="status__current">
                  <p>{formData.status}</p>
                </div>
              )}
            </div>
            <div className="pop-browse__wrap">
              <form className="pop-browse__form form-browse" id="formBrowseCard">
                <div className="form-browse__block">
                  <label htmlFor="textArea01" className="subttl">
                    Описание задачи
                  </label>
                  <textarea
                    className="form-browse__area"
                    name="description"
                    id="textArea01"
                    placeholder="Введите описание задачи..."
                    value={formData.description}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  ></textarea>
                </div>
              </form>
              {isEditing && (
                <Calendar
                  selectedDate={new Date(formData.date)}
                  onDateChange={handleDateChange}
                />
              )}
            </div>
            <div className="theme-down__categories theme-down">
              <p className="categories__p subttl">Категория</p>
              <div className="categories__theme _web-design _active-category">
                <p className="_web-design">{formData.topic}</p>
              </div>
            </div>
            <div className={`pop-browse__btn-browse ${isEditing ? "_hide" : ""}`}>
              <div className="btn-group">
                <button className="btn-browse__edit _btn-bor _hover03" onClick={handleEditToggle}>
                  Редактировать задачу
                </button>
                <button className="btn-browse__delete _btn-bor _hover03" onClick={handleDelete}>
                  Удалить задачу
                </button>
              </div>
              <button
                className="btn-browse__close _btn-bg _hover01"
                onClick={() => navigate(-1)}
              >
                Закрыть
              </button>
            </div>
            <div className={`pop-browse__btn-edit ${!isEditing ? "_hide" : ""}`}>
              <div className="btn-group">
                <button className="btn-edit__edit _btn-bg _hover01" onClick={handleSave}>
                  Сохранить
                </button>
                <button className="btn-edit__edit _btn-bor _hover03" onClick={handleEditToggle}>
                  Отменить
                </button>
                <button className="btn-edit__delete _btn-bor _hover03" onClick={handleDelete}>
                  Удалить задачу
                </button>
              </div>
              <button
                className="btn-edit__close _btn-bg _hover01"
                onClick={() => navigate(-1)}
              >
                Закрыть
              </button>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}