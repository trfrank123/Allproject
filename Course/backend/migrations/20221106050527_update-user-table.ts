import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const user = await knex.schema.hasTable("user");
    if (user) {
        await knex.schema.table("user", (table)=>{
            table.string('email')
            table.integer("work_experience")
            table.integer("education").references("education.id");
            table.integer("age").references("age.id");
            table.integer("job_function").references("job_function.id");
            table.integer("budget_for_course").references("budget_for_course.id");
            table.string("gender", 1);
            table.string("phone");
        })
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.table("user", (table)=>{
        table.dropColumn('email');
        table.dropColumn("work_experience");
        table.dropColumn("education");
        table.dropColumn("age");
        table.dropColumn("job_function");
        table.dropColumn("budget_for_course");
        table.dropColumn("gender");
        table.dropColumn("phone");
    })
}

