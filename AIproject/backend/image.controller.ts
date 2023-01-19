import { Request } from 'express'

import { RestfulController } from './restful.controller'
import { ImageService } from './image.service'

export class ImageController extends RestfulController {
    constructor(
      private image: ImageService,
    ) {
      super()
      this.router.post('/Show', this.handle)
    }
    
    handle = this.wrapMethod(async (req:Request) => {

      // req.body = image 
      return this.image.handle(req.body)
    })
  }
