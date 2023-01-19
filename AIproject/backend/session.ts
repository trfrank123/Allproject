  import 'express-session'

declare module 'express-session' {
  interface SessionData {
    user?: SessionUser
  }
}

export interface SessionUser {
  id: number
  username: string
}
