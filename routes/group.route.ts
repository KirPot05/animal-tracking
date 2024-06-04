import { Router } from "express";
import {
  createGroup,
  getGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
  addAnimalsToGroup,
  getGroupMembers,
} from "../controllers/group.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post("/", createGroup);
router.get("/", getGroups);
router.get("/:id/animals", getGroupMembers);
router.post("/:id/animals", addAnimalsToGroup);
router.get("/:id", getGroupById);
router.put("/:id", updateGroup);
router.delete("/:id", deleteGroup);

export default router;
