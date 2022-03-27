import { Router } from "express"
import users from './users.route'
import lands from './land.route'
import auth from './auth.route'
import requests from './request.route'
import rents from './rent.route'

const router = Router()
router.use('/users', users)
router.use('/auth' ,auth)
router.use('/lands', lands)
router.use('/requests', requests)
router.use('/rents', rents)


export default router
