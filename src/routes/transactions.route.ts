import { Router } from "express";
import * as transactions from "../controllers/transactions.controller";
import { authentify } from "../middleware/authentify";

const router = Router();

router.get("/", transactions.getAll)
router.get("/my", authentify("RESIDENT"), transactions.getByMyId)
router.get("/forme", authentify("MODERATOR"), transactions.getForModId) // fix this
router.get("/:id",authentify("MODERATOR"), transactions.getById)//fix this

router.post("/", authentify("MODERATOR"), transactions.create); 
router.delete("/:id", authentify("MODERATOR"), transactions.kill)

export default router;
