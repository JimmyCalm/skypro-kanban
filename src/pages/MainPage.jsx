import Column from "../components/Column/Column";
import { cardList } from "../data";
import { useState, useEffect } from "react";
import {
  MainWrapper,
  MainBlock,
  MainContent,
  LoadingContainer,
} from "../components/Main/Main.styled";
import { Outlet } from "react-router-dom";

export default function MainPage() {
  const statuses = [
    "Без статуса",
    "Нужно сделать",
    "В работе",
    "Тестирование",
    "Готово",
  ];
  const [isLoading, setIsLoading] = useState(true);
  // const [words, setWords] = useState([]);
  // const [error, setError] = useState("");
  // const getWords = useCallback(async () => {
  //   try {
  //     setLoading(true);
  //     const data = await fetchWords({
  //       // пока у нас не реализована авторизация, передаём токен вручную
  //       token: "bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck",
  //     });
  //     if (data) setWords(data);
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);
  // useEffect(() => {
  //   getWords();
  // }, [getWords]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <MainWrapper className="main">
        <div className="container">
          <MainBlock>
            {isLoading ? (
              <LoadingContainer>Данные загружаются...</LoadingContainer>
            ) : (
              <MainContent>
                {statuses.map((status) => (
                  <Column
                    key={status}
                    title={status}
                    cards={cardList.filter((card) => card.status === status)}
                  />
                ))}
              </MainContent>
            )}
          </MainBlock>
        </div>
      </MainWrapper>
      <Outlet />
    </>
  );
}
