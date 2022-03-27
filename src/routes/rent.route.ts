import { Router } from "express";
import * as rents from "../controllers/rent.controller";
import { authentify } from "../middleware/authentify";

const router = Router();

router.get("/", rents.getAll)
router.get("/my", authentify("MODERATOR"), rents.getByMyId)
router.get("/:id",authentify("MODERATOR"), rents.getById)

router.post("/", authentify("MODERATOR"), rents.create); 
router.delete("/:id", authentify("MODERATOR"), rents.kill)

export default router;
