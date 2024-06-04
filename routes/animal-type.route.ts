import { Router } from "express";
import {
  createAnimalType,
  getAnimalTypes,
  getAnimalTypeById,
  updateAnimalType,
  deleteAnimalType,
} from "../controllers/animal-type.controller";

const router = Router();

router.post("/animal-types", createAnimalType);
router.get("/animal-types", getAnimalTypes);
router.get("/animal-types/:id", getAnimalTypeById);
router.put("/animal-types/:id", updateAnimalType);
router.delete("/animal-types/:id", deleteAnimalType);

export default router;
