import Column from "../components/Column/Column";
import { useState, useEffect } from "react";
import {
  MainWrapper,
  MainBlock,
  MainContent,
  LoadingContainer,
} from "../components/Main/Main.styled";
import { Outlet, useNavigate } from "react-router-dom";
import { getTasks } from "../services/kanban"; 

export default function MainPage({ setIsAuth }) {
  const statuses = [
    "Без статуса",
    "Нужно сделать",
    "В работе",
    "Тестирование",
    "Готово",
  ];
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);
    return `${day}.${month}.${year}`;
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuth(false);
        navigate("/login");
        return;
      }

      try {
        const fetchedTasks = await getTasks(token);

        const formattedTasks = fetchedTasks.map((task) => ({
          ...task,
          date: formatDate(task.date),
        }));
        setTasks(formattedTasks);
      } catch (error) {
        console.error("Ошибка загрузки задач:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          setIsAuth(false);
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [navigate, setIsAuth]);

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
                    cards={tasks.filter((task) => task.status === status)}
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