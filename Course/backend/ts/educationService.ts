import { Knex } from 'knex'

export class EducationServer {
    constructor(private knex: Knex){}

    async getAll(){
        try{
            return  await this.knex
            .select("id", "education_level")
            .from("education").orderBy("id");
        }
        catch(error){
            throw error;
        }
    }

}