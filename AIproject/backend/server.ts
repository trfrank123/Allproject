import express from "express";
import { print } from "listening-on";
import { Knex } from 'knex'
import { env } from './env'
import { knex } from './db'
// import { ImageService } from './image.service'
// import { ImageController } from './image.controller'


// import { suggestionRoute } from "./suggestion";
// import { rolexInfoRoute } from "./rolexInfo";
import "./session";
import path from "path";
import cors from "cors";

let app = express();
import multer from 'multer'

const storage = multer.diskStorage({
destination: function (req, file, cb) {
cb(null, path.join(__dirname, '../FN/public/assets'));
},
filename: function (req, file, cb) {
cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
}
})
const storage_ai = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, path.join(__dirname, './upload'));
  },
  filename: function (req, file, cb) {
  cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
  }
  })
const upload = multer({storage: storage})
const upload_ai = multer({storage: storage_ai})

app.use(/* 放加強器 */ express.static(path.join(__dirname, '../FN/public/assets')) )
app.use(cors(
  {
    origin:['http://localhost:8100','']
  }
))
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const ionicBuild = path.join(__dirname, "../FN","build")

console.log(ionicBuild)
app.use(express.static(ionicBuild))
app.get('/', async (req, res)=>{
res.sendFile(path.join(ionicBuild,'index.html'))
})
app.get('/home', async (req, res)=>{
  res.sendFile(path.join(ionicBuild,'index.html'))
})
app.get('/signup', async (req, res)=>{
    res.sendFile(path.join(ionicBuild,'index.html'))
})

app.get('/login', async (req, res)=>{
  res.sendFile(path.join(ionicBuild,'index.html'))
})
app.get('/show', async (req, res)=>{
  res.sendFile(path.join(ionicBuild,'index.html'))
})
// app.get('/test', async (req, res)=>{
// res.sendFile(path.join(test,'test.html'))
// })
// app.post('/submitForm', async (req, res)=>{
// console.log(req.body)
// res.json(req.body);
// })



import { UserController } from './user.controller'
import { UserService } from './user.service'



let userService = new UserService(knex)
let userController = new UserController(userService)
app.use(userController.router)

import { SuggestionService } from './suggestion.service'
import { SuggestionController } from './suggestion.controller'
let suggestionService = new SuggestionService(knex)
let suggestionController = new SuggestionController(suggestionService)
app.use(suggestionController.router)





import { RolexInfoController} from './RolexInfoController'
import { RolexInfoService } from './RolexInfoService'
let rolexInfoService = new RolexInfoService(knex)
let rolexInfoController = new RolexInfoController(rolexInfoService,upload_ai)

app.use('/rolex',rolexInfoController.router());


// let imageController = new ImageController(imageService)
// app.use(imageController.router)


// app.post('/signup',upload.single('photo'),async (req,res) =>{
//   let result = {
//     'file':'',
//     'data':{}
//   }
//   if(req.file != null){
//     console.log(req.file)
//     result.file = req.file.filename
//   }
  
//   result.data = req.body
//   res.json(result)
// })


export type Server = {
  close(): Promise<unknown>
  origin: string
}

export function startServer(knex: Knex) {

  let port = env.PORT




  return new Promise<Server>((resolve, reject) => {
    let express_server = app.listen(port, () => {
      print(port)
      let origin = 'http://localhost:' + port
      resolve({ close, origin })

      function close() {
        // let closeDBPromise = knex.destroy()
        let closeHTTPServerPromise = new Promise<void>((resolve, reject) => {
          express_server.close(err => {
            if (err) {
              reject(err)
            } else {
              resolve()
            }
          })
        })
        return Promise.all([
          // closeDBPromise,
          closeHTTPServerPromise,
        ])
      }
    })
    express_server.on('error', err => {
      reject(err)
    })
  })
}


