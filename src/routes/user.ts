import { Router } from "express";
import { UserController } from 
"../controller/UserController";

const router=Router()

//todo add routes
router.get("/",UserController.getAll)
router.post("/",UserController.create) 
router.get("/:id",UserController.getById)
router.delete("/:id",UserController.delete)
export default router