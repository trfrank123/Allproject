import { RestfulController } from './restful.controller'
// import { HobbyService } from './hobbyService'
import { Request, Response } from 'express';



interface infoType {
    user_id: number
    ideal_career1: number;
    ideal_career2: number;
    ideal_career3: number;
}



export class HobbyController extends RestfulController {
    constructor(
        // private hobbyService: HobbyService
        ) {
        super();
        this.router.post("/getMatchCareer", this.getMatchCourse);
        // this.router.post("/writeIdealCareer", this.writeIdealCareer);
    }

    getMatchCourse = async (req: Request, res: Response) => {
        try {

            let info:infoType = {
                user_id:req.body.user_id,
                ideal_career1:req.body.ideal_career1,
                ideal_career2:req.body.ideal_career2,
                ideal_career3:req.body.ideal_career3
            }
            

            // const result = await this.hobbyService.getMatchCareer(info);
            console.log(info)

            res.status(200);
            res.end();
        }
        catch (error) {
            res.status(400).json({ error: 'can not read IdealCareer' })

            res.end();
        }
    }

    // writeIdealCareer = async (req: Request, res: Response) => {
    //     try {
    //         let info:infoType = {

            
    //         info.user_id = ?;
    //         info.ideal_career1 = req.body.?
    //         info.ideal_career2 = req.body.?;
    //         info.ideal_career3 = req.body.?;
    //         }    
    //         let result = await this.hobbyService.write(info);
    //         res.json(result);
    //         res.status(200);
    //         res.end();
    //     }
    //     catch (error) {
    //         res.status(400).json({ error: 'can not write IdealCareer' })

    //         res.end();
    //     }
    // }
}  
