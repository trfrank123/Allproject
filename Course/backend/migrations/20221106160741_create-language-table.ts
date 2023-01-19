import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const language = await knex.schema.hasTable("language");
    if (!language) {
        await knex.schema.createTable("language", (table) => {
            table.increments("id");
            table.string("language").notNullable();
            table.timestamps(false, true)
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("language");
}

