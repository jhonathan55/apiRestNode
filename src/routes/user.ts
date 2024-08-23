import { Router } from "express";
import { UserController } from 
"../controller/UserController";

const router=Router()

//todo add routes
router.post("/",UserController.create) 
export default router