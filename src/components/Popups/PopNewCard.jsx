import Calendar from "../Calendar/Calendar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addTask } from "../../services/kanban";

export default function PopNewCard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    topic: "Web Design", // Значение по умолчанию
    description: "",
    status: "Без статуса", // Значение по умолчанию
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
    if (!token) {
      alert("Токен отсутствует. Пожалуйста, войдите заново.");
      return;
    }
    try {
      await addTask(formData, token);
      navigate(-1); // Вернуться назад
    } catch (error) {
      alert("Ошибка создания задачи: " + error.message);
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
                  ></textarea>
                </div>
              </form>
              <Calendar />
            </div>
            <div className="pop-new-card__categories categories">
              <p className="categories__p subttl">Категория</p>
              <div className="categories__themes">
                <div
                  className={`categories__theme ${
                    formData.topic === "Web Design" ? "_active-category" : ""
                  } _web-design`}
                  onClick={() => setFormData((prev) => ({ ...prev, topic: "Web Design" }))}
                >
                  <p className="_web-design">Web Design</p>
                </div>
                <div
                  className={`categories__theme ${
                    formData.topic === "Research" ? "_active-category" : ""
                  } _research`}
                  onClick={() => setFormData((prev) => ({ ...prev, topic: "Research" }))}
                >
                  <p className="_research">Research</p>
                </div>
                <div
                  className={`categories__theme ${
                    formData.topic === "Copywriting" ? "_active-category" : ""
                  } _copywriting`}
                  onClick={() => setFormData((prev) => ({ ...prev, topic: "Copywriting" }))}
                >
                  <p className="_copywriting">Copywriting</p>
                </div>
              </div>
            </div>
            <button className="form-new__create _hover01" type="submit" form="formNewCard">
              Создать задачу
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}