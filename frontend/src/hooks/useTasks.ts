import { useState, useEffect } from "react";
import { getTasks } from "../api/tasks";
import { Task } from "../types/task";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  return tasks;
};
