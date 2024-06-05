import { Router } from "express";
import {
  createLocation,
  getLocations,
  getLocationById,
  deleteLocation,
  updateLocation,
  getUserAnimalLocations,
} from "../controllers/location.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post("/", createLocation);
router.get("/", getLocations);

router.get("/user", getUserAnimalLocations);
router.get("/:id", getLocationById);
router.put("/:id", updateLocation);
router.delete("/:id", deleteLocation);

export default router;
