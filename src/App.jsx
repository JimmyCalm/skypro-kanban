import React from "react";
import { Wrapper } from "./styles/Wrapper.styled";
import AppRoutes from "./components/AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import { TaskProvider } from "./contexts/TaskContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Wrapper>
          <AppRoutes />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Wrapper>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;