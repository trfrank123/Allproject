import { Knex } from 'knex'

export class UploadImageService {
    constructor(private knex: Knex){}

    async upload(body:any){
        
        try{
         

            // need to insert into database with user id

            return

            return  await this.knex()
            .select("id", "chi_name", "industrial_classification")
            .from("ideal_career").orderBy("id");
        }
        catch(error){
            console.log("sql error", error)
            throw error;
        }
    }
}