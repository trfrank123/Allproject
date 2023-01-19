import { Router } from 'express'
import { YearExperienceController } from './yearExperienceController'
import { YearExperienceServer } from "./yearExperienceService"
import { knex } from './db'


export let YearExperienceRouter = Router();

let yearExperienceServer = new YearExperienceServer(knex);
let yearExperienceController = new YearExperienceController(yearExperienceServer);

// YearExperienceRouter.use((req, res, next) => {
//     console.log("success to enter YearExperienceRouter")
//     next();
// })

YearExperienceRouter.use("/yearExperience", yearExperienceController.getAll)
