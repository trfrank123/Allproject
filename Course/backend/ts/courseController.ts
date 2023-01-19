import { RestfulController } from './restful.controller'
import { CourseService } from './courseService'
import { Request, Response } from 'express';

class getAllCourseInfo{
    page_index : number;
    year: string
}



export class CourseController extends RestfulController {
    constructor(private courseService: CourseService) {
        super();
        this.router.get("/overviewCourse", this.getOverview);
        this.router.get("/detialCourse", this.getDetial);
        this.router.post("/relatedDetialCourse", this.getRelatedCourse);
    }

    getOverview = async (req: Request, res: Response) => {
        try {
            let year = req.query.year as string;
            if (!year) {
                res.status(400);
                res.end();
                return;
            }

            let page_index  = req.query.page as string;
            if (!page_index) {
                res.status(400);
                res.end();
                return;
            }

            let info = new getAllCourseInfo();
            info.year = year;
            info.page_index = (parseInt(page_index)) - 1;

            let result = await this.courseService.getOverview(info);
            res.json(result);
            res.status(200);
            res.end();
        }
        catch (error) {
            res.status(400).json({ error: 'no course info in this year' })

            res.end();
        }
    }

    getDetial = async (req: Request, res: Response) => {
        try {
            let id = req.query.course_id
            if (!id) {
                res.status(400);
                res.end();
                return;
            }
            let result = await this.courseService.getDetail(+id);
            res.json(result);
            res.status(200);
            res.end();
        }
        catch (error) {
            res.status(400).json({ error: 'no course info in this course id' })

            res.end();
        }
    }

    getRelatedCourse = async (req: Request, res: Response) => {
        try {
            
            let user_id = req.body.user_id
            // console.log(user_id)
            let hobbyObj:any = await this.courseService.getHobbyObjByUserId(user_id);
            // console.log(hobbyObj,'hobby')
            let job_id_arr = [hobbyObj.ideal_career1,hobbyObj.ideal_career2,hobbyObj.ideal_career3]
            // console.log(job_id_arr)
            let matchCourseList = await this.courseService.matchCourseList(job_id_arr)
            // console.log('end')

            // console.log(matchCourseList)
            res.json(matchCourseList);
            
            
        }
        catch (error) {
            
            res.json(error);
            
        }
    }
}