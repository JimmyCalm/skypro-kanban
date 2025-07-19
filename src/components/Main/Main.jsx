import Column from "../Column/Column";
import { cardList } from "../../data";
import { useState, useEffect } from "react";

export default function Main() {
  const statuses = [
    "Без статуса",
    "Нужно сделать",
    "В работе",
    "Тестирование",
    "Готово",
  ];

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="main">
      <div className="container">
        <div className="main__block">
          {isLoading ? (
            <div
              style={{
                width: "100%",
                height: "60vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                color: "#565eef",
                fontWeight: "600",
              }}
            >
              Данные загружаются...
            </div>
          ) : (
            statuses.map((status) => (
              <Column
                key={status}
                title={status}
                cards={cardList.filter((card) => card.status === status)}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}