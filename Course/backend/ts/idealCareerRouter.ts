import { Router } from 'express'
import { IdealCareerController } from './idealCareerController'
import { IdealCareerServer } from "./idealCareerService"
import { knex } from './db'


export let IdealCareerRouter = Router();

let idealCareerServer = new IdealCareerServer(knex);
let idealCareerController = new IdealCareerController(idealCareerServer);

// IdealCareerRouter.use((req, res, next) => {
//     console.log("success to enter IdealCareerRouter")
//     next();
// })

IdealCareerRouter.use("/Idealwork", idealCareerController.getAll)
IdealCareerRouter.use("/Idealworkdetails", idealCareerController.getSingleGroup)
IdealCareerRouter.use("/writeMatchCareer", idealCareerController.writeMatchCourse)