import axios from "axios";

const BASE_URL = "https://wedev-api.sky.pro/api/";

const getAuthHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "",
  },
});

// Получение списка задач
export const getTasks = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}kanban`, getAuthHeaders(token));
    if (response.data && response.data.tasks) {
      return response.data.tasks;
    }
    throw new Error("Некорректный ответ от сервера");
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || error.message || "Не удалось получить задачи";
    throw new Error(errorMessage);
  }
};

// Получение задачи по ID
export const getTaskById = async (id, token) => {
  try {
    const response = await axios.get(`${BASE_URL}kanban/${id}`, getAuthHeaders(token));
    return response.data.task;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || error.message || "Failed to fetch task";
    throw new Error(errorMessage);
  }
};

// Добавление новой задачи
export const addTask = async (taskData, token) => {
  try {
    const response = await axios.post(`${BASE_URL}kanban`, taskData, getAuthHeaders(token));
    return response.data.tasks;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || error.message || "Не удалось добавить задачу";
    throw new Error(errorMessage);
  }
};

// Обновление задачи
export const updateTask = async (id, taskData, token) => {
  try {
    const response = await axios.put(`${BASE_URL}kanban/${id}`, taskData, getAuthHeaders(token));
    return response.data.tasks;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || error.message || "Не удалось обновить задачу";
    throw new Error(errorMessage);
  }
};

// Удаление задачи
export const deleteTask = async (id, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}kanban/${id}`, getAuthHeaders(token));
    return response.data.tasks;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || error.message || "Не удалось удалить задачу";
    throw new Error(errorMessage);
  }
}