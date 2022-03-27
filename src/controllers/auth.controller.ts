import { getRepository } from "typeorm";
import { Controller } from "../@types";
import { User } from "../models/user";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const login:Controller = async (req, res:any) => {
    //Check if username and password are set
    let { email, password } = req.body;
    if (!(email && password)) {
         return res.status(400).send();
    
    }
    try {
        //Get user from database
        const userRepository = getRepository(User);
        let doesPasswordMatch
        
        const user :any = await userRepository.findOne({ where: { email } })
        if(!user){
            return res.status(401).send('user with this email does not exist');
            
        }
        
        doesPasswordMatch = await bcrypt.compare (password, user.password)
        console.log(doesPasswordMatch)
        if (!doesPasswordMatch) {
            return res.status(400).send('Password does not match')
        }
        delete user.password 
        
        const token = jwt.sign(
                {...user},
                process.env.SECRET || 'SECRET',
              { expiresIn: "5h" }
            );
        console.log(token)
        res.json({"token" :token})
    } catch (error) {
      res.status(400).send('something went wronng');
    }

  }
export const register:Controller = async (req, res:any) => {
    //Check if username and password are set
    let { fullname, email, password, phone} = req.body;
    let passwordToCrypt = password
    if (!(fullname && email && password && phone)) {
          return res.status(400).send();
    } 
    try {
        const userRepository = getRepository(User);
        const user :any = await userRepository.findOne({ where: { email } })
        if(user){
            return res.status(401).send('user with this email already exists');
        }
        //create new user
        let newUser = new User()
        newUser.fullname = fullname
        newUser.email = email
        //newUser.password = password
        newUser.phone = phone
        newUser.generateUsername()//generate username
        //bcypt hash password
        newUser.password = await bcrypt.hash(passwordToCrypt, 10)
        //crypt pass
        newUser.isActive= true//isActive things
        newUser.role = 'MODERATOR' // validate the enum
        
        //reove the password
        let data = await userRepository.save(newUser)
        let {password,...rest} = data
        
        res.json(rest)
    } catch (error) {
      res.status(400).send('something went wrong');
    }


}