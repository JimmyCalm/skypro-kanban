import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  fetchTasks as apiFetch,
  createTask as apiCreate,
  updateTask as apiUpdate,
  deleteTask as apiDelete,
} from "../services/TasksApi";
import { useAuth } from "./AuthContext";

const toApiStatusMap = {
  "БЕЗ СТАТУСА": "Без статуса",
  "НУЖНО СДЕЛАТЬ": "Нужно сделать",
  "В РАБОТЕ": "В работе",
  ТЕСТИРОВАНИЕ: "Тестирование",
  ГОТОВО: "Готово",
};

const toUiStatusMap = {
  "Без статуса": "БЕЗ СТАТУСА",
  "Нужно сделать": "НУЖНО СДЕЛАТЬ",
  "В работе": "В РАБОТЕ",
  Тестирование: "ТЕСТИРОВАНИЕ",
  Готово: "ГОТОВО",
};

const normalizeTasks = (apiData) => {
  const tasksArray = apiData?.tasks || apiData || [];
  return (Array.isArray(tasksArray) ? tasksArray : []).map((task) => ({
    ...task,
    id: task._id || task.id,
    _id: task._id || task.id,
    status: toUiStatusMap[task.status] || task.status || "БЕЗ СТАТУСА",
    topic: task.topic || "Web Design",
  }));
};

const normalizeSingleTask = (task) => ({
  ...task,
  id: task._id || task.id,
  _id: task._id || task.id,
  status: toUiStatusMap[task.status] || task.status || "БЕЗ СТАТУСА",
  topic: task.topic || "Web Design",
});

const prepareTaskForApi = (task) => ({
  title: task.title || "Новая задача",
  topic: task.topic || "Research",
  status: toApiStatusMap[task.status] || "Без статуса",
  description: task.description || "",
  date: task.date || new Date().toISOString(),
});

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const { token, isAuth } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [tasksError, setTasksError] = useState(null);
  const [operationLoading, setOperationLoading] = useState(false);
  const [operationError, setOperationError] = useState(null);

  const loadTasks = async () => {
    if (!token) return;
    setTasksLoading(true);
    setTasksError(null);
    try {
      const data = await apiFetch({ token });
      const normalizedTasks = normalizeTasks(data);
      setTasks(normalizedTasks);
    } catch (error) {
      const errorMessage = error.message || "Ошибка при загрузке задач";
      setTasksError(errorMessage);
      console.error("Ошибка загрузки задач:", error);
    } finally {
      setTasksLoading(false);
    }
  };

  useEffect(() => {
    if (isAuth) {
      loadTasks();
    } else {
      setTasks([]);
    }
  }, [isAuth]);

  const clearOperationError = () => setOperationError(null);

  const createTask = async (task) => {
    setOperationLoading(true);
    setOperationError(null);

    try {
      const apiTask = prepareTaskForApi(task);

      console.log("Отправка задачи на сервер:", apiTask);

      const tempId = `temp-${Date.now()}`;
      const optimisticTask = normalizeSingleTask({
        ...apiTask,
        _id: tempId,
        id: tempId,
        userId: "temp-user",
        status: task.status,
      });

      console.log("Добавляем оптимистичную задачу:", optimisticTask);
      setTasks((prev) => [...prev, optimisticTask]);

      const response = await apiCreate({ token, task: apiTask });
      console.log("Ответ от API при создании:", response);

      if (response?.tasks || response) {
        const normalizedResponse = normalizeTasks(response);
        console.log("Обновляем задачи из ответа API:", normalizedResponse);
        setTasks(normalizedResponse);
      }
    } catch (error) {
      console.error("Ошибка при создании задачи:", error);

      setTasks((prev) => prev.filter((t) => !t.id.startsWith("temp-")));

      const errorMessage = error.message || "Ошибка при создании задачи";
      setOperationError(errorMessage);
      throw error;
    } finally {
      setOperationLoading(false);
    }
  };

  const updateTask = async (id, task) => {
    setOperationLoading(true);
    setOperationError(null);

    const currentTask = tasks.find((t) => t.id === id);

    try {
      const apiTask = prepareTaskForApi(task);

      console.log("Обновление задачи:", id, apiTask);

      const updatedTask = normalizeSingleTask({
        ...task,
        _id: id,
        id: id,
        date: apiTask.date,
      });
      
      setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));

      const response = await apiUpdate({ token, id, task: apiTask });
      console.log("Ответ от API при обновлении:", response);

      if (response?.tasks || response) {
        const normalizedResponse = normalizeTasks(response);
        setTasks(normalizedResponse);
      }
    } catch (error) {
      console.error("Ошибка при обновлении задачи:", error);

      if (currentTask) {
        setTasks((prev) => prev.map((t) => (t.id === id ? currentTask : t)));
      }

      const errorMessage = error.message || "Ошибка при обновлении задачи";
      setOperationError(errorMessage);
      throw error;
    } finally {
      setOperationLoading(false);
    }
  };

  const deleteTask = async (id) => {
    setOperationLoading(true);
    setOperationError(null);

    const deletedTask = tasks.find((t) => t.id === id);

    try {
      console.log("Удаление задачи:", id);

      setTasks((prev) => prev.filter((t) => t.id !== id));

      const response = await apiDelete({ token, id });
      console.log("Ответ от API при удалении:", response);

      if (response?.tasks || response) {
        const normalizedResponse = normalizeTasks(response);
        setTasks(normalizedResponse);
      }
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);

      if (deletedTask) {
        setTasks((prev) => [...prev, deletedTask]);
      }

      const errorMessage = error.message || "Ошибка при удалении задачи";
      setOperationError(errorMessage);
      throw error;
    } finally {
      setOperationLoading(false);
    }
  };

  const setTasksDirectly = (newTasks) => {
    const normalizedTasks = normalizeTasks(newTasks);
    setTasks(normalizedTasks);
  };

  const value = useMemo(
    () => ({
      tasks,
      tasksLoading,
      tasksError,
      operationLoading,
      operationError,
      clearOperationError,
      loadTasks,
      createTask,
      updateTask,
      deleteTask,
      setTasksDirectly,
    }),
    [tasks, tasksLoading, tasksError, operationLoading, operationError]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used within TaskProvider");
  return ctx;
}