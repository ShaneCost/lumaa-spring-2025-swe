import express from "express";
import { register, login } from "../controllers/auth.controller";

const router = express.Router();

// Register a new user
router.post("/register", register);

// Login a user and return JWT token
router.post("/login", login);

export default router;
