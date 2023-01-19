import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const budget_for_course = await knex.schema.hasTable("budget_for_course");
    if (!budget_for_course) {
        await knex.schema.createTable("budget_for_course", (table) => {
            table.increments("id");
            table.string("budget_range").notNullable();
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("budget_for_course");
}
