import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const favourite = await knex.schema.hasTable("favourite");
    if (!favourite) {
        await knex.schema.createTable("favourite", (table) => {
            table.increments("id");
            table.integer("user_id").notNullable().references("user.id");
            table.integer("course_id").notNullable().references("course.id");
        });
    }
}




export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("favourite");
}

