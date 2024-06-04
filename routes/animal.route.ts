import { Router } from "express";
import {
  createAnimal,
  getAnimals,
  getAnimalById,
  updateAnimal,
  deleteAnimal,
} from "../controllers/animal.controller";

const router = Router();

router.post("/", createAnimal);
router.get("/", getAnimals);
router.get("/:id", getAnimalById);
router.put("/:id", updateAnimal);
router.delete("/:id", deleteAnimal);

export default router;
