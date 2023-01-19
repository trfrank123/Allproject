import { RestfulController } from './restful.controller'
import { EducationServer } from './educationService'
import { Request, Response } from 'express';

export class  EducationController extends RestfulController{
    constructor(private educationServer: EducationServer){
        super();
        this.router.get("/education", this.getAll);
    }

    getAll = async (req: Request, res: Response) => {
        try{
            let result = await this.educationServer.getAll();
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
