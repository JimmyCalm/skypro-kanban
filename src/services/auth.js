import axios from 'axios';

const BASE_URL = 'https://wedev-api.sky.pro/api/';

// Регистрация
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}user`, userData, {headers: {
        "Content-Type": "", 
      },});
    return response.data.user; 
  } catch (error) {
    throw error.response ? error.response.data : new Error('Не удалось зарегистрировать пользователя');
  }
};

// Логин
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}user/login`, credentials, {headers: {
        "Content-Type": "", 
      },});
    return response.data.user;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Не удалось войти в систему');
  }
};