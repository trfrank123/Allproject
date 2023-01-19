import { Request, Response } from 'express'

export class HTTPError extends Error {
    constructor(public status: number, message: string) {
      super(message)
    }
}

export function getString(
    req: Request,
    field: string & keyof Request,
    key: string,
  ): string {
    let value = req[field][key]
    if (!value) {
      throw new HTTPError(400, `Missing ${key} in req.${field}`)
    }
    if (typeof value !== 'string') {
      throw new HTTPError(400, `Invalid ${key}, expect string value`)
    }
    return value
}

export function handleError(res: Response, error: unknown) {
    console.log('handleError:', error)
    // console.log('status:',(error as any).status)
    if (error instanceof HTTPError) {
      res.status(error.status)
      res.end(error.message)
      return
    }
    res.status(500)
    res.end(String(error))
}