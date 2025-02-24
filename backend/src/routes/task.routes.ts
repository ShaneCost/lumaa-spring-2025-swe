import express from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/task.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", authMiddleware, getTasks);

router.post("/", authMiddleware, createTask);

router.put("/:taskId", authMiddleware, updateTask); 

router.delete("/:taskId", authMiddleware, deleteTask); 

export default router;


