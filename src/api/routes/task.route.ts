import { Router } from "express";
import { createTask, deleteTask, getTaskById, getTasksByUserId, updateTask } from "../controllers/task.controller";

const router = Router();

router.post("/", createTask);
router.get("/user/:userId", getTasksByUserId);
router.get("/:taskId", getTaskById);
router.patch("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);

export default router;