import { Knex } from 'knex'

export class IdentityServer {
    constructor(private knex: Knex){}

    async getAll(){
        try{
            return  await this.knex
            .select("id", "identity")
            .from("identity").orderBy("id");
        }
        catch(error){
            throw error;
        }
    }

}