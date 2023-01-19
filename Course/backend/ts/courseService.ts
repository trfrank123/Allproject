import { Knex } from 'knex'

export class CourseService {
    constructor(private knex: Knex) { }
    async getHobbyObjByUserId(user_id:number){
        let arr = await this.knex.from('hobby').where('user_id',user_id)
        
        return arr[0]
    }
    async matchCourseList(arr:number[]){
        try{
            
            let resultList = await this.knex.from('course').whereIn('industry',arr)
            
            return resultList
        }catch(err){
            
            return 'sql error'
        }
            
        
    }
    async getOverview(info: {
        year: string,
        page_index: number
    }) {
        try {
            let total_page
            let limit: number = 10;
            let rows: any = (await this.knex.count("id").from('course'))
            if (rows) {
                total_page = Math.ceil(rows[0].count / limit)
                if (info.page_index >= total_page) {
                    return { data: [], isLast: true, total_page: total_page }
                }

            }

            return {
                data: await this.knex
                    .join('course_type', 'course_type.id', 'course.course_type')
                    .join('organization', 'organization.id', 'course.organization')
                    .join('industrial_classification', 'industrial_classification.id', 'course.area_of_study')
                    .select("course.id as program_id", "course. program_name", "course_type.course_type",
                        "organization.organization_name", "course.price", "course.year",
                        "course.area_of_study as classification_id", "industrial_classification.chi_name as area_of_study",
                        "course.industry as industry_id")
                    .from("course")
                    .where({ "course.year": info.year })
                    .orderBy("course.id")
                    .limit(limit)
                    .offset((info.page_index) * limit),
                isLast: false,
                total_page: total_page
            }
        }
        catch (error) {
            throw error;
        }
    }

    async getDetail(course_id: number) {
        try {
            return (await this.knex
                .join('course_education_requirement', 'course_education_requirement.id', 'course.requirements')
                .join('image', 'image.id', 'course.image')
                .join('organization', 'organization.id', 'course.organization')
                .join('language', 'language.id', 'course.language')
                .join('course_type', 'course_type.id', 'course.course_type')
                .join('fund_mode', 'fund_mode.id', 'course.fund_mode')
                .join('industrial_classification', 'industrial_classification.id', 'course.area_of_study')
                .join('ideal_career', 'ideal_career.id', 'course.industry')
                .select("*", "course.id as program_id", "course.area_of_study as classification_id",
                 "industrial_classification.chi_name as area_of_study", "ideal_career.eng_name as industry_eng_name")
                .from("course").where({ "course.id": course_id }))[0]
        }
        catch (error) {
            throw error;
        }
    }

    async getRelatedCourse(info: {
        year: string,
    }) {
        try {
            return await this.knex
                .join('course_type', 'course_type.id', 'course.course_type')
                .join('organization', 'organization.id', 'course.organization')
                .join('industrial_classification', 'industrial_classification.id', 'course.area_of_study')
                .select("course.id as program_id", "course. program_name", "course_type.course_type",
                    "organization.organization_name", "course.price", "course.year",
                    "course.area_of_study as classification_id", "industrial_classification.chi_name as area_of_study",
                    "course.industry as industry_id")
                .from("course")
                .where({ "course.year": info.year })
                .orderBy("course.id")
        }
        catch (error) {
            throw error;
        }
    }
}