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

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const { token, isAuth } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [tasksError, setTasksError] = useState(null);
  const [operationLoading, setOperationLoading] = useState(false);
  const [operationError, setOperationError] = useState(null);

  const normalizeTasks = (apiData) => {
    const tasksArray = apiData?.tasks || apiData || [];
    return (Array.isArray(tasksArray) ? tasksArray : []).map((t) => ({
      ...t,
      id: t._id,
      _id: t._id,
      status: toUiStatusMap[t.status] || t.status || "БЕЗ СТАТУСА",
      topic: t.topic || "Web Design",
    }));
  };

  const normalizeSingleTask = (t) => ({
    ...t,
    id: t._id,
    _id: t._id,
    status: toUiStatusMap[t.status] || t.status || "БЕЗ СТАТУСА",
    topic: t.topic || "Web Design",
  });

  const loadTasks = async () => {
    if (!token) return;
    setTasksLoading(true);
    setTasksError(null);
    try {
      const data = await apiFetch({ token });
      const normalized = normalizeTasks(data);
      setTasks(normalized);
    } catch (e) {
      const errorMsg = e.message || "Ошибка при загрузке задач";
      setTasksError(errorMsg);
      console.error("Ошибка загрузки задач:", e);
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
      const apiTask = {
        title: task.title || "Новая задача",
        topic: task.topic || "Research",
        status: toApiStatusMap[task.status] || "Без статуса",
        description: task.description || "",
        date: task.date || new Date().toISOString(),
      };

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

      if (response?.tasks) {
        const normalized = normalizeTasks(response);
        console.log("Обновляем задачи из ответа API:", normalized);
        setTasks(normalized);
      }
    } catch (e) {
      console.error("Ошибка при создании задачи:", e);

      setTasks((prev) => prev.filter((t) => !t.id.startsWith("temp-")));

      const errorMessage = e.message || "Ошибка при создании задачи";
      setOperationError(errorMessage);
      throw e;
    } finally {
      setOperationLoading(false);
    }
  };

  const updateTask = async (id, task) => {
    setOperationLoading(true);
    setOperationError(null);

    try {
      const apiTask = {
        title: task.title || "Новая задача",
        topic: task.topic || "Research",
        status: toApiStatusMap[task.status] || "Без статуса",
        description: task.description || "",
        date: task.date || new Date().toISOString(),
      };

      console.log("Обновление задачи:", id, apiTask);

      const currentTaskIndex = tasks.findIndex((t) => t.id === id);
      const currentTask = tasks[currentTaskIndex];

      const updatedTask = normalizeSingleTask({
        ...task,
        _id: id,
        id: id,
        date: apiTask.date,
      });
      setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));

      const response = await apiUpdate({ token, id, task: apiTask });
      console.log("Ответ от API при обновлении:", response);

      if (response?.tasks) {
        const normalized = normalizeTasks(response);
        setTasks(normalized);
      }
    } catch (e) {
      console.error("Ошибка при обновлении задачи:", e);

      // 4. При ошибке откатываем оптимистичное обновление
      // НЕ делаем GET запрос, просто откатываем локально
      setTasks((prev) => {
        const newTasks = [...prev];
        if (currentTask) {
          newTasks[currentTaskIndex] = currentTask;
        }
        return newTasks;
      });

      const errorMessage = e.message || "Ошибка при обновлении задачи";
      setOperationError(errorMessage);
      throw e;
    } finally {
      setOperationLoading(false);
    }
  };

  const deleteTask = async (id) => {
    setOperationLoading(true);
    setOperationError(null);

    try {
      console.log("Удаление задачи:", id);

      const deletedTask = tasks.find((t) => t.id === id);

      setTasks((prev) => prev.filter((t) => t.id !== id));

      const response = await apiDelete({ token, id });
      console.log("Ответ от API при удалении:", response);

      if (response?.tasks) {
        const normalized = normalizeTasks(response);
        setTasks(normalized);
      }
    } catch (e) {
      console.error("Ошибка при удалении задачи:", e);

      // 4. При ошибке возвращаем удаленную задачу обратно
      // НЕ делаем GET запрос, просто откатываем локально
      if (deletedTask) {
        setTasks((prev) => [...prev, deletedTask]);
      }

      const errorMessage = e.message || "Ошибка при удалении задачи";
      setOperationError(errorMessage);
      throw e;
    } finally {
      setOperationLoading(false);
    }
  };

  const setTasksDirectly = (newTasks) => {
    const normalized = normalizeTasks(newTasks);
    setTasks(normalized);
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