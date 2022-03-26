import { Router } from "express";
import  * as accounts from "../controllers/account.controller";
import { authentify } from "../middleware/authentify";

// import * as groups from '../controllers/groups.controller'
// import { authentify } from "../middlewares/authentify";
// import { userIsAdmin } from "../middlewares/userIsAdmin";


const router = Router()

router.get('/' ,accounts.getAll)
router.get('/:id',authentify() ,accounts.getById)

export default router