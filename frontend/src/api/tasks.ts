import axios from "axios";
import { Task } from "../types/task";

const API_URL = "http://localhost:5001";

export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(`${API_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks", error);
    throw error;
  }
};

export const createTask = async (title: string, description: string): Promise<Task> => {
  try {
    const response = await axios.post(
      `${API_URL}/tasks`,
      { title, description },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating task", error);
    throw error;
  }
};

export const updateTask = async (
  taskId: number,
  updatedData: { title?: string; description?: string; isComplete?: boolean }
): Promise<Task> => {
  try {
    const response = await axios.put(
      `${API_URL}/tasks/${taskId}`, 
      updatedData, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
      }
    );
    return response.data; 
  } catch (error) {
    console.error("Error updating task", error);
    throw error;
  }
};

export const deleteTask = async (taskId: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, 
      },
    });
  } catch (error) {
    console.error("Error deleting task", error);
    throw error;
  }
};

