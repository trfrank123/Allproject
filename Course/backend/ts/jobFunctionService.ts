import { Knex } from 'knex'

export class JobFunctionServer {
    constructor(private knex: Knex){}

    async getAll(){
        try{
            return  await this.knex
            .select("id", "job_type")
            .from("job_function").orderBy("id");
        }
        catch(error){
            throw error;
        }
    }
}