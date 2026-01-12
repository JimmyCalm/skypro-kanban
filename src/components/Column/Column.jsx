import React from "react";
import Card from "../Card/Card";
import { ColumnWrapper, ColumnTitle, CardsContainer } from "./Column.styled";

function Column({ title, cards }) {
  return (
    <ColumnWrapper>
      <ColumnTitle>
        <p>{title}</p>
      </ColumnTitle>
      <CardsContainer>
        {cards && cards.length > 0 ? (
          cards.map((card, index) => (
            <Card
              key={card.id ?? `${card.title || "no-title"}-${index}`}
              card={card}
            />
          ))
        ) : (
          <div
            style={{ padding: "10px", color: "#94A6BE", fontStyle: "italic" }}
          >
            Нет задач
          </div>
        )}
      </CardsContainer>
    </ColumnWrapper>
  );
}

export default Column;