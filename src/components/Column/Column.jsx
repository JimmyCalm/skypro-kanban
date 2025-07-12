import Card from "../Card/Card";

export default function Column({ title }) {
  return (
    <div className="main__column column">
      <div className="column__title">
        <p>{title}</p>
      </div>
      <div className="cards">
        <Card />
      </div>
    </div>
  );
}