import { Router } from "express";
import { createUser, userLogin } from "../controllers/user.controller";

const router = Router();

router.post("/login", userLogin);
router.post("/register", createUser);

export default router;
