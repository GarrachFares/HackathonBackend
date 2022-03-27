import { Router } from "express";
import * as feedBack from "../controllers/feedback.controller";
import { authentify } from "../middleware/authentify";

const router = Router();

router.get("/", feedBack.getAll)
router.get("/my", authentify("RESIDENT"), feedBack.getByMyId)
router.get("/forme", authentify("MODERATOR"), feedBack.getByMyId) // fix this
router.get("/:id",authentify("MODERATOR"), feedBack.getById)//fix this

router.post("/", authentify("RESIDENT"), feedBack.create); 
router.delete("/:id", authentify("MODERATOR"), feedBack.kill)

export default router;
