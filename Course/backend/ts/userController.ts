// import multer from 'multer'
import { RestfulController } from './restful.controller'
import { UserService } from './userService'
// import path from "path";

import express from 'express'

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//   cb(null, path.join(__dirname, '../FN/public/assets'));
//   },
//   filename: function (req, file, cb) {
//   cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
//   }
//   })
  // const upload = multer({storage: storage})
export class UserController extends RestfulController {
  constructor(private userService: UserService) {
    super()
    this.router.post('/signup',this.signup)
    this.router.post('/login', this.login)
    this.router.get('/userInfo/:id', this.userInfo)
    this.router.patch('/updateUserInfo', this.updateUserInfo)
    this.router.delete('/delAc/:id', this.delAc)
  }

  signup = (async (req: express.Request, res:express.Response) => { 
    
    try{
      let user = {
        'username': '',
        'password': '',
        'created_at': '',
        'updated_at': '',
        'email': '',
        'work_experience': '',
        'education': 0,
        'age': 0,
        'job_function': 0,
        'budget_for_course': 0,
        'gender': '',
        'phone': '',
        'identity': 0,
        'ideal_work_location': 0,
        'icon': '',
        'ideal_career1': 0,
        'ideal_career2': 0,
        'ideal_career3': 0,
        'expect_salary': 0,
      }
      user.username = req.body.username
      user.password = req.body.password
      user.created_at = req.body.created_at
      user.updated_at = req.body.updated_at
      user.email = req.body.email
      user.work_experience = req.body.work_experience
      user.education = req.body.education
      user.age = req.body.age
      user.job_function = req.body.job_function
      user.budget_for_course = req.body.budget_for_course
      user.gender = req.body.gender
      user.phone = req.body.phone
      user.identity = req.body.identity
      user.ideal_work_location = req.body.ideal_work_location
      user.ideal_career1 = req.body.ideal_career1
      user.ideal_career2 = req.body.ideal_career2
      user.ideal_career3 = req.body.ideal_career3
      user.expect_salary = req.body.expect_salary
 
      let userId = await this.userService.signup(user)
      res.json(userId)
    }catch(err){
      console.log(err)
      res.json(err)
    }

  })


  login = async (req: express.Request, res:express.Response) => {
    try{
      console.log(req.body)
      let result = await this.userService.login(req.body)
      res.json(result)
    }catch(err){
      res.json({errMess:err.message})
    }
    
    
  }

  userInfo = (async (req: express.Request, res:express.Response) => { 
    try{
      let user = {
        'id': req.params.id
      }
      let result = await this.userService.userInfo(user)
      res.json(result)
    }catch(err){
      res.json(err)
    }
  })

  updateUserInfo = async (req: express.Request, res:express.Response) => {
    try{   
    let result = await this.userService.updateUserInfo( req.body.id ,req.body)
    res.json(result)
    }catch(err){
      res.json(err)
    }
  }

  delAc = (async (req: express.Request, res:express.Response) => { 
    try{
      let user = {
        'id': req.params.id
      }
      let result = await this.userService.delAc(user)
      res.json(result)
    }catch(err){
      res.json(err)
    }
  })
  
}

