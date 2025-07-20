import Card from "../Card/Card";

export default function Column({ title, cards }) {

  const filteredCards = cards.filter(card => card.status === title);

  return (
    <div className="main__column column">
      <div className="column__title">
        <p>{title}</p>
      </div>
      <div className="cards">
        {filteredCards.map(card => (
          <Card key={card.id} cardData={card} />
        ))}
      </div>
    </div>
  );
}