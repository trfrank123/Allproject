import { RestfulController} from './restful.controller'
import { FavouriteService } from './favouriteService'
import { Request, Response} from 'express'

interface favourInfo{
    user_id : number;
    course_id : number
}

export class FavouriteController extends RestfulController{
    constructor(private favourService: FavouriteService){
        super();
        this.router.post("/addFavouriteCourse", this.addFavourite);
        this.router.post("/dropFavouriteCourse", this.dropFavourite);
        this.router.post("/getFavouriteCourse", this.getAll);
    }

    addFavourite = async (req: Request, res: Response) => {
        try{

            let course_id = req.body.course_id
            if (!course_id) {
                res.status(400);
                res.end();
                return;
            }
            let user_id = req.body.user_id
            if (!user_id) {
            console.log("error user_id")
                res.status(400);
                res.end();
                return;
            }

            let info:favourInfo = {
                course_id:parseInt(course_id),
                user_id:parseInt(user_id)
            } 
            await this.favourService.add(info);
            res.json('success add favous')
        }
        catch(error){
            console.log(error);
            
            // res.status(400).json({ error: 'add favourite error' }

            res.json(error.message)
            
        }
    

        }
    dropFavourite = async (req: Request, res: Response) => {
        try{
            let course_id = req.query.course_id as string
            if (!course_id) {
                res.status(400);
                res.end();
                return;
            }
            let user_id = req.query.user_id as string
            if (!user_id) {
                res.status(400);
                res.end();
                return;
            }

            let info:favourInfo = {
               course_id: parseInt(course_id),
               user_id: parseInt(user_id)
            }
            
            await this.favourService.drop(info);
        }
        catch(error){
            // res.status(400).json({ error: 'drop favourite error' })
            res.status(400).json({ error: error })
            res.end();
        }
    }
    getAll = async (req: Request, res: Response) => {
        try{
            console.log("enter")
            let user_id = parseInt(req.body.user_id);
            let result = await this.favourService.getAll(user_id);
            console.log("result");
            console.log(result);
            res.json(result);
            res.status(200);
            res.end();
        }
        catch(error){
            
            res.json({ error: error.message })

            
        }
    }
}
