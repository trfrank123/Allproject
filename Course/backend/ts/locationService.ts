import { Knex } from 'knex'

export class LocationServer {
    constructor(private knex: Knex){}

    async getLocation(){
        try{
            return  await this.knex
            .select("id", "area", "district")
            .from("location").orderBy("id");
        }
        catch(error){
            throw error;
        }
    }

}