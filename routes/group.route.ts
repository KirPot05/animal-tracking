import { Router } from "express";
import {
  createGroup,
  getGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
} from "../controllers/group.controller";

const router = Router();

router.post("/groups", createGroup);
router.get("/groups", getGroups);
router.get("/groups/:id", getGroupById);
router.put("/groups/:id", updateGroup);
router.delete("/groups/:id", deleteGroup);

export default router;
