import { Knex } from 'knex'

// interface budgetState{
//     id: number,
//     budget_range:string
// }
// interface readIdealCareer {
//     user_id: number
//     budget_for_course:budgetState
// }
interface infoType {
    user_id: number
    ideal_career1: number;
    ideal_career2: number;
    ideal_career3: number;
}
export class HobbyService {
    constructor(private knex: Knex) { }

    async getMatchCareer(info:infoType){
        try {
            await this.write(info)
            return await this.knex
            .select("program_name")
            .from("course")
            .where('id',info.user_id)

        }catch (error) {
            throw error;
        }
    }

    async write(info:infoType){
        try {
            return await this.knex("hobby").insert(info);
        }
        catch (error) {
            throw error;
        }
    }
}