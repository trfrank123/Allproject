import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const education = await knex.schema.hasTable("education");
    if (!education) {
        await knex.schema.createTable("education", (table) => {
            table.increments("id");
            table.string("education_level").notNullable();
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("education");
}

