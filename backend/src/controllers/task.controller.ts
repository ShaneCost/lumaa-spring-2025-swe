import { Request, Response } from "express";
import pool from "../config/database";

// Extend Request to include user
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

export { getTasks, createTask };



