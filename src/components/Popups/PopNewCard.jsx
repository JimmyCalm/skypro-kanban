import Calendar from "../Calendar/Calendar";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { addTask } from "../../services/kanban";
import { AuthContext } from "../../context/AuthContext";
import { TaskContext } from "../../context/TaskContext";

export default function PopNewCard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { addTask: addTaskToContext } = useContext(TaskContext);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    topic: "Web Design",
    description: "",
    status: "Без статуса",
    date: new Date().toISOString(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (newDate) => {
    setFormData((prev) => ({ ...prev, date: newDate.toISOString() }));
  };


  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);
    return `${day}.${month}.${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.token) {
      alert("Токен отсутствует. Пожалуйста, войдите заново.");
      return;
    }
    if (!formData.date) {
      alert("Выберите дату исполнения");
      return;
    }
    
    try {
      setIsSubmitting(true);

      await addTask(formData, user.token);
      

      const tempTask = {
        id: Date.now(),
        title: formData.title,
        topic: formData.topic,
        description: formData.description,
        status: formData.status,
        date: formatDate(formData.date),
      };
      

      addTaskToContext(tempTask);
      navigate(-1);
    } catch (error) {
      alert("Ошибка создания задачи: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pop-new-card" id="popNewCard">
      <div className="pop-new-card__container">
        <div className="pop-new-card__block">
          <div className="pop-new-card__content">
            <h3 className="pop-new-card__ttl">Создание задачи</h3>
            <a
              href="#"
              className="pop-new-card__close"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              &#10006;
            </a>
            <div className="pop-new-card__wrap">
              <form
                className="pop-new-card__form form-new"
                id="formNewCard"
                onSubmit={handleSubmit}
              >
                <div className="form-new__block">
                  <label htmlFor="formTitle" className="subttl">
                    Название задачи
                  </label>
                  <input
                    className="form-new__input"
                    type="text"
                    name="title"
                    id="formTitle"
                    placeholder="Введите название задачи..."
                    autoFocus
                    autoComplete="off"
                    value={formData.title}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="form-new__block">
                  <label htmlFor="textArea" className="subttl">
                    Описание задачи
                  </label>
                  <textarea
                    className="form-new__area"
                    name="description"
                    id="textArea"
                    placeholder="Введите описание задачи..."
                    value={formData.description}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  ></textarea>
                </div>
              </form>
              <Calendar
                selectedDate={new Date(formData.date)}
                onDateChange={handleDateChange}
              />
            </div>
            <div className="pop-new-card__categories categories">
              <p className="categories__p subttl">Категория</p>
              <div className="categories__themes">
                <div
                  className={`categories__theme ${
                    formData.topic === "Web Design" ? "_active-category" : ""
                  } _web-design`}
                  onClick={() => !isSubmitting && setFormData((prev) => ({ ...prev, topic: "Web Design" }))}
                >
                  <p className="_web-design">Web Design</p>
                </div>
                <div
                  className={`categories__theme ${
                    formData.topic === "Research" ? "_active-category" : ""
                  } _research`}
                  onClick={() => !isSubmitting && setFormData((prev) => ({ ...prev, topic: "Research" }))}
                >
                  <p className="_research">Research</p>
                </div>
                <div
                  className={`categories__theme ${
                    formData.topic === "Copywriting" ? "_active-category" : ""
                  } _copywriting`}
                  onClick={() => !isSubmitting && setFormData((prev) => ({ ...prev, topic: "Copywriting" }))}
                >
                  <p className="_copywriting">Copywriting</p>
                </div>
              </div>
            </div>
            <button 
              className="form-new__create _hover01" 
              type="submit" 
              form="formNewCard"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Создание..." : "Создать задачу"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}