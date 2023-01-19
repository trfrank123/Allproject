import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("course", (table) => {
        table.string("year").notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
}

