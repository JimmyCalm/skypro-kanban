import { useParams, useNavigate } from "react-router-dom";
import PopBrowse from "../components/popups/PopBrowse/PopBrowse.jsx";
import { useMemo, useEffect } from "react";
import { useTasks } from "../contexts/TaskContext";

function CardPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, tasksLoading, tasksError, operationLoading, operationError } =
    useTasks();

  const task = useMemo(() => {
    if (!tasks.length) return null;

    return tasks.find(
      (t) =>
        String(t.id) === String(id) ||
        String(t._id) === String(id) ||
        String(t.taskId) === String(id) ||
        String(t.uuid) === String(id)
    );
  }, [tasks, id]);

  useEffect(() => {
    if (operationError) {
      console.error("Ошибка операции в CardPage:", operationError);
    }
  }, [operationError]);

  if (tasksLoading) return <div>Загрузка...</div>;
  if (tasksError) return <div>Ошибка: {tasksError}</div>;
  if (!task && tasks.length > 0) return <div>Задача не найдена</div>;

  const handleClose = () => navigate(-1);

  return <PopBrowse task={task} onClose={handleClose} />;
}

export default CardPage;