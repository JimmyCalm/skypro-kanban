import axios from "axios";

const API_URL = "https://wedev-api.sky.pro/api/user";

export async function signIn({ login, password }) {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      {
        login,
        password,
      },
      {
        headers: {
          "Content-Type": "",
        },
      }
    );

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (error) {
    console.error(
      "Login error details:",
      error.response?.data || error.message
    );

    if (error.response) {
      const errorMessage =
        error.response.data.message ||
        error.response.data.error ||
        "Ошибка при входе";
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error("Сервер не отвечает. Проверьте интернет-соединение.");
    } else {
      throw new Error("Ошибка при отправке запроса: " + error.message);
    }
  }
}

export async function signUp({ name, login, password }) {
  try {
    const response = await axios.post(
      API_URL,
      {
        name,
        login,
        password,
      },
      {
        headers: {
          "Content-Type": "",
        },
      }
    );

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (error) {
    console.error(
      "Registration error details:",
      error.response?.data || error.message
    );

    if (error.response) {
      const errorMessage =
        error.response.data.message ||
        error.response.data.error ||
        "Ошибка при регистрации";
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error("Сервер не отвечает. Проверьте интернет-соединение.");
    } else {
      throw new Error("Ошибка при отправке запроса: " + error.message);
    }
  }
}