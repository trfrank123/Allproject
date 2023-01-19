import { Router } from 'express'
import { AgeRangeController } from './ageController'
import { AgeRangeServer } from "./ageService"
import { knex } from './db'


export let AgeRangeRouter = Router();

let ageRangeServer = new AgeRangeServer(knex);
let ageRangeController = new AgeRangeController(ageRangeServer);

// IdealCareerRouter.use((req, res, next) => {
//     console.log("success to enter IdealCareerRouter")
//     next();
// })

AgeRangeRouter.use("/ageRange", ageRangeController.router)
