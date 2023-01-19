import { Request } from 'express'
import { HTTPError } from './error'
import { RestfulController } from './restful.controller'
import { SuggestionService } from './suggestion.service'

export class SuggestionController extends RestfulController {
    constructor(
      private suggestion: SuggestionService,
    ) {
      super()
      this.router.post('/suggestion', this.create)
    }
  
    create = this.wrapMethod(async (req: Request) => {
        let { suggestion } = req.body; 
        let user = this.getSessionUser(req)

        if (!suggestion) {
          throw new HTTPError(400, 'no suggestion')
        }

      return this.suggestion.create(suggestion, user)
    })
  
  }