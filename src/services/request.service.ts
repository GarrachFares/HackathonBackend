import { ModRequest } from '../models/request'
import {getRepository, In} from 'typeorm'


export const create = (request:ModRequest) => {
  return request.save()
}


export const getAll = async () =>  ModRequest.find({
    relations: ['land','moderator'],

})

export const getById = async (id: number) =>
  ModRequest.findOne({
    relations: ['land','moderator'],
    where: {
      id,
    },
  })

export const getOwnedById = async (id:any) =>
    ModRequest.find({
        relations: ['land','moderator'],
        where: {
            land: { 
              owner: {
                  id
              }
            }
          }
    })




export const deleteModRequest = async (id: number) => {
  const modRequest = await ModRequest.findOne({ where: { id } })

  if (!modRequest) {
    throw new Error('mod request not found')
  }

  await modRequest.remove()
}

export const kill = async (id: number) => {
    const modRequest = await ModRequest.findOne({ where: { id } })
    
    if (!modRequest) {
        throw new Error('mod request not found')
    }
    
    await modRequest.remove()
}