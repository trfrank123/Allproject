import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const course = await knex.schema.hasTable("course");
    if (course) {
        await knex.schema.table("course", (table) => {
            table.dropForeign('language');

        });

        await knex.schema.alterTable("course", (table) => {
            table.string("language").nullable().alter();
        });
    }
}


export async function down(knex: Knex): Promise<void> {
}