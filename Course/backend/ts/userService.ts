import { Knex } from 'knex'
// import { HTTPError } from './error'
import { comparePassword, hashPassword } from './hash'


export class UserService {
  constructor(private knex: Knex) {}

  async signup(user: {
    username: string
    password: string
    created_at: string
    updated_at: string
    email: string
    education: number
    age: number
    budget_for_course: number
    gender: string
    phone: string
    identity: number
    ideal_work_location: number
    icon: string
    expect_salary: number
  }): Promise<{ id: number }> {
    user.password = await hashPassword(user.password)
    // let result = await this.knex.raw(
      // 'insert into "user" (username, password, email, education, age, budget_for_course, gender, phone, identity, ideal_work_location, icon,expect_salary) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) returning id',
      // [user.username, confirm_password, user.email,  user.education, user.age, user.budget_for_course, user.gender, user.phone, user.identity, user.ideal_work_location, user.icon, user.expect_salary],
    // )
    let id:number = await this.knex.insert(user).into("user").returning('id');
    // let id = result.rows[0].id
    return { id }
  }

  async login(user: {
    username: string
    password: string
  }): Promise<{ id: number }> {
    console.log(user)

    let result = await this.knex.raw(
      'select id, password from "user" where username = ?',
      [user.username], 
    )
    let row = result.rows[0]
    if (!row) {
      throw new Error('wrong username or password')
    }
    let is_matched = await comparePassword({
      password: user.password,
      password_hash: row.password,
    })
    
    if (!is_matched) {
      throw new Error('wrong password')
    }
    return { id: row.id }
    
  }

  async userInfo(user: {
    id: string
  }): Promise< any> {
    let result = await this.knex.raw(
      'SELECT username, email, gender, icon, education.id AS education_id , education.education_level, year_experience.id AS  year_experience_id, year_range, age.id AS age_id, age_range, identity.id AS identity_id, identity.identity ,job_function.id AS job_function_id, job_type, budget_for_course.id AS budget_for_course_id, budget_range, location.id AS location_id, district, salary.id AS salary_id, salary_range FROM "user", education, year_experience, age, identity , job_function, budget_for_course, location, salary WHERE age = age.id AND "user".identity = identity.id AND work_experience = year_experience.id AND education = education.id AND "user".job_function = job_function.id AND budget_for_course = budget_for_course.id AND ideal_work_location = location.id AND expect_salary = salary.id AND "user".id = ?;',
      // 'SELECT * FROM "user";'
      [user.id], 
    )
    let row = result.rows[0]
    if (!row) {
      throw new Error('Server Error')
    }
    return row 
  }

  async updateUserInfo(id:number, body: {
    password:string
    email:string
    age: string
    identity: string
    education: string
    work_experience: string
    job_functions: []
    budget_for_course: string
    icon: string | null
  }): Promise< any> {
    try{
      const { email, age, identity, education, work_experience, job_functions, budget_for_course, icon} = body;
      let query;
      if (body.password) {
        let password = await hashPassword(body.password)
         query = {password, email, age, identity, education, work_experience, job_functions, budget_for_course, icon}
        } else {
        query = { email, age, identity, education, work_experience, job_functions, budget_for_course, icon}
      }
    return await this.knex("user")
    .update(query)
    .where("id", id)
    .returning("*");
    }
    catch(error){
      console.log(error)
      throw error;
    }
  }

  async delAc(user: {
    id: string
  }): Promise< any> {

    await this.knex.raw(
      'DELETE FROM favourite WHERE user_id = ?;',
      [user.id]
    )

    await this.knex.raw(
      'DELETE FROM hobby WHERE user_id = ?;',
      [user.id]
    )

    let result = await this.knex.raw(
      'DELETE FROM "user" WHERE id = ?;',
      [user.id], 
    )
    let row = result.rows[0]
    if (!row) {
      throw new Error('Server Error')
    }
    return row 
  }

  async checkUsernameHasBeenUsed(user: {
    username: string
  }): Promise<boolean> {
    // console.log(user)
  
    let result = await this.knex.raw(
      'select username from "user" where username = ?',
      [user.username], 
    )
    let row = result.rows[0]
    return row ? true : false;
  }
}
