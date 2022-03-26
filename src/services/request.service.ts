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
    where: {
      id,
    },
  })

export const getOwnedById = async (id:any) =>
    ModRequest.find({
        relations: ['land'],
        where: {
            land: { 
              owner: {
                  id
              }
            }
          }
    })


export const getByLandIds = async (ids: any[]) =>
getRepository(ModRequest).find({
    where:{land : In(ids)}
})


// export const getByLandIds = async (ids: any[]) =>
// getRepository(ModRequest).createQueryBuilder("request")
// .where("request.land IN (:lands)", { lands: ids })
// .getMany();


export const deleteModRequest = async (id: number) => {
  const modRequest = await ModRequest.findOne({ where: { id } })

  if (!modRequest) {
    throw new Error('mod request not found')
  }

  await modRequest.remove()
}