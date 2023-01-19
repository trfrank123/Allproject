import express, { Request, Router } from 'express'
import multer from 'multer'

import { RolexInfoService } from './RolexInfoService'
import fetch from 'cross-fetch';
import { request } from 'http';

let price_arr = [
  {
    price_2018:14400,
    price_2020:14800,
    price_2022:15200
  },
  {
    price_2018:26050,
    price_2020:26050,
    price_2022:27650
  },
  {
    price_2018:0,
    price_2020:41500,
    price_2022:41500
  },
  {
    price_2018:20600,
    price_2020:20600,
    price_2022:25250
  },
  {
    price_2018:34250,
    price_2020:36950,
    price_2022:37950
  },
  {
    price_2018:36850,
    price_2020:38350,
    price_2022:40650
  },
  {
    price_2018:38150,
    price_2020:46650,
    price_2022:46750
  },
  {
    price_2018:6200,
    price_2020:6450,
    price_2022:7450
  },
  {
    price_2018:33250,
    price_2020:33250,
    price_2022:39350
  },
  {
    price_2018:13000,
    price_2020:13000,
    price_2022:15250
  },
  {
    price_2018:11350,
    price_2020:11700,
    price_2022:12950
  },
  {
    price_2018:7900,
    price_2020:7900,
    price_2022:7900
  },
  {
    price_2018:0,
    price_2020:0,
    price_2022:7200
  },
  {
    price_2018:0,
    price_2020:0,
    price_2022:11150
  },
  {
    price_2018:8100,
    price_2020:8350,
    price_2022:0
  },
  {
    price_2018:0,
    price_2020:0,
    price_2022:9500
  },
  {
    price_2018:8200,
    price_2020:8500,
    price_2022:9150
  },
  {
    price_2018:8200,
    price_2020:8500,
    price_2022:9150
  },
  {
    price_2018:6400,
    price_2020:9550,
    price_2022:9550
  },
  {
    price_2018:11350,
    price_2020:11700,
    price_2022:12950
  },
  {
    price_2018:0,
    price_2020:0,
    price_2022:17000
  },
  {
    price_2018:12350,
    price_2020:12350,
    price_2022:12350
  },
  {
    price_2018:9300,
    price_2020:14300,
    price_2022:14700
  },
  {
    price_2018:14400,
    price_2020:14800,
    price_2022:15200
  },
  {
    price_2018:9350,
    price_2020:9350,
    price_2022:10000
  },
  {
    price_2018:7350,
    price_2020:7350,
    price_2022:7600
  },
  {
    price_2018:12700,
    price_2020:12700,
    price_2022:13550
  },
  {
    price_2018:12400,
    price_2020:13150,
    price_2022:14550
  },
  {
    price_2018:9250,
    price_2020:9700,
    price_2022:10550
  },
  {
    price_2018:0,
    price_2020:0,
    price_2022:11050
  },
  {
    price_2018:8500,
    price_2020:9500,
    price_2022:10100
  },
  {
    price_2018:10900,
    price_2020:13250,
    price_2022:13550
  },
  {
    price_2018:7500,
    price_2020:8100,
    price_2022:8950
  },
  {
    price_2018:37550,
    price_2020:39250,
    price_2022:40350
  },
  {
    price_2018:37450,
    price_2020:39350,
    price_2022:40450
  },
  {
    price_2018:36750,
    price_2020:38250,
    price_2022:41600
  },
  {
    price_2018:0,
    price_2020:0,
    price_2022:29650
  },
  {
    price_2018:0,
    price_2020:0,
    price_2022:28300
  },
  {
    price_2018:0,
    price_2020:0,
    price_2022:18750
  },
  {
    price_2018:34850,
    price_2020:36650,
    price_2022:37450
  },
]

export class RolexInfoController{
    
    constructor(private rolexService: RolexInfoService, private upload:multer.Multer) {
      
    }

    router(){
      const router = express.Router()
      // router.post('/rolexInfo', this.list)
      router.post('/Ai_images',this.upload.single('Ai_images'),this.ai_image)
      return router;
    }
    
    ai_image = async(req:express.Request,res:express.Response)=>{
      let result
      let mess
      if(req.file!=null){
      //   console.log(req.file.filename)
        let filename = [`./upload/${req.file.filename}`]
      //   let formData = new FormData()
      //   formData.append('file',JSON.stringify(filename))
        const res = await fetch('http://localhost:8000/predict',{
          method:"POST",
          headers:{
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            'file':filename
          })
        });
        let result2 = await res.json();
        
        result = result2.predictions[0]

        let max_predition = Math.max(...result)
        // // let pos = result.indexOf(max_predition.toString())
        let pos:number = result.indexOf(max_predition)
        let price_his = price_arr[`${pos}`]

        
        if(price_his.price_2022 > price_his.price_2020 && price_his.price_2022 > 0){
          mess = 'Should buy'
        }else if(price_his.price_2022 === 0){
          mess = 'Out of Stock'
        }else if(price_his.price_2022 < price_his.price_2020 && price_his.price_2022 > 0){
          mess = "Shouldn't buy"
        }
        


      }
      res.json(mess)
      }
    
    // list = this.wrapMethod(async (req: Request) => {
    //     if (!req.body.refNum) {
    //       throw new HTTPError(400, 'no refNum')
    //     }
    //   return this.rolexService.list(req.body.refNum)
    // })
  

    // formatDataToJson = (formData:FormData) => {
    //   let obj:any = {}
    //   formData.forEach((value,key)=>{
    //     obj[key] = value
    //   })
    //   return JSON.stringify(obj) 
    // }
  }