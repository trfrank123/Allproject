// import { Request, Response, NextFunction } from 'express'
// import './session'

// export function guardLoginSession(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   if (!req.session.user) {
//     res.status(401)
//     res.json({ error: 'This API is only available to logged users' })
//     return
//   }
//   next()
// }
