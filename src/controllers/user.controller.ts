import type { Controller } from '../@types'
import { User } from '../models/user'
import * as service from '../services/user.service'

export const getAll: Controller = async (req, res) => {
  const data = await service.getAll()
  res.json(data)
}

export const getById: Controller = async (req, res) => {
  const id = req.params.id
  const data = await service.getById(id as any)
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