import { Knex } from 'knex'
import { HTTPError } from './error'
import { comparePassword, hashPassword } from './hash'


export class UserService {
  constructor(private knex: Knex) {}

  async signup(user: {
    username: string
    
    password: string
    email:string
    nickname: string
    confirm_password: string
    photo: string | null
  }): Promise<{ id: number }> {
    let confirm_password = await hashPassword(user.password)
    let result = await this.knex.raw(
      'insert into "users" (username, password_hash, nickname, email,photo) values (?, ?, ?, ?, ?) returning id',
      [user.username, confirm_password, user.nickname, user.email,user.photo],
    )
    let id = result.rows[0].id
    return { id }
  }

  async login(user: {
    username: string
    password: string
  }): Promise<{ id: number }> {
    console.log(user)
    let result = await this.knex.raw(
      'select id, password_hash from "users" where username = ?',
      [user.username], 
    )
    let row = result.rows[0]
    if (!row) {
      throw new HTTPError(403, 'wrong username or password')
    }
    let is_matched = await comparePassword({
      password: user.password,
      password_hash: row.password_hash,
    })
    if (!is_matched) {
      throw new HTTPError(403, 'wrong password')
    }
    return { id: row.id }
  }
}