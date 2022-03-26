import { Router } from "express";
import  * as lands from "../controllers/land.controller";
import { authentify } from "../middleware/authentify";

const router = Router()

router.get('/' ,lands.getAll) //only in dev
router.get('/my' ,authentify('LANDLORD'),lands.getByMyId) //get lands (get by id of user li fil token)
router.get('/all' ,lands.getFreeModLands)
router.get('/:id' ,lands.getById)
router.post('/' ,authentify('LANDLORD'),lands.create) //create land (user from token) # LANDLORD

export default router