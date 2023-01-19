import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const age = await knex.schema.hasTable("age");
    if (!age) {
        await knex.schema.createTable("age", (table) => {
            table.increments("id");
            table.string("age_range").notNullable();
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("age")
}


