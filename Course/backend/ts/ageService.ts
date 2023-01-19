import { Knex } from 'knex'

export class AgeRangeServer {
    constructor(private knex: Knex){}

    async getRange(){
        try{
            return  await this.knex
            .select("id", "age_range")
            .from("age").orderBy("id");
        }
        catch(error){
            throw error;
        }
    }

    async patchAgeRange(id:number, body:any){
        try{
            const { age_range } = body;
            console.log(body, id);
            
            return await this.knex("user")
            .update({age:age_range})
            .where("id", id)
            .returning("*");
        }
        catch(error){
            throw error;
        }
    }

}