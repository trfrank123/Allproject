import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const fund_mode = await knex.schema.hasTable("fund_mode");
    if (!fund_mode) {
        await knex.schema.createTable("fund_mode", (table) => {
            table.increments("id");
            table.string("fund_mode").notNullable();
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("fund_mode");
}