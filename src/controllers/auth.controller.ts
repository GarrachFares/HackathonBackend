import { getRepository } from "typeorm";
import { Controller } from "../@types";
import { User } from "../models/user";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
//import { Account } from "../models/account";


export const login:Controller = async (req, res:any) => {
    //Check if username and password are set
    let { email, password } = req.body;
    if (!(email && password)) {
         return res.status(400).send();
    
    }

    
    try {
        //Get user from database
        const userRepository = getRepository(User);
        //let user: Account;
        let doesPasswordMatch
        const user :any = await userRepository.findOne({ where: { email } })
        if(!user){
            return res.status(401).send('user with this email does not exist');
            
        }
            
        //doesPasswordMatch = await bcrypt.compare (password, user.password)
        doesPasswordMatch = (password ==  user.password)
        console.log(doesPasswordMatch)
        if (!doesPasswordMatch) {
            return res.status(400).send('Password does not match')
        }
        //delete user.password 
        const token = jwt.sign(
              { email: user.eamil, fullname: user.fullname },
                process.env.SECRET || 'SECRET',
              { expiresIn: "1h" }
            );
        console.log(token)
        res.json({"token" :token})
    } catch (error) {
      res.status(400).send('something went wrong');
    }

  }
export const register:Controller = async (req, res:any) => {
    //Check if username and password are set
    let { fullname, email, password, phone, role } = req.body;
    if (!(fullname && email && password && phone && role)) {
          return res.status(400).send();
    } 
    try {
        //Get user from database
        const userRepository = getRepository(User);
        //let user: Account;
        let doesPasswordMatch
        const user :any = await userRepository.findOne({ where: { email } })
        if(user){
            return res.status(401).send('user with this email already exists');
        }
        //create new user
        let newUser = new User()
        newUser.fullname = fullname
        newUser.email = email
        newUser.password = password
        newUser.phone = phone
        newUser.generateUsername()//generate username
        //crypt pass
        newUser.isActive= false//isActive things
        newUser.role = role // validate the enum
        newUser.residentAtPriceOf = 100
        //save user
        const data = await userRepository.save(newUser)
        res.json(data)
    } catch (error) {
      res.status(400).send('something went wrong');
    }


}