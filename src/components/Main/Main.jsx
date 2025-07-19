import Column from "../Column/Column";
import { cardList } from "../../data";

export default function Main() {
  const statuses = [
    "Без статуса",
    "Нужно сделать",
    "В работе",
    "Тестирование",
    "Готово",
  ];

  return (
    <main className="main">
      <div className="container">
        <div className="main__block">
          {statuses.map((status) => (
            <Column 
            key={status}
            title={status}
            cards={cardList.filter(card => card.status === status)} 
            />
          ))}
        </div>
      </div>
    </main>
  );
}