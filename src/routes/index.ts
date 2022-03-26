import { Router } from "express"
// import posts from './posts.route'
// import users from './users.route'

// import groups from './groups.route'
// import login from './login.route'
// import register from './register.route'
import accounts from './accounts.route'
import auth from './auth.route'

const router = Router()
router.use('/account' ,accounts)
router.use('/auth' ,auth)

//router.use('/',login)
//router.use('/',register)


export default router
