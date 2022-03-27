import type { Controller } from '../@types'
import { FeedBack } from '../models/feedback'
import * as service from '../services/feedback.service'
import * as userService from '../services/user.service'

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
        const data = await service.getByOwnerId(id as any)
        res.json(data)
    }catch(e:any){
        res.status(400).json(e.message)
    }
    
}

export const getForModId: Controller = async (req, res) => {
    try{
        const id = req.user.id
        const data = await service.getForModId(id as any)
        res.json(data)
    }catch(e:any){
        res.status(400).json(e.message)
    }
    
}



export const create: Controller = async (req, res) => {
   try{

    const userId = req.user.id
    const content = req.body.content
    
    let feedBack:FeedBack = new FeedBack()
    
    feedBack.content = content 

    const owner = await userService.getById(userId)
    if(!owner){
        throw new Error('you are not a mod')
    }
    feedBack.owner = owner
    feedBack.save()

    res.json(feedBack)
    }catch(e:any){
        res.status(400).json(e.message)
    }
}

export const kill:Controller =async (req,res) => {
    try{
        const id = req.params.id
        const data =await service.kill(id)
        res.json(data)
    }catch(e:any){
        res.status(400).json(e.message)
    }
}