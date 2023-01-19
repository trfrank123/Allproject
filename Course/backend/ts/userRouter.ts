import { Router } from 'express'
import { UserController } from './userController'
import { UserService } from "./userService"
import { knex } from './db'

export let UserRouter = Router();


let userService = new UserService(knex);
let userController = new UserController(userService);

UserRouter.use("/user", userController.router )