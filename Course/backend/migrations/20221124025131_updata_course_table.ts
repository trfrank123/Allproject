import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("course", (table) => {
        table.string("start_time").nullable().alter();
        table.string("contact").nullable().alter();
        table.string("program_name").notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
}