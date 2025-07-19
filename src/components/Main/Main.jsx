import Column from "../Column/Column";

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
            <Column key={status} title={status} />
          ))}
        </div>
      </div>
    </main>
  );
}