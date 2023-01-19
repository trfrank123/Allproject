import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const salary= await knex.schema.hasTable("salary");
    if (!salary) {
        await knex.schema.createTable("salary", (table) => {
            table.increments("id");
            table.string("salary_range").notNullable();
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("salary");
}