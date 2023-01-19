import { Router } from 'express'
import { LocationController } from './locationcontroller'
import { LocationServer } from "./locationService"
import { knex } from './db'


export let LocationRouter = Router();

let locationServer = new LocationServer(knex);
let locationController = new LocationController(locationServer);

// IdealCareerRouter.use((req, res, next) => {
//     console.log("success to enter IdealCareerRouter")
//     next();
// })

LocationRouter.use("/location", locationController.getLocation)
