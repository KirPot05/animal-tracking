import { Router } from "express";
import {
  createLocation,
  getLocations,
  getLocationById,
  deleteLocation,
  updateLocation,
} from "../controllers/location.controller";

const router = Router();

router.post("/locations", createLocation);
router.get("/locations", getLocations);
router.get("/locations/:id", getLocationById);
router.put("/locations/:id", updateLocation);
router.delete("/locations/:id", deleteLocation);

export default router;
