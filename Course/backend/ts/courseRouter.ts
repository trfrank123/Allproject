 import { Router } from 'express'
 import { CourseController } from './courseController'
 import { CourseService } from './courseService'
 import { knex } from './db'

 export let CourseRouter = Router();

 let courseServer = new CourseService(knex);
 let courseController = new CourseController(courseServer);

 // CourseRouter.use((req, res, next) => {
//     console.log("success to enter CourseRouter")
//     next();

CourseRouter.get("/overviewCourse", courseController.getOverview);
CourseRouter.get("/detialCourse", courseController.getDetial);
CourseRouter.post("/relatedDetialCourse", courseController.getRelatedCourse);