import { Rent } from '../models/rent'



export const getAll = async () =>  Rent.find({
    relations: 
        ['land','land.moderator'] 
})

export const getById = async (id: number) =>
  Rent.findOne({
    where: {
      id,
    },
    relations: 
        ['land','land.moderator'] 
  })



  export const getByModId = async (id: number) =>
  Rent.find({
    where: {
      land :{
          moderator : id
      }
    },
    relations: 
        ['land','land.moderator'] 
    
  })


export const deleteRent = async (id: number) => {
  const rent = await Rent.findOne({ where: { id } })

  if (!rent) {
    throw new Error('rent not found')
  }

  await rent.remove()
}