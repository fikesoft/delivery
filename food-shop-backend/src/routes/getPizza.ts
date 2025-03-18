import express from "express";
import { getPizzas } from "../controllers/adminActionsController";

const router = express.Router();

router.get("/", getPizzas);

export default router; 