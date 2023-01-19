import { RestfulController } from './restful.controller'
import { BudgetForCourseServer } from './budgetForCourseService'
import { Request, Response } from 'express';

export class  BudgetForCourseController extends RestfulController{
    constructor(private budgetForCourseServer: BudgetForCourseServer){
        super();
        this.router.get("/budgetForCourse", this.getAll);
    }

    getAll = async (req: Request, res: Response) => {
        try{
            let result = await this.budgetForCourseServer.getAll();
            res.json(result);
            res.status(200);
            res.end();
        }
        catch(error){
            res.status(400).json({ error: error })

            res.end();
        }
    }
}
