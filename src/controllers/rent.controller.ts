import type { Controller } from '../@types'
import { Rent } from '../models/rent'
import * as service from '../services/rent.service'
import * as landService from '../services/land.service'

export const getAll: Controller = async (req, res) => {
    try{
        const data = await service.getAll()
        res.json(data)
    }catch(e:any){
        res.status(400).json(e.message)
    }
  
}

export const getById: Controller = async (req, res) => {
    try{
        const id = req.params.id
    const data = await service.getById(id as any)
    res.json(data)
    }catch(e:any){
        res.status(400).json(e.message)
    }
  
}

export const getByMyId: Controller = async (req, res) => {
    try{
        const id = req.user.id
        const data = await service.getByModId(id as any)
        res.json(data)
    }catch(e:any){
        res.status(400).json(e.message)
    }
    
  }



export const create: Controller = async (req, res) => {
   try{

    const modId = req.user.id
    const {title,content} = req.body

    let rent:Rent = new Rent()
    rent.title = title
    rent.content = content 

    const land = await landService.getByModId(modId)
    if(!land){
        throw new Error('you dont have a land u moderate')
    }
    rent.land = land
    rent.save()

    res.json(rent)
    }catch(e:any){
        res.status(400).json(e.message)
    }
}

export const kill:Controller =async (req,res) => {
    try{
        const id = req.params.id
        const data =await service.deleteRent(id)
        res.json(data)
    }catch(e:any){
        res.status(400).json(e.message)
    }
}