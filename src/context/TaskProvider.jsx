import { useState, useCallback } from "react";
import { TaskContext } from "./TaskContext";

export default function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const setTasksData = useCallback((newTasks) => {
    setTasks(newTasks);
  }, []);

  const addTask = useCallback((newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  }, []);

  const updateTask = useCallback((id, updatedTask) => {
    setTasks(prevTasks => 
      prevTasks.map(task => task.id === id ? { ...task, ...updatedTask } : task)
    );
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, []);

  const value = {
    tasks,
    setTasks: setTasksData,
    addTask,
    updateTask,
    deleteTask,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}