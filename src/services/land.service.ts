import { Land } from '../models/land'



export const create = (land:Land) => {
  return land.save()
}


export const getAll = async () =>  Land.find({
    relations: 
        ['moderator','owner'] 
})

export const getById = async (id: number) =>
  Land.findOne({
    where: {
      id,
    },
    relations: 
        ['moderator','owner'] 
  })

  export const getByOwnerId = async (id: number) =>
  Land.find({
    where: {
      owner: id,
    },
    relations: 
        ['moderator'] // can add  owner 
    
  })
  
  export const getFreeModLands =async () => {
    const lands = await Land.find({
      where: {
        moderator: null,
      },
      relations: 
        ['owner']
    })
    return lands
      
  }


export const deleteLand = async (id: number) => {
  const land = await Land.findOne({ where: { id } })

  if (!land) {
    throw new Error('account not found')
  }

  await land.remove()
}