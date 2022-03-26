import express, { type Request, Response } from 'express'
import parser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'

import { connect } from './utils.ts/connect'
import * as services from './services'
import routes from './routes'

import { config } from 'dotenv'
config()
//console.log("process.env")



connect()
    .then(() => {
    const app = express()

    app.use(morgan(':method :url :status :response-time ms'))
    app.use(cors())
    app.use(parser.json())
    app.use(parser.urlencoded({ extended: true }))
    
    app.use(routes)

      app.listen(4000, () => {
        console.log('Server is running on port 4000')
      })

    //   app.get('/',async (req :Request,res:Response)=>{
    //     const accounts = await services.accounts.getAll()  
    //     res.send(accounts)
    //   })
    //   app.get('/add',async (req :Request,res:Response)=>{
    //     const account = await services.accounts.create()  
    //     res.send(account)
    //   })
    })
    .catch(console.error)