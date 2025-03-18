import express from "express";
import { deletePizza } from "../controllers/adminActionsController";

const router = express.Router();

router.delete("/", deletePizza);

export default router; 