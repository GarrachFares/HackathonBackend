import { Router } from "express"
import users from './users.route'

// import groups from './groups.route'
// import login from './login.route'
// import register from './register.route'

import auth from './auth.route'

const router = Router()
router.use('/users', users)
router.use('/auth' ,auth)

//router.use('/',login)
//router.use('/',register)


export default router
