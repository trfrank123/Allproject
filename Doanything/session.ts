import expressSession from 'express-session'
import { Request, Response } from 'express'

let sessionSecret =
  Math.random().toString(36).slice(2) +
  Math.random().toString(36).slice(2) +
  Math.random().toString(36).slice(2)

export let sessionMiddleware = expressSession({
    secret: sessionSecret,
    saveUninitialized: true,
    resave: true,
})

declare module 'express-session' {
    interface SessionData {
      user?: {
        id: number
        username: string
        profile_image: string,
        nickname:string
      }
    }
}

export function getSessionUser(req:Request, res:Response) {
  let user = req.session?.user
  return user
}


