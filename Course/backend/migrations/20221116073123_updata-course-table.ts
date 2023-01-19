import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("course", (table) => {
        table.integer("language").references("language.id").notNullable().alter();
    });
}


export async function down(knex: Knex): Promise<void> {
}

