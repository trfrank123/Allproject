import { Router, Request, Response } from 'express'
// import { HTTPError } from './error'
import './session'
// import { SessionUser } from './session'

export class RestfulController {
  router = Router()

  wrapMethod(fn: (req: Request) => object | Promise<object>) {
    return async (req: Request, res: Response) => {
      try {
        let json = await fn(req)
        res.json(json)
      } catch (error) {
        // console.error('[API Failed]',req.method, req.url, error)
        // let code = (error as HTTPError).status || 500
        // res.status(code)
        let message = String(error)
          .replace('Error: ', '')
          .replace('TypeInvalid', 'Invalid')
        res.json({ error: message })
      }
    }
  }

  // getSessionUser(req: Request | any): SessionUser {
    
  //   let user = req.session.user
  //   if (!user) {
  //     throw new HTTPError(401, 'This API is only available to logged users')
  //   }
  //   return user
  // }
}
