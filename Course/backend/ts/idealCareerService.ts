import { Knex } from 'knex'
interface infoType {
    user_id: number
    ideal_career1: number;
    ideal_career2: number;
    ideal_career3: number;
}
export class IdealCareerServer {
    constructor(private knex: Knex){}
    
    async write(info:infoType){
        try {
            let hasUser = await this.knex.select('user_id').from('hobby').where('user_id', info.user_id).returning('id')
            if(hasUser.length==0)
            return await this.knex("hobby").insert(info).returning(['ideal_career1', 'ideal_career2', 'ideal_career3']);
            else return await this.knex("hobby").update(info).returning(['ideal_career1', 'ideal_career2', 'ideal_career3']);
        }
        
        catch (error) {
            console.log(error)
            throw error;
        }
    }
    async getAll(){
        try{
            return  await this.knex
            .select("id", "chi_name", "industrial_classification")
            .from("ideal_career").orderBy("id");
        }
        catch(error){
            throw error;
        }
    }

    async getSingleGroup(id:number){
        try{
            return await this.knex.select("id", "chi_name").from("ideal_career").where("industrial_classification",id)
        }
        catch(error){
            throw error;
        }
    }
}