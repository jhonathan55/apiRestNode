import { AppDataSource } from "../data-source"
import {  Request, Response } from "express"
import { User } from "../entity/User"
import sanitizeHtml from 'sanitize-html'
import {validate} from "class-validator"
import { ObjectId } from "mongodb"
export class UserController {

    static create = async (req: Request, res: Response) => {
        const {firstName,lastName,age,email}=req.body
        //saneamiento de entradas para prevenir ataques XSS *(Cross Site Scripting)*
        const sanitizedFirstName = sanitizeHtml(firstName)
        const sanitizedLastName = sanitizeHtml(lastName)
        const sanitizedAge = sanitizeHtml(age)
        const sanitizedEmail = sanitizeHtml(email)
        if(!sanitizedFirstName || !sanitizedLastName || !sanitizedAge || !sanitizedEmail){
            return res.status(400).send({message:"All fields are required"})
        }
        const  user = new User()
        user.firstName=sanitizedFirstName
        user.lastName=sanitizedLastName
        user.age=parseInt(sanitizedAge,10)
        user.email=sanitizedEmail
        const validator={validationError:{target:false,value:false}}
        const errors=await validate(user,validator)
        if(errors.length>0){
            return res.status(400).send(errors)
        } 
        const userRepository = AppDataSource.getMongoRepository(User)
        try {
            await userRepository.save(user)
        } catch (error) {
            return res.status(400).send({message:"Error creating user"}) 
        }   
        return res.send({message:"User created successfully",user})            
    }

    static getById= async (req: Request, res: Response) => {
        const {id}=req.params
        const userRepository = AppDataSource.getMongoRepository(User)
        try {
            
        // todo validar el object
        /*
        1. Validación y Saneamiento de Entrada (OWASP A01:2021 - 
        Broken Access Control, A03:2021 - Injection):
        Validación estricta de parámetros: Ya tienes una validación para asegurarte de que el id sea un ObjectId válido. 
        Es importante mantener y mejorar esta validación, asegurándote de que los parámetros que se reciben no contengan caracteres maliciosos que podrían usarse en ataques como la inyección de código.
        */
            if(!ObjectId.isValid(id)){
                return res.status(400).send({message:"Invalid id"})
            }
        // convertir el id a un object id
        const objectId=new ObjectId(id)
        const user=await userRepository.findOne({
            where:{
                _id:objectId
             }  
        })
        if(!user){
            return res.status(404).send({message:"User not found"})
        }
        return res.send(user)
        } catch (error) {
            return res.status(400).send({message:"Error getting user"})
        }
    }

}