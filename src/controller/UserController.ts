import { AppDataSource } from "../data-source"
import {  Request, Response } from "express"
import { User } from "../entity/User"

export class UserController {

    static create = async (req: Request, res: Response) => {
        const {firstName,lastName,age}=req.body
        const  user = new User()
        user.firstName=firstName
        user.lastName=lastName
        user.age=age
        const userRepository = AppDataSource.getMongoRepository(User)
        try {
            await userRepository.save(user)
        } catch (error) {
            return res.status(400).send({message:"Error creating user"}) 
        }   
        return res.send({message:"User created successfully",user})            
    }

}