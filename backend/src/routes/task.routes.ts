import express from "express";
import { getTasks, createTask } from "../controllers/task.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", authMiddleware, getTasks);
router.post("/", authMiddleware, createTask);

export default router;

