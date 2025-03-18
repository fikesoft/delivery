import express from "express";
import { createPizza } from "../controllers/adminActionsController";

const router = express.Router();

router.post("/", createPizza);

export default router; // ✅ Ensure this line is present
