import { Router } from "express";
import  * as requests from "../controllers/request.controller";
import { authentify } from "../middleware/authentify";

const router = Router()

router.get('/' ,requests.getAll) //only in dev
router.get('/my' ,authentify('LANDLORD'),requests.getOwnedByMe) 
router.post('/my/:id/accept' ,authentify('LANDLORD'),requests.accept)
router.post('/my/:id/delete' ,authentify('LANDLORD'),requests.kill) 
router.get('/:id' ,requests.getById)//only in dev


// add the accept
router.post('/' ,authentify('MODERATOR'),requests.createByToken) 

export default router