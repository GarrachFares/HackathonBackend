import { Router } from "express";
import  * as lands from "../controllers/land.controller";
import { authentify } from "../middleware/authentify";

// import * as groups from '../controllers/groups.controller'
// import { authentify } from "../middlewares/authentify";
// import { userIsAdmin } from "../middlewares/userIsAdmin";


const router = Router()

router.get('/' ,lands.getAll) //only in dev
router.get('/my' ,authentify('LANDLORD'),lands.getByMyId) 
router.get('/all' ,lands.getFreeModLands)
router.get('/id' ,lands.getById)
router.post('/' ,authentify('LANDLORD'),lands.create)

export default router