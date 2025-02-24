import { Request, Response } from "express";
import pool from "../config/database";

interface AuthRequest extends Request {
  user?: { id: number };
}

const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const result = await pool.query("SELECT * FROM tasks WHERE userId = $1", [req.user.id]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { title, description } = req.body;
    const result = await pool.query(
      "INSERT INTO tasks (title, description, userId) VALUES ($1, $2, $3) RETURNING *",
      [title, description, req.user.id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const taskId = parseInt(req.params.taskId, 10);
    const { title, description, isComplete } = req.body;

    const taskCheck = await pool.query("SELECT * FROM tasks WHERE id = $1 AND userId = $2", [
      taskId,
      req.user.id,
    ]);

    if (taskCheck.rows.length === 0) {
      res.status(404).json({ error: "Task not found or unauthorized" });
      return;
    }

    const updateQuery = `
      UPDATE tasks 
      SET 
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        isComplete = COALESCE($3, isComplete)
      WHERE id = $4 AND userId = $5
      RETURNING *`;

    const values = [title, description, isComplete, taskId, req.user.id];

    const result = await pool.query(updateQuery, values);

    res.json(result.rows[0]); 
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const taskId = parseInt(req.params.taskId, 10);

    const taskCheck = await pool.query("SELECT * FROM tasks WHERE id = $1 AND userId = $2", [
      taskId,
      req.user.id,
    ]);

    if (taskCheck.rows.length === 0) {
      res.status(404).json({ error: "Task not found or unauthorized" });
      return;
    }

    await pool.query("DELETE FROM tasks WHERE id = $1 AND userId = $2", [taskId, req.user.id]);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export { getTasks, createTask, updateTask, deleteTask };




