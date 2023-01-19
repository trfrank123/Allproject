import { Knex } from 'knex'

export class SalaryServer {
    constructor(private knex: Knex){}

    async getAll(){
        try{
            return  await this.knex
            .select("id", "salary_range")
            .from("salary").orderBy("id");
        }
        catch(error){
            throw error;
        }
    }

}