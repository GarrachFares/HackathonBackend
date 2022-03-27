import { Router } from "express";
import  * as users from "../controllers/user.controller";
import { authentify } from "../middleware/authentify";



const router = Router()

router.get('/' ,users.getAll)
router.get('/getme' ,authentify(),users.getByToken)
router.get('/myresedences',authentify('MODERATOR'),users.getByBossId)
router.get('/:id' ,users.getById)


router.post('/addone' ,authentify('MODERATOR'),users.add)
router.post('/addmany' ,authentify('MODERATOR'),users.addMany)
router.post('/activate/:id' ,authentify('MODERATOR'),users.activate)


router.post('/' ,users.create)
router.delete('/:id' ,users.kill)

export default router