import express from "express";
import { getUsers } from "../controllers/adminActionsController";
const router = express.Router();

router.post("/",getUsers);

export default router;