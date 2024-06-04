import { Router } from "express";
import { createUser, getUser, userLogin } from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post("/login", userLogin);
router.post("/register", createUser);
router.get("/me", authMiddleware, getUser);

export default router;
