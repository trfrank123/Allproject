import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const industrial_classification = await knex.schema.hasTable("industrial_classification");
    if (!industrial_classification) {
        await knex.schema.createTable("industrial_classification", (table) => {
            table.increments("id");
            table.string("chi_name").notNullable();
            table.string("eng_name").notNullable();
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("industrial_classification");
}

