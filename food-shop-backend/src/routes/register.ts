import express from "express";
import { registerUser } from "../controllers/authController";
import { hashPassword } from "../middlewares/hashPassword";
const router = express.Router();

router.post("/",hashPassword,registerUser);

export default router;