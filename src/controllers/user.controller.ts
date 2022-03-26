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

export const createUser: Controller = async (req, res) => {
    const {name,email,password,phone,role} = req.body
    let user = new User()
    user.fullname = name
    user.email = email
    user.password = password
    user.phone = phone
    //generate username
    //crypt pass
    //isActive things
    user.role = role // validate the enum
    
    const data = await service.create(user)
    res.json(data)
  }