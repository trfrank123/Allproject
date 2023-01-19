import { Router } from 'express'
import { IdentityController } from './identityController'
import { IdentityServer } from "./identityService"
import { knex } from './db'


export let IdentityRouter = Router();

let identityServer = new IdentityServer(knex);
let identityController = new IdentityController(identityServer);

// BudgetForCourseRouter.use((req, res, next) => {
//     console.log("success to enter BudgetForCourseRouter")
//     next();
// })

IdentityRouter.use("/identity", identityController.getAll)
