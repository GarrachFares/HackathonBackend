import type { Controller } from '../@types'
import { User } from '../models/user'
import * as service from '../services/user.service'
import * as landService from '../services/land.service'
import bcrypt from 'bcrypt'

export const getAll: Controller = async (req, res) => {
  const data = await service.getAll()
  res.json(data)
}

export const getById: Controller = async (req, res) => {
  const id = req.params.id
  const data = await service.getById(id as any)
  res.json(data)
}

export const getByBossId: Controller = async (req, res) => {
  const id = req.user.id
  const data = await service.getByBossId(id as any)
  res.json(data)
}

export const getMyMods: Controller = async (req, res) => {
  const id = req.user.id
  const data = await service.getMyMods(id as any)
  res.json(data)
}


export const getByToken: Controller = async (req, res) => {
  let fullData = await service.getById(req.user.id)
  //console.log(req.user , data)
  const data = { ...fullData }
  delete data.password
  res.json(data)
}

export const create: Controller = async (req, res) => {
    const {fullname,email,password,phone,role} = req.body
    let user = new User()
    user.fullname = fullname
    user.email = email
    user.password = password
    user.phone = phone
    user.generateUsername()//generate username
    //crypt pass
    user.isActive= true//isActive landlord and moderator
    user.role = 'MODERATOR' // validate the enum
    user.residentAtPriceOf = 100
    
    const data = await service.create(user)
    res.json(data)
}

export const add : Controller = async (req, res) => {
    try{
      const {fullname,email,residentAtPriceOf,phone} = req.body
      const modId = req.user.id
      let user = new User()
      user.fullname = fullname
      user.email = email
      user.phone = phone
      user.isActive= false //isActive landlord and moderator
      user.role = 'RESIDENT' // validate the enum
      user.residentAtPriceOf = residentAtPriceOf
      const moderatedLand = await landService.getByModId(modId)
      if(!moderatedLand){
        throw new Error('no land found')
      }
      user.residentAt = moderatedLand
      const data = await service.create(user)
      res.json(data)
    }catch (e:any) {
        res.status(400).json(e.message)
    }
}


export const addMany : Controller = async (req, res) => {
  try{
    const newUsers = req.body.users
    let final:User[] = []
    await newUsers.forEach( async(newUser :User)=> {
        const {fullname,email,residentAtPriceOf,phone} = newUser
        const modId = req.user.id
        let user = new User()
        user.fullname = fullname
        user.email = email
        user.phone = phone
        user.isActive= false //isActive landlord and moderator
        user.role = 'RESIDENT' // validate the enum
        user.residentAtPriceOf = residentAtPriceOf
        const moderatedLand = await landService.getByModId(modId)
        if(!moderatedLand){
          throw new Error('no land found')
        }
        user.residentAt = moderatedLand
        const data = await service.create(user)
        final.push(data)
    });
    res.json(final)
  }catch (e:any) {
      res.status(400).json(e.message)
  }
}

export const activate :Controller  = async (req, res) => {
  try{
      const userToActivateId = req.params.id 
      const userToActivate = await service.getById(userToActivateId)
      if(!userToActivate){
        res.status(400).send('user does not exist')
        return ;
      }
         
      const mod = req.user.id
      const land = await landService.getByModId(mod)
      if(!land){
        res.status(400).send('land does not exist')
        return ;
      }
      //console.log(userToActivate.residentAt , land)
      if(userToActivate.residentAt.id != land.id){
        res.status(400).send('this resident does not live on ur land')
        return
      }
        
      userToActivate.generateUsername()
      userToActivate.isActive = true
      const pass = generateRandomString(10)
      userToActivate.password = await bcrypt.hash(pass, 10)
      userToActivate.save()
      const resp = {
        ...userToActivate,
        password : pass,
        activationDate : new Date()
      }

      res.json(resp)
  }catch (e:any){
    res.status(400).json(e.message)
  }

}
export const kill : Controller = async (req, res) => {
  try{
    const userToKillId = req.params.id 
    const userToKill = await service.getById(userToKillId)
    if(!userToKill){
      res.status(400).send('user does not exist')
      return ;
    }
    userToKill.remove()
    res.json(userToKill)
  }catch(e:any){
    res.status(400).json(e.message)
  }
}

//random string function

function generateRandomString(length: number): string {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}



