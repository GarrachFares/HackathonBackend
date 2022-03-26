import { Router } from "express";
import  * as users from "../controllers/user.controller";
import { authentify } from "../middleware/authentify";

// import * as groups from '../controllers/groups.controller'
// import { authentify } from "../middlewares/authentify";
// import { userIsAdmin } from "../middlewares/userIsAdmin";


const router = Router()

router.get('/' ,users.getAll)
router.get('/getme' ,authentify(),users.getByToken)
router.get('/:id' ,users.getById)
router.post('/' ,users.create)

export default router