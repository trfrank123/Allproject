import { Router } from 'express'
import { JobFunctionController } from './jobFunctionController'
import { JobFunctionServer } from "./jobFunctionService"
import { knex } from './db'


export let JobFunctionRouter = Router();

let jobFunctionServer = new JobFunctionServer(knex);
let jobFunctionController = new JobFunctionController(jobFunctionServer);

// JobFunctionRouter.use((req, res, next) => {
//     console.log("success to enter JobFunctionRouter")
//     next();
// })

JobFunctionRouter.use("/jobFunction", jobFunctionController.getAll)