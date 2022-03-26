import { User } from '../models/user'



export const create = (user:User) => {
  return user.save()
}


export const getAll = async () =>  User.find({})

export const getById = async (id: number) =>
  User.findOne({
    where: {
      id,
    },
  })


export const deleteUser = async (id: number) => {
  const user = await User.findOne({ where: { id } })

  if (!user) {
    throw new Error('account not found')
  }

  await user.remove()
}