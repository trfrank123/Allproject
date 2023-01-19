
import { Knex } from 'knex'

import { SessionUser } from './session'


export class SuggestionService {
    constructor(private knex: Knex) {}

// async selectUserId(id: number, user: SessionUser) {
//     await this.knex('user').where({ id, user_id: user.id })
//     }

async create(suggestion: String,user: SessionUser){

    let date = new Date();
    // throw new HTTPError(501, 'not implemented')
    let rows = await this.knex.raw(
        'insert into suggestion (suggestion, user_id, date) values (?, ?, ?)',
        [suggestion, user.id, date]
        )
    return rows
  }
}