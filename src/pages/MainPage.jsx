import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import { Outlet } from "react-router-dom";
import { GlobalStyles } from "../styles/GlobalStyles.styled";
import { useEffect, useState } from "react";
import { useTasks } from "../contexts/TaskContext";

function MainPage() {
  const { operationError, clearOperationError } = useTasks();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (operationError) {
      console.error("Ошибка операций с задачами:", operationError);
      setShowError(true);

      const timer = setTimeout(() => {
        setShowError(false);
        clearOperationError();
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setShowError(false);
    }
  }, [operationError, clearOperationError]);

  const handleCloseError = () => {
    setShowError(false);
    clearOperationError();
  };

  return (
    <div className="wrapper">
      <GlobalStyles />
      <Header />

      {/* Глобальное уведомление об ошибке */}
      {showError && operationError && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "#ff4444",
            color: "white",
            padding: "15px 20px",
            borderRadius: "8px",
            zIndex: 1000,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            maxWidth: "400px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ flex: 1 }}>{operationError}</span>
          <button
            onClick={handleCloseError}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "20px",
              cursor: "pointer",
              marginLeft: "10px",
              padding: "0 5px",
            }}
          >
            ×
          </button>
        </div>
      )}

      <Main />
      <Outlet />
    </div>
  );
}
export default MainPage;