import type { Controller } from '../@types'
import { Transaction } from '../models/transaction'
import * as service from '../services/transaction.service'
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

export const getMissingForModId: Controller = async (req, res) => {
    try{
        const id = req.user.id
        const {year,month} = req.body
        const allUsers = await userService.getByBossId(id)
        const data = await service.getNotMissingForModId(id as any,month,year)

        var array = [{id :1, name :"test1"},{id :2, name :"test2"},{id :3, name :"test3"},{id :4, name :"test4"}];

        var anotherOne = [{id :2, name :"test2"}, {id :4, name :"test4"}];

        var filteredArray  = allUsers.filter(function(allUsers_el){
        return data.filter(function(data_el){
            return data_el.owner.id == allUsers_el.id;
        }).length == 0
        });

        res.json(filteredArray)
    }catch(e:any){
        res.status(400).json(e.message)
    }
    
}



export const create: Controller = async (req, res) => {
   try{

    const modId = req.user.id
    const userId = req.params.id
    const {month,year}= req.body
    
    let transaction:Transaction = new Transaction()
    
    transaction.month = month
    transaction.year = year


    const user = await userService.getById(userId)
    if(!user){
        throw new Error('user does not exist')
    }
    transaction.owner = user
    transaction.save()

    res.json(transaction)
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