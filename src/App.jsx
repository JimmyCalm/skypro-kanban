import AppRoutes from "./components/AppRoutes";
import { GlobalStyles } from "./Styles/GlobalStyles";
import AuthProvider from "./context/AuthProvider";
import TaskProvider from "./context/TaskProvider";

function App() {
  return (
    <>
      <GlobalStyles />
      <AuthProvider>
        <TaskProvider>
          <AppRoutes />
        </TaskProvider>
      </AuthProvider>
    </>
  );
}

export default App;