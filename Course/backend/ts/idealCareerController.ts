import { RestfulController } from './restful.controller'
import { IdealCareerServer } from './idealCareerService'
import { Request, Response } from 'express';
interface infoType {
    user_id: number
    ideal_career1: number;
    ideal_career2: number;
    ideal_career3: number;
}
export class  IdealCareerController extends RestfulController{
    
    constructor(private idealCareerServer: IdealCareerServer){
        super();
        this.router.get("/Idealwork", this.getAll);
        this.router.get("/Idealworkdetails", this.getSingleGroup);
        this.router.post("/writeMatchCareer", this.writeMatchCourse);
    }


    writeMatchCourse = async (req: Request, res: Response) => {
        try {

            let info:infoType = {
                user_id:req.body.user_id,
                ideal_career1:req.body.ideal_career1,
                ideal_career2:req.body.ideal_career2,
                ideal_career3:req.body.ideal_career3
            }
        
            const result = await this.idealCareerServer.write(info);
            console.log(result)

            res.status(200);
            res.json(result);
        }catch (error) {
            res.status(400).json({ error: 'can not read IdealCareer' })

            res.end();
        }
    }
    

    getAll = async (req: Request, res: Response) => {
        try{
            let result = await this.idealCareerServer.getAll();
            res.json(result);
            res.status(200);
            res.end();
        }
        catch(error){
            res.status(400).json({ error: 'no ideal career' })

            res.end();
        }
    }

    getSingleGroup = async (req: Request, res: Response) => {
        try{
            let id = req.query.id
            if(!id){
                res.status(400);
                res.end();
                return;
            }

            let result = await this.idealCareerServer.getSingleGroup(+id);
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