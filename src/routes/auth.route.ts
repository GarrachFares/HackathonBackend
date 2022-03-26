import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { mw, registerSchema } from "../validators/register.validator";
const router = Router();

router.post("/login", login);
router.post("/register", mw(registerSchema), register);

export default router;
