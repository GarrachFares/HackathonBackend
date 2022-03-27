import type { Controller } from '../@types'
import { ModRequest } from '../models/request'
import * as service from '../services/request.service'
import * as userService from '../services/user.service'
import * as landService from '../services/land.service'


export const getAll: Controller = async (req, res) => {
  const data = await service.getAll()
  res.json(data)
}

export const getById: Controller = async (req, res) => {
  const id = req.params.id
  const data = await service.getById(id as any)
  res.json(data)
}

export const getOwnedByMe: Controller = async (req, res) => {
    try{
         const id = req.user.id
        const data = await service.getOwnedById(id)
        res.json(data)
    }catch (e:any) {
        res.status(400).json(e.message)
    }
    
  }


export const create: Controller = async (req, res) => {
    try{
        const {moderator,land} = req.body
        let modRequest = new ModRequest()

        const fullMod = await userService.getById(moderator)
        if(!fullMod){
            throw new Error('moderator not found')
        }   
        modRequest.moderator = fullMod 

        const fullLand = await landService.getById(land )
        if(!fullLand){
            throw new Error('land not found') 
        }
        if(fullLand.moderator){
            throw new Error('land already has a moderator')
        }
        modRequest.land = fullLand

        
        
        
        const data = await service.create(modRequest)
        res.json(data)
    }catch (e:any) {
        res.status(400).json(e.message)
    }
    
}


export const createByToken: Controller = async (req, res) => {
    try{
        const {land} = req.body
        const moderator = req.user.id
        let modRequest = new ModRequest()

        const fullMod = await userService.getById(moderator)
        if(!fullMod){
            throw new Error('moderator not found')
        }   
        modRequest.moderator = fullMod 

        const fullLand = await landService.getById(land )
        if(!fullLand){
            throw new Error('land not found') 
        }
        if(fullLand.moderator){
            throw new Error('land already has a moderator')
        }
        modRequest.land = fullLand
        
        
        const data = await service.create(modRequest)
        res.json(data)
    }catch (e:any) {
        res.status(400).json(e.message)
    }
    
}
export  const accept : Controller = async (req, res) => {
    try{
        const id = req.params.id
        const data = await service.getById(id)
        if(!data){
            throw new Error('request not found')
        }
        const land = await landService.getById(data.land.id)
        const mod = await userService.getById(data.moderator.id)
        if(!land){
            throw new Error('land not found')
        }
        if(!mod){
            throw new Error('moderator not found')
        }
        land.moderator = mod
        land.save()
        await service.kill(id)
        res.json(land)
    }catch (e:any) {
        res.status(400).json(e.message)
    }
}

export  const kill : Controller = async (req, res) => {
    try{
        const id = req.params.id
        const data = await service.kill(id)
        res.json(data)
    }catch (e:any) {
        res.status(400).json(e.message)
    }
}