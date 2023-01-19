import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const course = await knex.schema.hasTable("course");
    if (course) {
        await knex.schema.alterTable("course", (table) => {
            table.integer("industry").notNullable().references("ideal_career.id");
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.table("course", (table) => {
        table.dropColumn('industry');
    })
}