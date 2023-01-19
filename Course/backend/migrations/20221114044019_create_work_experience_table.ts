import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const year_experience = await knex.schema.hasTable("year_experience");
    if (!year_experience) {
        await knex.schema.createTable("year_experience", (table) => {
            table.increments("id");
            table.string("year_range").notNullable();
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("year_experience");
}

