// import { Knex } from "knex";
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    const user = await knex.schema.hasTable("user");
    if (!user) {
        await knex.schema.createTable("user", (table) => {
            table.increments("id");
            table.string("username", 60).notNullable();
            table.string("password", 60).notNullable();
            table.timestamps(false, true)
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("user")
}