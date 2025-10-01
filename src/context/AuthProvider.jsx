import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);


  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo.token) {
      setUser(userInfo);
      setIsAuth(true);
    }
  }, []);


  const login = (userData) => {
    localStorage.setItem("userInfo", JSON.stringify(userData));
    setUser(userData);
    setIsAuth(true);
  };


  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    setIsAuth(false);
  };

  const value = {
    user,
    isAuth,
    login,
    logout,
    setIsAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}