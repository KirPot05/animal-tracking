import { Router } from "express";
import {
  createAnimal,
  getAnimals,
  getAnimalById,
  updateAnimal,
  deleteAnimal,
  getUserAnimals,
} from "../controllers/animal.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post("/", createAnimal);
router.get("/", getAnimals);
router.get("/users", authMiddleware, getUserAnimals);
router.get("/:id", getAnimalById);
router.put("/:id", updateAnimal);
router.delete("/:id", deleteAnimal);

export default router;
