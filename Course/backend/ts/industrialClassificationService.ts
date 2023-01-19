import { Knex } from 'knex'

export class IndustrialClassificationServer {
    constructor(private knex: Knex){}

    async getAll(){
        try{
            return  await this.knex
            .select("id", "chi_name")
            .from("industrial_classification").orderBy("id");
        }
        catch(error){
            throw error;
        }
    }
}