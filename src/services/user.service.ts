import { User } from '../models/user'



export const create = (user:User) => {
  return user.save()
}


export const getAll = async () =>  User.find({
    relations:['residentAt']
})

export const getById = async (id: number) =>
User.findOne({
  relations:['residentAt'],
  where: {
    id,
  },
})

export const getByBossId = async (id: number) =>
User.find({
  relations:['residentAt','residentAt.moderator'],
  where: {
    residentAt:{
      moderator : id
    }
  },
})

export const getMyMods = async (id: number) =>
User.find({
  relations:['moderatedLand','moderatedLand.owner'],
  where: {
    moderatedLand:{
      owner:{
        id
      }
    }
  },
})


export const deleteUser = async (id: number) => {
  const user = await User.findOne({ where: { id } })

  if (!user) {
    throw new Error('account not found')
  }

  await user.remove()
}