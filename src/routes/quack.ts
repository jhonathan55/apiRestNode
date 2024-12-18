import { Router } from "express";
import { QuackController } from "../controller/QuackControlle";


const router=Router()
router.get("/",QuackController.getRandonQuack)
router.get("/list",QuackController.getListaQuacks)
export default router