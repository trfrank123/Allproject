import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const location = await knex.schema.hasTable("location");
    if (!location) {
        await knex.schema.createTable("location", (table) => {
            table.increments("id");
            table.string("area").notNullable();
            table.string("district").notNullable();
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("location");
}