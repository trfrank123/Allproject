import { object, string } from 'cast.ts'
import { Request } from 'express'
import multer from 'multer'
import { HTTPError } from './error'
import { RestfulController } from './restful.controller'
import { UserService } from './user.service'
import path from "path";

import express from 'express'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, path.join(__dirname, '../FN/public/assets'));
  },
  filename: function (req, file, cb) {
  cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
  }
  })
  const upload = multer({storage: storage})
export class UserController extends RestfulController {
  constructor(private userService: UserService) {
    super()
    this.router.post('/signup',upload.single('photo'),this.signup)
    this.router.post('/login', this.login)
  }

  signup = (async (req: express.Request, res:express.Response) => { 
    try{
      let user = {
        'username':'',
        'password':'',
        'email':'',
        'nickname':'',
        'confirm_password':'',
        'photo':''
      }
      if(req.file != null){
        user.photo = req.file.filename
      }
      user.username = req.body.username
      user.password = req.body.password
      user.email = req.body.email
      user.nickname = req.body.nickname
      user.confirm_password = req.body.confirm_password
      
      
      
      let result = await this.userService.signup(user)
      res.json(result)
    }catch(err){

    }
    
    
    
    
  })

 


  login = async (req: express.Request, res:express.Response) => {
    let result = await this.userService.login(req.body)
    res.json(result)
    
  }
}
