import { useParams } from 'react-router-dom';
import PopBrowse from '../components/Popups/PopBrowse';
import { cardList } from '../data';

export default function CardPage() {
  const { id } = useParams();
  const card = cardList.find((c) => c.id === parseInt(id));

  if (!card) return <div>Карточка не найдена</div>;

  return (
    <div>
      <PopBrowse />
      <h2>Карточка #{id}</h2>
      <p>Тема: {card.topic}</p>
      <p>Название: {card.title}</p>
      <p>Дата: {card.date}</p>
      <p>Статус: {card.status}</p>
    </div>
  );
}