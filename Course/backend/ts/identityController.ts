import { RestfulController } from './restful.controller'
import { IdentityServer } from './identityService'
import { Request, Response } from 'express';

export class  IdentityController extends RestfulController{
    constructor(private identityServer: IdentityServer){
        super();
        this.router.get("/identity", this.getAll);
    }

    getAll = async (req: Request, res: Response) => {
        try{
            let result = await this.identityServer.getAll();
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
