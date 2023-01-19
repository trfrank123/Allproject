import { Knex} from 'knex'

class addFavourite{
    user_id: number;
    course_id: number;
}

class dropFavourite{
    user_id: number;
    course_id: number;
}


export class FavouriteService{
    constructor(private knex: Knex){}

    async add(info: addFavourite){
        try{
            return await this.knex("favourite").insert(info)
        }
        catch(error){
            throw new Error('failed to add');
        }
    }
    async getAll(user_id:number){
        try{
            let arr = await this.knex
            .select("course_id")
            .from("favourite").where("user_id",user_id).orderBy("id");
            let course_ids = arr.map(obj=>obj.course_id)
            return await this.knex.select('*').whereIn('id',course_ids).from('course')
        }
        catch(error){
            throw error;
        }
    }

    async drop(info: dropFavourite){
        try{
            return await this.knex("favourite").where(info).del();
        }
        catch(error){
            throw error;
        }
    }
}