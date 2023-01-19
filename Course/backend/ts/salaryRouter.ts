import { Router } from 'express'
import { SalaryController } from './salaryController'
import { SalaryServer } from "./salaryService"
import { knex } from './db'


export let SalaryRouter = Router();

let salaryServer = new SalaryServer(knex);
let salaryController = new SalaryController(salaryServer);

// SalaryRangRouter.use((req, res, next) => {
//     console.log("success to enter SalaryRangRouter")
//     next();
// })

SalaryRouter.use("/salary", salaryController.getAll)
