import { Knex } from 'knex'

export class YearExperienceServer {
    constructor(private knex: Knex){}

    async getAll(){
        try{
            return  await this.knex
            .select("id", "year_range")
            .from("year_experience").orderBy("id");
        }
        catch(error){
            console.log(error)
            throw error;
        }
    }

}