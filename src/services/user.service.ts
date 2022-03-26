import { User } from '../models/user'



export const create = (user:User) => {
  //const user = new User()
  //console.log('user created')
  return user.save()
}

// export const generate = () => {
//     const user = new User()
  
//     user.name = generateRandomString(10)
//     user.email = `${generateRandomString(9)}@gmail.com`
//     user.password = generateRandomString(8)
//     //user.setNickname()
//     console.log('user generated')
//     return user.save()
//   }

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