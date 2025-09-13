import axios from 'axios';

const BASE_URL = 'https://wedev-api.sky.pro/api/';

const getAuthHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Получение списка задач
export const getTasks = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}kanban`, getAuthHeaders(token));
    return response.data.tasks;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Не удалось получить задачи');
  }
};

// Получение задачи по ID
export const getTaskById = async (id, token) => {
  try {
    const response = await axios.get(`${BASE_URL}kanban/${id}`, getAuthHeaders(token));
    return response.data.task;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to fetch task');
  }
};

// Добавление новой задачи
export const addTask = async (taskData, token) => {
  try {
    const response = await axios.post(`${BASE_URL}kanban`, taskData, getAuthHeaders(token));
    return response.data.tasks;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Не удалось добавить задачу');
  }
};

// Обновление задачи
export const updateTask = async (id, taskData, token) => {
  try {
    const response = await axios.put(`${BASE_URL}kanban/${id}`, taskData, getAuthHeaders(token));
    return response.data.tasks;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Не удалось обновить задачу');
  }
};

// Удаление задачи
export const deleteTask = async (id, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}kanban/${id}`, getAuthHeaders(token));
    return response.data.tasks;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Не удалось удалить задачу');
  }
};