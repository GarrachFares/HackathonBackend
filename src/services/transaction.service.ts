import { Transaction } from '../models/transaction'



export const getAll = async () =>  Transaction.find({
    relations: 
        ['owner'] 
})

export const getById = async (id: number) =>
  Transaction.findOne({
    where: {
      id,
    },
    relations: 
        ['owner'] 
  })



export const getByOwnerId = async (id: number) =>
Transaction.find({
where: {
    owner :{
        id
    }
},
relations: 
    ['owner'] 

})

export const getForModId = async (id: number) =>
Transaction.find({
where: {
    owner :{
        residentAt:{
            moderator :{
                id
            }
        }
    }
},
relations: 
    ['owner','owner.residentAt','owner.residentAt.moderator'] 

})

export const kill = async (id: number) => {
  const transaction = await Transaction.findOne({ where: { id } })

  if (!transaction) {
    throw new Error('transaction not found')
  }

  await transaction.remove()
}