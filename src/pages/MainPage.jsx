import Column from "../components/Column/Column";
import { useContext, useEffect, useState } from "react";
import {
  MainWrapper,
  MainBlock,
  MainContent,
  LoadingContainer,
} from "../components/Main/Main.styled";
import { Outlet, useNavigate } from "react-router-dom";
import { getTasks } from "../services/kanban";
import { AuthContext } from "../context/AuthContext";
import { TaskContext } from "../context/TaskContext";

export default function MainPage() {
  const statuses = [
    "Без статуса",
    "Нужно сделать",
    "В работе",
    "Тестирование",
    "Готово",
  ];
  
  const { user, isAuth, setIsAuth } = useContext(AuthContext);
  const { tasks, setTasks } = useContext(TaskContext);
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);


  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);
    return `${day}.${month}.${year}`;
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
      return;
    }

    if (!user?.token) {
      setIsAuth(false);
      navigate("/login");
      return;
    }

    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const fetchedTasks = await getTasks(user.token);

        const formattedTasks = fetchedTasks.map((task) => ({
          ...task,
          date: formatDate(task.date),
        }));
        setTasks(formattedTasks);
      } catch (error) {
        console.error("Ошибка загрузки задач:", error.message);
        if (error.message.includes("401") || error.response?.status === 401) {
          setIsAuth(false);
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [isAuth, user?.token, navigate, setIsAuth, setTasks]);

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