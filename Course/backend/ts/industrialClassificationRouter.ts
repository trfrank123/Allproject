import { Router } from 'express'
import { IndustrialClassificationController } from './industrialClassificationControllar'
import { IndustrialClassificationServer } from "./industrialClassificationService"
import { knex } from './db'


export let IndustrialClassificationRouter = Router();

let industrialClassificationServer = new IndustrialClassificationServer(knex);
let industrialClassificationController = new IndustrialClassificationController(industrialClassificationServer);

// IndustrialClassificationRouter.use((req, res, next) => {
//     console.log("success to enter IndustrialClassificationRouter")
//     next();
// })

IndustrialClassificationRouter.use("/industrialClassification", industrialClassificationController.getAll)