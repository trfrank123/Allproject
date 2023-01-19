import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const ideal_career = await knex.schema.hasTable("ideal_career");
    if (!ideal_career) {
        await knex.schema.createTable("ideal_career", (table) => {
            table.increments("id");
            table.string("chi_name").notNullable();
            table.string("eng_name").notNullable();
            table.integer("industrial_classification").notNullable().references("industrial_classification.id")
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("ideal_career");
}

