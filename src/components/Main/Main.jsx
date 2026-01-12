import React from "react";
import Column from "../Column/Column";
import { statusList } from "../../data.js";
import {
  MainBlock,
  MainContent,
  LoadingText,
  EmptyTasksText,
} from "./Main.styled";
import { useTasks } from "../../contexts/TaskContext";

function Main() {
  const { tasks, tasksLoading, tasksError } = useTasks();

  if (tasksError) {
    return (
      <MainBlock>
        <div className="container">
          <MainContent>
            <LoadingText>Ошибка загрузки: {tasksError}</LoadingText>
          </MainContent>
        </div>
      </MainBlock>
    );
  }

  return (
    <MainBlock>
      <div className="container">
        <MainContent>
          {tasksLoading ? (
            <LoadingText>Данные загружаются...</LoadingText>
          ) : tasks.length === 0 ? (
            <EmptyTasksText>Новых задач нет</EmptyTasksText>
          ) : (
            statusList.map((status) => {
              const filteredTasks = tasks.filter(
                (task) => task.status === status
              );
              return (
                <Column key={status} title={status} cards={filteredTasks} />
              );
            })
          )}
        </MainContent>
      </div>
    </MainBlock>
  );
}

export default Main;