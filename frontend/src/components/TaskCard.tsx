import React from "react";
import { Task } from "../types/task"; 

interface TaskCardProps {
  task: Task; 
  onEdit: (taskId: number) => void; 
  onDelete: (taskId: number) => void; 
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  return (
    <div className="task-card">
      <h3 className={task.isComplete ? "completed-task" : ""}>{task.title}</h3>
      <p>{task.description}</p>
      <div className="task-card-actions">
        <button className="edit-button" onClick={() => onEdit(task.id)}>
          ✏️
        </button>
        <button className="delete-button" onClick={() => onDelete(task.id)}>
          ❌
        </button>
      </div>
    </div>
  );
};

export default TaskCard;

