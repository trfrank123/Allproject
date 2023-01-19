import { RestfulController } from './restful.controller'
import { IndustrialClassificationServer } from './industrialClassificationService'
import { Request, Response } from 'express';

export class  IndustrialClassificationController extends RestfulController{
    constructor(private industrialClassificationServer: IndustrialClassificationServer){
        super();
        this.router.get("/industrialClassification", this.getAll);
    }

    getAll = async (req: Request, res: Response) => {
        try{
            let result = await this.industrialClassificationServer.getAll();
            console.log(result);
            res.json(result);
            res.status(200);
            res.end();
        }
        catch(error){
            res.status(400).json({ error: 'no ideal career' })

            res.end();
        }
    }
}