import { Router } from "express";
import user from "./user";
import quack from "./quack";

const  routes=Router()
routes.use('/user',user)
routes.use('/quack',quack)
export default routes