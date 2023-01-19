import { RestfulController } from './restful.controller'
import { JobFunctionServer } from './jobFunctionService'
import { Request, Response } from 'express';

export class  JobFunctionController extends RestfulController{
    constructor(private jobFunctionServer: JobFunctionServer){
        super();
        this.router.get("/jobFunction", this.getAll);
    }

    getAll = async (req: Request, res: Response) => {
        try{
            let result = await this.jobFunctionServer.getAll();
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