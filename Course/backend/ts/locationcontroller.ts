import { RestfulController } from './restful.controller'
import { LocationServer } from './locationService'
import { Request, Response } from 'express';

export class  LocationController extends RestfulController{
    constructor(private LocationServer: LocationServer){
        super();
        this.router.get("/location", this.getLocation);
    }

    getLocation = async (req: Request, res: Response) => {

        try{
            
            let result = await this.LocationServer.getLocation();
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