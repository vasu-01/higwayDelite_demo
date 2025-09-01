import authMiddleware from "../middleware/user.authMiddleware.js";
import { Router } from "express";
import {
  addNote,
  getNotes,
  deleteNote,
} from "../controller/note.controller.js";

const router = Router();

router.post("/addNote", authMiddleware, addNote);

router.get("/getNotes", authMiddleware, getNotes);

router.delete("/delete/:id", authMiddleware, deleteNote);

export default router;
