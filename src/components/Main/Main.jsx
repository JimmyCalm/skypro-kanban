import Column from '../Column/Column';
import Card from '../Card/Card';

function Main() {
  return (
    <main className="main">
      <div className="container">
        <div className="main__block">
          <div className="main__content">
            <Column title="Без статуса">
              <Card />
              <Card />
            </Column>
            <Column title="Нужно сделать">
              <Card />
            </Column>
            <Column title="В работе">
              <Card />
              <Card />
            </Column>
            <Column title="Тестирование">
              <Card />
            </Column>
            <Column title="Готово">
              <Card />
            </Column>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
