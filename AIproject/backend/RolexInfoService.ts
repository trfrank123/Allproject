import { Knex } from 'knex'



export class RolexInfoService {
    constructor(private knex: Knex) {}

    private async selectRolexInfo(knex: Knex,refNum:string) {
      return knex
      .select('*')
      .fromRaw('rolexInfo')
      .where('reference_number', refNum)
    }

    // select * from rolexInfo

    async list(refNum:string): Promise<{
        id: number
        image: string
        model: string
        year: string
        reference_number: number
        price_2018:number
        price_2020:number
        price_2022:number
     }> {
    // throw new HTTPError(501, 'not implemented')
    let query = await this.selectRolexInfo(this.knex, refNum)
    console.log(query)
    // console.log('list memo:', query.toSQL())
    let rows =  query[0]
    return rows
  }
}