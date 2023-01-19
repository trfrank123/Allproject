import express from "express";
import { print } from "listening-on";
// import { Knex } from 'knex'
// import { env } from './env'
// import { knex } from './db'
// import "./session";
// import path from "path";
// import cors from "cors";

// import express from 'express'
// import { print } from 'listening-on'
import { IdealCareerRouter } from './idealCareerRouter'
// import bodyParser from 'body-parser'
import { UploadImageRouter } from './uploadImageRouter'
import { IndustrialClassificationRouter } from './industrialClassificationRouter'
import { AgeRangeRouter } from './ageRouter'
// import { appendFile } from "fs";
import { JobFunctionRouter } from './jobFunctionRouter'
import { BudgetForCourseRouter } from './budgetForCourseRouter'
import { EducationRouter } from './educationRouter'
import { IdentityRouter } from './identityRouter' 
import { YearExperienceRouter } from './yearExperienceRouter'
import { SalaryRouter } from './salaryRouter'
import { UserRouter } from './userRouter'
import { LocationRouter } from './locationRouter'
import { CourseRouter } from './courseRouter'
import { HobbyRouter} from './hobbyRouter'
import {FavouriteRouter } from './favouriteRouter'

let main = express();


main.use(express.static('components'))
main.use(express.json())
main.use(express.urlencoded({extended: false}))


main.use(IdealCareerRouter)
main.use(IndustrialClassificationRouter)
main.use(AgeRangeRouter)
main.use(JobFunctionRouter)
main.use(BudgetForCourseRouter)
main.use(EducationRouter)
main.use(IdentityRouter)
main.use(YearExperienceRouter)
main.use(SalaryRouter)
main.use(UserRouter)
main.use(LocationRouter)
main.use(CourseRouter)
main.use(HobbyRouter)
main.use(FavouriteRouter)

// main.use(bodyParser.json());
main.use(UploadImageRouter);




let port = 2000
main.listen(port, () => {
  print(port);
})