import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const course_type = await knex.schema.hasTable("course_type");
    if (!course_type) {
        await knex.schema.createTable("course_type", (table) => {
            table.increments("id");
            table.string("course_type").notNullable();
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("course_type");
}
