import { Router } from "express";
import {
  createAnimal,
  getAnimals,
  getAnimalById,
  updateAnimal,
  deleteAnimal,
} from "../controllers/animal.controller";

const router = Router();

router.post("/animals", createAnimal);
router.get("/animals", getAnimals);
router.get("/animals/:id", getAnimalById);
router.put("/animals/:id", updateAnimal);
router.delete("/animals/:id", deleteAnimal);

export default router;
