import { Knex } from 'knex'

export class BudgetForCourseServer {
    constructor(private knex: Knex){}

    async getAll(){
        try{
            return  await this.knex
            .select("id", "budget_range")
            .from("budget_for_course").orderBy("id");
        }
        catch(error){
            throw error;
        }
    }

}