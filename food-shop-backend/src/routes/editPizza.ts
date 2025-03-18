import express from "express";
import { editPizza } from "../controllers/adminActionsController";

const router = express.Router();

router.patch("/", editPizza);

export default router; // ✅ Ensure this line is present