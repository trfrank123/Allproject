import { RestfulController } from './restful.controller'
import { SalaryServer } from './salaryService'
import { Request, Response } from 'express';

export class  SalaryController extends RestfulController{
    constructor(private salaryServer: SalaryServer){
        super();
        this.router.get("/salary", this.getAll);
    }

    getAll = async (req: Request, res: Response) => {
        try{
            let result = await this.salaryServer.getAll();
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
