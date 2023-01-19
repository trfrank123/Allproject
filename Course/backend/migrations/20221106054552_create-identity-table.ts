import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const identity = await knex.schema.hasTable("identity");
    if (!identity) {
        await knex.schema.createTable("identity", (table) => {
            table.increments("id");
            table.string("identity").notNullable();
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("identity");
}
