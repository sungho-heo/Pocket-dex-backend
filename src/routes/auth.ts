import { Router } from "express";
import { signup, login, logout } from "../controllers/authController";

const router = Router();

// router
router.post("/signup", signup);
router.post("/login", login);

export default router;
