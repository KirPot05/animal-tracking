import { Router } from "express";
import { createUser, userLogin } from "../controllers/user.controller";

const router = Router();

router.post("/login", userLogin);
router.post("/users/new", createUser);

export default router;
