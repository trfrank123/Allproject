import { Router } from 'express'
import { EducationController } from './educationController'
import { EducationServer } from "./educationService"
import { knex } from './db'


export let EducationRouter = Router();

let educationServer = new EducationServer(knex);
let educationController = new EducationController(educationServer);

// BudgetForCourseRouter.use((req, res, next) => {
//     console.log("success to enter BudgetForCourseRouter")
//     next();
// })

EducationRouter.use("/education", educationController.getAll)
