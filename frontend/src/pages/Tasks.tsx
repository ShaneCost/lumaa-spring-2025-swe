import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getTasks, createTask, deleteTask, updateTask } from "../api/tasks"; 
import { Task } from "../types/task";
import TaskCard from "../components/TaskCard"; 

const Tasks: React.FC = () => {
  const { logout, isAuthenticated, loading } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>(""); 
  const [newTaskDescription, setNewTaskDescription] = useState<string>(""); 
  const [error, setError] = useState<string | null>(null); 
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>(""); 
  const [editedDescription, setEditedDescription] = useState<string>(""); 
  const [isComplete, setIsComplete] = useState<boolean>(false); 

  useEffect(() => {
    if (isAuthenticated) {
      getTasks().then(setTasks).catch((err) => console.error("Failed to fetch tasks", err));
    }
  }, [isAuthenticated]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) {
      setError("Task title cannot be empty");
      return;
    }
    try {
      const task = await createTask(newTaskTitle, newTaskDescription); 
      setTasks((prevTasks) => [...prevTasks, task]); 
      setNewTaskTitle(""); 
      setNewTaskDescription(""); 
      setError(null); 
    } catch (err) {
      setError("Failed to create task. Please try again.");
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId); 
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId)); 
    } catch (err) {
      console.error("Failed to delete task", err);
      setError("Failed to delete task. Please try again.");
    }
  };

  const handleEditTask = (taskId: number) => {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      setEditingTaskId(taskId);
      setEditedTitle(task.title);
      setEditedDescription(task.description || "");
      setIsComplete(task.isComplete); 
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedTitle.trim()) {
      setError("Task title cannot be empty");
      return;
    }
    try {
      const updatedTask = await updateTask(editingTaskId!, {
        title: editedTitle,
        description: editedDescription,
        isComplete, 
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
      setEditingTaskId(null); 
      setEditedTitle(""); 
      setEditedDescription(""); 
      setIsComplete(false); 
      setError(null); 
    } catch (err) {
      console.error("Failed to update task", err);
      setError("Failed to update task. Please try again.");
    }
  };

  const handleToggleComplete = () => {
    setIsComplete((prev) => !prev); 
  };

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>You need to log in to see tasks.</div>;

  return (
    <div className="tasks-container">
      <button className="logout-button" onClick={logout}>Logout</button>
      <div className="content-container">
        <div className="task-form-container">
          <h2>Create New Task</h2>
          <form onSubmit={handleCreateTask} className="task-form">
            <input
              type="text"
              placeholder="New task title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <textarea
              placeholder="Task description"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
            />
            <button type="submit">Create Task</button>
          </form>

          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="task-list-container">
          <h2>Your Tasks</h2>

          {tasks.length === 0 ? (
            <p>No tasks available</p>
          ) : (
            <div className="task-list">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask} 
                  onDelete={handleDeleteTask} 
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {editingTaskId !== null && (
        <div className="edit-task-form">
          <h2>Edit Task</h2>
          <form onSubmit={handleSaveEdit}>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <div className="toggle-complete">
              <label>
                <input
                  type="checkbox"
                  checked={isComplete}
                  onChange={handleToggleComplete} 
                />
                Mark as complete
              </label>
            </div>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setEditingTaskId(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Tasks;









