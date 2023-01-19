import { RestfulController } from './restful.controller'
import { YearExperienceServer } from './yearExperienceService'
import { Request, Response } from 'express';

export class  YearExperienceController extends RestfulController{
    constructor(private yearExperienceServer: YearExperienceServer){
        super();
        this.router.get("/yearExperience", this.getAll);
    }

    getAll = async (req: Request, res: Response) => {
        try{
            let result = await this.yearExperienceServer.getAll();
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
