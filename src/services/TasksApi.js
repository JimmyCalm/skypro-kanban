import axios from "axios";

const API_URL = "https://wedev-api.sky.pro/api/kanban";

export async function fetchTasks({ token }) {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Ошибка при загрузке задач"
    );
  }
}

export async function createTask({ token, task }) {
  try {
    console.log("Отправляемые данные на сервер:", task);

    const response = await axios.post(API_URL, task, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "",
      },
    });

    console.log("Ответ от сервера:", response.data);

    return response.data;
  } catch (error) {
    console.error("Ошибка при создании задачи:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw new Error(
      error.response?.data?.message ||
        error.response?.data?.error ||
        "Ошибка при создании задачи"
    );
  }
}

export async function updateTask({ token, id, task }) {
  try {
    if (!id) {
      throw new Error("ID задачи не передан");
    }

    console.log("Отправляемые данные для обновления:", { id, task });

    const url = `${API_URL}/${id}`;
    const response = await axios.put(url, task, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "",
      },
    });

    console.log("Ответ от сервера при обновлении:", response.data);

    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении задачи:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw new Error(
      error.response?.data?.message ||
        error.response?.data?.error ||
        "Ошибка при обновлении задачи"
    );
  }
}

export async function deleteTask({ token, id }) {
  try {
    if (!id) {
      throw new Error("ID задачи не передан");
    }

    console.log("Удаление задачи с ID:", id);

    const url = `${API_URL}/${id}`;
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Ответ от сервера при удалении:", response.data);

    return response.data;
  } catch (error) {
    console.error("Ошибка при удалении задачи:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw new Error(
      error.response?.data?.message || "Ошибка при удалении задачи"
    );
  }
}