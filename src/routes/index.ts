import { Router } from "express"
import users from './users.route'
import lands from './land.route'
import auth from './auth.route'

const router = Router()
router.use('/users', users)
router.use('/auth' ,auth)
router.use('/lands', lands)



export default router
