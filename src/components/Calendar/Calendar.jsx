import { useState, useEffect } from "react";

export default function Calendar({ selectedDate, onDateChange }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [formattedSelectedDate, setFormattedSelectedDate] = useState("");

  // Форматирование даты в DD.MM.YY
  const formatDate = (date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);
    return `${day}.${month}.${year}`;
  };

  // Обновление отображаемой даты при изменении selectedDate
  useEffect(() => {
    setFormattedSelectedDate(formatDate(selectedDate));
  }, [selectedDate]);

  // Навигация: предыдущий месяц
  const prevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  // Навигация: следующий месяц
  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  // Генерация дней месяца
  const generateDays = () => {
    const days = [];
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

    // Заполнение дней предыдущего месяца
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        type: "_other-month",
        isWeekend: false,
      });
    }

    // Дни текущего месяца
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isWeekend = date.getDay() === 5 || date.getDay() === 6;
      const isSelected =
        selectedDate &&
        date.getFullYear() === selectedDate.getFullYear() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getDate() === selectedDate.getDate();
      days.push({
        day,
        type: isSelected ? "_active-day" : "_cell-day",
        isWeekend,
      });
    }

    // Заполнение дней следующего месяца
    while (days.length < 42) { // 6 недель максимум
      const nextDay = days.length - (firstDay - 1) - daysInMonth + 1;
      days.push({
        day: nextDay,
        type: "_other-month",
        isWeekend: false,
      });
    }

    return days;
  };

  // Выбор даты
  const handleDateClick = (day, type) => {
    if (type === "_other-month") return; // Игнорируем другие месяцы
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    onDateChange(newDate); // Вызываем колбэк для обновления формы
  };

  const days = generateDays();
  const monthNames = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
  ];

  return (
    <div className="pop-new-card__calendar calendar">
      <p className="calendar__ttl subttl">Даты</p>
      <div className="calendar__block">
        <div className="calendar__nav">
          <div className="calendar__month">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </div>
          <div className="nav__actions">
            <div className="nav__action" data-action="prev" onClick={prevMonth}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="11"
                viewBox="0 0 6 11"
              >
                <path d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z" />
              </svg>
            </div>
            <div className="nav__action" data-action="next" onClick={nextMonth}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="11"
                viewBox="0 0 6 11"
              >
                <path d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="calendar__content">
          <div className="calendar__days-names">
            <div className="calendar__day-name">Пн</div>
            <div className="calendar__day-name">Вт</div>
            <div className="calendar__day-name">Ср</div>
            <div className="calendar__day-name">Чт</div>
            <div className="calendar__day-name">Пт</div>
            <div className="calendar__day-name _weekend">Сб</div>
            <div className="calendar__day-name _weekend">Вс</div>
          </div>
          <div className="calendar__cells">
            {days.map((dayInfo, index) => (
              <div
                key={index}
                className={`calendar__cell ${dayInfo.type} ${dayInfo.isWeekend ? "_weekend" : ""}`}
                onClick={() => handleDateClick(dayInfo.day, dayInfo.type)}
              >
                {dayInfo.day}
              </div>
            ))}
          </div>
        </div>
        <input type="hidden" id="datepick_value" value={formatDate(selectedDate)} />
        <div className="calendar__period">
          <p className="calendar__p date-end">
            Выберите срок исполнения <span className="date-control">{formattedSelectedDate}</span>.
          </p>
        </div>
      </div>
    </div>
  );
}