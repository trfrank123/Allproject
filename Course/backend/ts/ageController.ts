import { RestfulController } from './restful.controller'
import { AgeRangeServer } from './ageService'
import { Request, Response } from 'express';

export class  AgeRangeController extends RestfulController{
    constructor(private AgeRangeServer: AgeRangeServer){
        super();
        this.router.get("/ageRange", this.getRange);
        this.router.patch("/ageRange", this.patchAgeRange)
    }

    getRange = async (req: Request, res: Response) => {

        try{
            
            let result = await this.AgeRangeServer.getRange();
            res.json(result);
            res.status(200);
            res.end();
        }
        catch(error){
            res.status(400).json({ error: error })
            res.end();
        }
    }

    patchAgeRange = async (req: Request, res: Response) => {

        try{
            
            let result = await this.AgeRangeServer.patchAgeRange(1, req.body);
            
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