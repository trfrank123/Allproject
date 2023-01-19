import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const user = await knex.schema.hasTable("user");
    if (user) {
        await knex.schema.alterTable("user", (table) => {
            table.string("username").unique().alter();
            table.string("email").unique().alter();
        });
    }
}


export async function down(knex: Knex): Promise<void> {
}

