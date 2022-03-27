import { FeedBack } from '../models/feedback'



export const getAll = async () =>  FeedBack.find({
    relations: 
        ['owner'] 
})

export const getById = async (id: number) =>
  FeedBack.findOne({
    where: {
      id,
    },
    relations: 
        ['owner'] 
  })



export const getByOwnerId = async (id: number) =>
FeedBack.find({
where: {
    owner :{
        id
    }
},
relations: 
    ['owner'] 

})

export const getForModId = async (id: number) =>
FeedBack.find({
where: {
    owner :{
        residentAt:{
            owner :{
                id
            }
        }
    }
},
relations: 
    ['owner'] 

})

export const kill = async (id: number) => {
  const feedBack = await FeedBack.findOne({ where: { id } })

  if (!feedBack) {
    throw new Error('feedback not found')
  }

  await feedBack.remove()
}