import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const course_education_requirement = await knex.schema.hasTable("course_education_requirement");
    if (!course_education_requirement) {
        await knex.schema.createTable("course_education_requirement", (table) => {
            table.increments("id");
            table.string("education_requirement",).notNullable();
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("course_education_requirement");
}

