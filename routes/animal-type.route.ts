import { Router } from "express";
import {
  createAnimalType,
  getAnimalTypes,
  getAnimalTypeById,
  updateAnimalType,
  deleteAnimalType,
} from "../controllers/animal-type.controller";

const router = Router();

router.post("/", createAnimalType);
router.get("/", getAnimalTypes);
router.get("/:id", getAnimalTypeById);
router.put("/:id", updateAnimalType);
router.delete("/:id", deleteAnimalType);

export default router;
