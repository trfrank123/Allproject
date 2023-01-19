import { Router } from 'express'
import { BudgetForCourseController } from './budgetForCourseController'
import { BudgetForCourseServer } from "./budgetForCourseService"
import { knex } from './db'


export let BudgetForCourseRouter = Router();

let budgetForCourseServer = new BudgetForCourseServer(knex);
let budgetForCourseController = new BudgetForCourseController(budgetForCourseServer);

// BudgetForCourseRouter.use((req, res, next) => {
//     console.log("success to enter BudgetForCourseRouter")
//     next();
// })

BudgetForCourseRouter.use("/budgetForCourse", budgetForCourseController.getAll)
