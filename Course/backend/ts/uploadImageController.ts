import { RestfulController } from './restful.controller'
import { UploadImageService } from './uploadImageService'
import { Request, Response } from 'express';

export class  UploadImageController extends RestfulController{
    constructor(private uploadImageService: UploadImageService){
        super();
        this.router.post("/", this.upload);
    }

    upload = async (req: Request, res: Response) => {
        try{
            console.log('files', req.files);
            console.log('body', req.body);
            
            let result = await this.uploadImageService.upload(req.body);
            res.json(result);
            res.status(200);
            res.end();
        }
        catch(error){
            res.status(400).json({ error})

            res.end();
        }
    }
}